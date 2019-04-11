'use strict';
const User = use('App/Models/User');
const Certificat = use('App/Models/Certificat');
const Drive = use('Drive');

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

	async avatarView({ params }) {
		return await Drive.get(
			'G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\Files\\Users\\Avatars\\' + params.id + '.jpg'
		);
	}

	async certifView({ params, response }) {
		return response.download(
			'G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\Files\\Users\\Certificats\\' + params.id + '.jpg'
		);
	}

	async certifPost({ request, auth, response }) {
		try {
			const user = await User.query().where('id', auth.current.user.id).firstOrFail();
			const preuveImg = request.file('file', {
				types: [ 'image' ],
				size: '5mb'
			});

			await preuveImg.move('G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\Files\\Users\\Certificats\\', {
				name: ''.concat(user.id).concat('.jpg'),
				overwrite: true
			});

			if (!preuveImg.moved()) {
				return response.status(500).json({
					status: 'error',
					message: "Une erreur s'est produite: Nous n'avons pas pu stocker l'image."
				});
			}

			const certificat = await user.certificat().create({
				preuve: 'http://127.0.0.1:3333/view/certificat/' + user.id + '.jpg',
				typec: request.all().type,
				user_id: user.id
			});
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite: Nous n'avons pas pu enregistrer le certificat de l'utilisateur."
			});
		}
	}
	async certifGet({ auth, response }) {
		try {
			const user = await User.query().where('id', auth.current.user.id).firstOrFail();
			const exists = await Drive.exists(
				'G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\Files\\Users\\Certificats\\' + user.id + '.jpg'
			);

			if (exists) {
				const certificat = await user.certificat().fetch();
				return certificat;
			}
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite: Nous n'avons pas pu recuperer le certificat de l'utilisateur."
			});
		}
	}
	async certifGetAll({ auth, response }) {
		try {
			const user = await User.query().where('id', auth.current.user.id).firstOrFail();
			if (user.role != 'Administrateur' && user.role != 'Moderateur') {
				return response.status(401).json({
					status: 'error',
					message: "Une erreur s'est produite: Accès interdit."
				});
			}

			const certificats = await Certificat.all();
			return certificats;
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite: Nous n'avons pas pu recuperer les certificats."
			});
		}
	}

	async deleteCertif({ request, auth, response }) {
		try {
			const user = await User.query().where('id', auth.current.user.id).firstOrFail();
			if (user.role != 'Administrateur' && user.role != 'Moderateur') {
				return response.status(401).json({
					status: 'error',
					message: "Une erreur s'est produite: Accès interdit."
				});
			}

			const user_certif = await User.query().where('id', request.input('user_id')).firstOrFail();
			await Certificat.query().where('user_id', user_certif.id).delete();
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite: Nous n'avons pas pu supprimer le certificat."
			});
		}
	}
}

module.exports = FileController;
