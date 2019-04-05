'use strict';

const User = use('App/Models/User');
const Hash = use('Hash');

class UserController {
<<<<<<< HEAD
	async inscription({ request, auth }) {
=======
	async register({ request, auth, response }) {
>>>>>>> clean up
		try {
			const userData = request.only([ 'username', 'email', 'password' ]);
			const user = await User.create({ ...userData, ...{ role: 'Simple' } });
			const token = await auth.generate(user);
<<<<<<< HEAD

			return { user, token };
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite en mettant à jour la base de donnée."
=======

			return token;
		} catch (error) {
			console.log(error);

			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite: Nous n'avons pas pu inscrire l'utilisateur."
>>>>>>> clean up
			});
		}
	}

<<<<<<< HEAD
	async connexion({ request, auth }) {
		try {
			const token = await auth.attempt(request.input('email'), request.input('password'));
			const user = await User.query()
				.setHidden([ 'password' ])
				.where('email', request.input('email'))
				.firstOrFail();

			return { user, token };
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite en mettant à jour la base de donnée."
			});
		}
	}

	async role({ auth }) {
		const user = await User.query().setHidden([ 'password' ]).where('id', auth.current.user.id).firstOrFail();
		return user.role;
=======
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
>>>>>>> clean up
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
}

module.exports = UserController;
