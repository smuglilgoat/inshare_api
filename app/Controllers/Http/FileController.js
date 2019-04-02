'use strict';
const User = use('App/Models/User');
const Drive = use('Drive');
const fs = require('fs');

class FileController {
	async avatarupload({ request, auth, response }) {
		try {
			const user = await User.query().where('id', auth.current.user.id).firstOrFail();

			const profilePic = request.file('file', {
				types: [ 'image' ],
				size: '2mb'
			});

			await profilePic.move('G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\uploads\\images\\avatars\\', {
				name: ''.concat(user.id).concat('.jpg'),
				overwrite: true
			});

			if (!profilePic.moved()) {
				return response.status(500).json({
					status: 'error',
					message: "Une erreur s'est produite en stockant l'image."
				});
			}

			user.avatar = 'http://127.0.0.1:3333/uploads/images/avatars/' + user.id + '.jpg';
			await user.save();
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite en mettant à jour la base de donnée."
			});
		}
	}

	async avatarget({ params }) {
		return await Drive.get(
			'G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\uploads\\images\\avatars\\' + params.id + '.jpg'
		);
	}
}

module.exports = FileController;
