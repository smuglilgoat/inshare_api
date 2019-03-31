'use strict';

const User = use('App/Models/User');
const Hash = use('Hash');

class UserController {
	async inscription({ request, auth }) {
		const userData = request.only([ 'username', 'email', 'password' ]);
		const user = await User.create({ ...userData, ...{ role: 'Simple' } });
		const token = await auth.generate(user);

		return token;
	}

	async connexion({ request, auth }) {
		const token = await auth.attempt(request.input('email'), request.input('password'));

		return token;
	}

	async me({ auth }) {
		const user = await User.query().setHidden([ 'password' ]).where('id', auth.current.user.id).firstOrFail();
		return user;
	}

	async majinfo({ request, auth, response }) {
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
			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite en mettant à jour la base de donnée."
			});
		}
	}

	async majmdp({ request, auth, response }) {
		try {
			const user = auth.current.user;

			// verify if current password matches
			const verifyPassword = await Hash.verify(request.input('password'), user.password);

			// display appropriate message
			if (!verifyPassword) {
				return response.status(500).json({
					status: 'error',
					message: 'La verification du mot de passe a échoué.'
				});
			} else {
				// hash and save new password
				console.log(user.password);
				user.password = request.input('newpassword');
				console.log(user.password);

				await user.save();
			}
		} catch (error) {
			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite en mettant à jour la base de donnée."
			});
		}
	}
}

module.exports = UserController;
