'use strict';

const User = use('App/Models/User');

class UserController {
	async inscription({ request, auth, response }) {
		const userData = request.only([ 'username', 'email', 'password' ]);

		try {
			const user = await User.create(userData);
			const token = await auth.generate(user);

			return response.json({
				status: 'success',
				data: token
			});
		} catch (error) {
			return response.status(400).json({
				status: 'error',
				message: "Nous n'avons pas pu crée l'utilisateur, veuillez réessayer plus tard."
			});
		}
	}

	async connexion({ request, auth, response }) {
		try {
			const token = await auth.attempt(request.input('email'), request.input('password'));

			return response.json({
				status: 'success',
				data: token
			});
		} catch (error) {
			response.status(400).json({
				status: 'error',
				message: 'Email ou mot de passe invalide'
			});
		}
	}
}

module.exports = UserController;
