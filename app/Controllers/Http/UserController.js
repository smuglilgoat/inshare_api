'use strict';

const Certificat = use('App/Models/Certificat');
const User = use('App/Models/User');
const Hash = use('Hash');

class UserController {
	async index({ auth, response }) {
		try {
			const user = auth.current.user;

			if (user.role != 'Administrateur' && user.role != 'Moderateur') {
				return response.status(401).json({
					status: 'error',
					message: 'Accès interdit.'
				});
			}
			const users = await User.all();
			response.status(200).json({ users });
		} catch (error) {
			console.log(error);

			return response.status(404).json({
				status: 'error',
				message: "Nous n'avons pas pu récuperer les utilisateurs."
			});
		}
	}

	async show({ params, response }) {
		try {
			const user = await User.query().setHidden([ 'password' ]).where('id', params.id).firstOrFail();
			response.status(200).json({ user });
		} catch (error) {
			console.log(error);

			return response.status(404).json({
				status: 'error',
				message: "Nous n'avons pas pu récuperer l'utilisateur."
			});
		}
	}

	async update({ request, auth, response, params }) {
		const authUser = auth.current.user;

		if (authUser.role != 'Administrateur' && authUser.role != 'Moderateur' && authUser.id != params.id) {
			return response.status(401).json({
				status: 'error',
				message: 'Accès interdit.'
			});
		} else {
			try {
				const user = await User.query().setHidden([ 'password' ]).where('id', params.id).firstOrFail();
				if (request.input('username')) {
					user.username = request.input('username');
				}
				if (request.input('email')) {
					user.email = request.input('email');
				}
				if (request.input('role')) {
					user.role = request.input('role');
				}
				if (request.input('domaine')) {
					user.domaine = request.input('domaine');
				}
				if (request.input('niveau')) {
					user.niveau = request.input('niveau');
				}
				if (request.input('password')) {
					const verifyPassword = await Hash.verify(request.input('password'), user.password);
					if (!verifyPassword) {
						return response.status(404).json({
							status: 'error',
							message: 'Le mot de passe actuel est erroné'
						});
					} else {
						user.password = request.input('newpassword');
					}
				}

				await user.save();
				response.status(200);
			} catch (error) {
				console.log(error);

				return response.status(500).json({
					status: 'error',
					message: "Nous n'avons pas pu mettre à jour l'utilisateur."
				});
			}
		}
	}

	async delete({ params, auth, response }) {
		try {
			const authUser = auth.current.user;

			if (authUser.role != 'Administrateur' && authUser.role != 'Moderateur' && authUser.id != params.id) {
				return response.status(401).json({
					status: 'error',
					message: 'Accès interdit.'
				});
			}

			await Certificat.query().where('user_id', params.id).delete();
			await User.query().where('id', params.id).delete();
			response.status(204);
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Nous n'avons pas pu supprimer l'utilisateur."
			});
		}
	}

	async queryList({ response }) {
		try {
			const users = await User.query().setVisible([ 'id', 'username', 'avatar', 'role' ]).fetch();
			return response.status(200).json({ users });
		} catch (error) {
			console.log(error);
			return response.status(404).json({
				status: 'error',
				message: "Nous n'avons pas pu recuperer les utilisateurs."
			});
		}
	}
}

module.exports = UserController;
