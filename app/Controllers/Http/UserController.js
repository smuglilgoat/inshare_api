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

	async me({ auth }) {
		const user = await User.query().where('id', auth.current.user.id).firstOrFail();
		return user;
	}

	async parametres({ auth }) {
		console.log('parametres');
	}
}

module.exports = UserController;
