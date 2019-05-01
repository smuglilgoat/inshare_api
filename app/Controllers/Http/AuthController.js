'use strict';

const User = use('App/Models/User');

class AuthController {
	async register({ request, auth, response }) {
		try {
			const userData = request.only([ 'username', 'email', 'password' ]);
			const createUser = await User.create({ ...userData });
			const token = await auth.generate(createUser);

			const user = await User.query()
				.setHidden([ 'password' ])
				.where('email', request.input('email'))
				.firstOrFail();
			response.status(201).json({ token, user });
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Nous n'avons pas pu inscrire l'utilisateur."
			});
		}
	}

	async login({ request, auth, response }) {
		try {
			const token = await auth.attempt(request.input('email'), request.input('password'));
			const user = await User.query()
				.setHidden([ 'password' ])
				.where('email', request.input('email'))
				.firstOrFail();

			response.status(200).json({ token, user });
		} catch (error) {
			console.log(error);

			return response.status(500).json({
				status: 'error',
				message: "Nous n'avons pas pu connecter l'utilisateur.."
			});
		}
	}
}

module.exports = AuthController;
