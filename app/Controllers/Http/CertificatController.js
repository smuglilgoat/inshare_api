'use strict';

const User = use('App/Models/User');
const Certificat = use('App/Models/Certificat');

class CertificatController {
	//CREATE
	async createCertif({ request, auth, response }) {
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

	//READ
	async getCertif({ auth, response }) {
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

	async getCertifs({ auth, response }) {
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
	async viewCertif({ params, response }) {
		return response.download(
			'G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\Files\\Users\\Certificats\\' + params.id + '.jpg'
		);
	}

	//UPDATE
	async updateCertif({ request, auth, response }) {
		try {
			const user = await User.query().where('id', auth.current.user.id).firstOrFail();
			if (user.role != 'Administrateur' && user.role != 'Moderateur') {
				return response.status(401).json({
					status: 'error',
					message: "Une erreur s'est produite: Accès interdit."
				});
			}

			const user_certif = await User.query().where('id', request.input('user_id')).firstOrFail();
			const certif = await Certificat.query().where('user_id', user_certif.id).firstOrFail();
			console.log(certif);
			certif.valide = true;
			certif.dateecheance = request.input('date');
			await certif.save();
			console.log(certif);
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite: Nous n'avons pas pu supprimer le certificat."
			});
		}
	}

	//DELETE
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

module.exports = CertificatController;
