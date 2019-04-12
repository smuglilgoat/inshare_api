'use strict';

const User = use('App/Models/User');
const Certificat = use('App/Models/Certificat');
const Drive = use('Drive');
const Hash = use('Hash');

class UserController {
	//CREATE
	async register({ request, auth, response }) {
		try {
			const userData = request.only([ 'username', 'email', 'password' ]);
			const user = await User.create({ ...userData, ...{ role: 'Simple' } });
			const token = await auth.generate(user);

			return token;
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite: Nous n'avons pas pu inscrire l'utilisateur."
			});
		}
	}

	//READ
	async login({ request, auth, response }) {
		try {
			const token = await auth.attempt(request.input('email'), request.input('password'));

			return token;
		} catch (error) {
			console.log(error);

			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite: Nous n'avons pas pu connecter l'utilisateur.."
			});
		}
	}

	async getUser({ auth }) {
		try {
			const user = await User.query().setHidden([ 'password' ]).where('id', auth.current.user.id).firstOrFail();
			return user;
		} catch (error) {
			console.log(error);

			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite: Nous n'avons pas pu récuperer l'utilisateur."
			});
		}
	}

	async getUsers({ auth, response }) {
		try {
			const user = await User.query().setHidden([ 'password' ]).where('id', auth.current.user.id).firstOrFail();
			if (user.role != 'Administrateur' && user.role != 'Moderateur') {
				return response.status(401).json({
					status: 'error',
					message: "Une erreur s'est produite: Accès interdit."
				});
			}
			const users = await User.all();
			return users;
		} catch (error) {
			console.log(error);

			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite: Nous n'avons pas pu récuperer les utilisateurs."
			});
		}
	}

	async viewAvatar({ params }) {
		return await Drive.get(
			'G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\Files\\Users\\Avatars\\' + params.id + '.jpg'
		);
	}

	//UPDATE
	async updateIds({ request, auth, response }) {
		try {
			const user = auth.current.user;

			if (request.input('username')) {
				user.username = request.input('username');
			}
			if (request.input('email')) {
				user.email = request.input('email');
			}

			await user.save();
		} catch (error) {
			console.log(error);

			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite: Nous n'avons pas pu mettre à jour les identifiants l'utilisateur."
			});
		}
	}

	async updatePassword({ request, auth, response }) {
		try {
			const user = auth.current.user;

			const verifyPassword = await Hash.verify(request.input('password'), user.password);

			if (!verifyPassword) {
				return response.status(500).json({
					status: 'error',
					message: 'Le mot de passe actuel est erroné'
				});
			} else {
				user.password = request.input('newpassword');

				await user.save();
			}
		} catch (error) {
			console.log(error);

			return response.status(500).json({
				status: 'error',
				message:
					"Une erreur s'est produite: Nous n'avons pas pu mettre à jour le mot de passe de l'utilisateur."
			});
		}
	}

	async updateAvatar({ request, auth, response }) {
		try {
			const user = await User.query().where('id', auth.current.user.id).firstOrFail();

			const profilePic = request.file('file', {
				types: [ 'image' ],
				size: '2mb'
			});

			await profilePic.move('G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\Files\\Users\\Avatars\\', {
				name: ''.concat(user.id).concat('.jpg'),
				overwrite: true
			});

			if (!profilePic.moved()) {
				return response.status(500).json({
					status: 'error',
					message: "Une erreur s'est produite: Nous n'avons pas pu stocker l'image."
				});
			}

			user.avatar = 'http://127.0.0.1:3333/view/avatar/' + user.id + '.jpg';
			await user.save();
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite: Nous n'avons pas pu mettre à jour l'avatar de l'utilisateur."
			});
		}
	}

	//DELETE
}

module.exports = UserController;
