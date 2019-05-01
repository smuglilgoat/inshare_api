'use strict';

const Certificat = use('App/Models/Certificat');
const User = use('App/Models/User');
const Drive = use('Drive');

class FileController {
	async viewAvatar({ params }) {
		return await Drive.get(
			'G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\Files\\Users\\Avatars\\' + params.id + '.jpg'
		);
	}

	async postAvatar({ request, auth, response }) {
		try {
			const user = auth.current.user;

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
					message: "Nous n'avons pas pu stocker l'image."
				});
			}

			user.avatar = 'http://127.0.0.1:3333/avatars/' + user.id + '.jpg';
			await user.save();
			response.status(201);
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Nous n'avons pas pu mettre à jour l'avatar de l'utilisateur."
			});
		}
	}

	async viewCertif({ params, response }) {
		return response.download(
			'G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\Files\\Users\\Certificats\\' + params.id + '.jpg'
		);
	}

	async viewDoc({ params, response }) {
		return response.download(
			'G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\Files\\Documents\\' + params.id + '.jpg'
		);
	}
}

module.exports = FileController;
