'use strict';
const User = use('App/Models/User');
const Drive = use('Drive');
const fs = require('fs');

class FileController {
	async avatarPost({ request, auth, response }) {
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

	async avatarGet({ params }) {
		return await Drive.get(
			'G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\Files\\Users\\Avatars\\' + params.id + '.jpg'
		);
	}
}

module.exports = FileController;
