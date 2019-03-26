'use strict';

const User = use('App/Models/User');

class UserController {
	async inscription({ request, auth }) {
		const userData = request.only([ 'username', 'email', 'password' ]);
		const user = await User.create(userData);
		const token = await auth.generate(user);

		return token;
	}

	async connexion({ request, auth }) {
		const token = await auth.attempt(request.input('email'), request.input('password'));

		return token;
	}
}

module.exports = UserController;
