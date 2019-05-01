'use strict';

const User = use('App/Models/User');
const Certificat = use('App/Models/Certificat');
const Drive = use('Drive');

class CertificatController {
	async index({ auth, response }) {
		try {
			const authUser = auth.current.user;

			if (authUser.role != 'Administrateur' && authUser.role != 'Moderateur') {
				return response.status(401).json({
					status: 'error',
					message: 'Accès interdit.'
				});
			}

			const certificats = await Certificat.all();
			response.status(200).json({ certificats });
		} catch (error) {
			console.log(error);
			return response.status(404).json({
				status: 'error',
				message: "Nous n'avons pas pu recuperer les certificats."
			});
		}
	}

	async create({ request, auth, response }) {
		try {
			const user = auth.current.user;

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
					message: "Nous n'avons pas pu stocker l'image."
				});
			}

			await user.certificat().create({
				preuve: 'http://127.0.0.1:3333/certificats/' + user.id + '.jpg',
				typec: request.input('type'),
				user_id: user.id
			});
			response.status(201);
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Nous n'avons pas pu enregistrer le certificat de l'utilisateur."
			});
		}
	}

	async show({ params, auth, response }) {
		try {
			const authUser = auth.current.user;

			if (authUser.role != 'Administrateur' && authUser.role != 'Moderateur' && authUser.id != params.id) {
				return response.status(401).json({
					status: 'error',
					message: 'Accès interdit.'
				});
			}

			const exists = await Drive.exists(
				'G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\Files\\Users\\Certificats\\' + params.id + '.jpg'
			);

			if (exists) {
				const certificat = await Certificat.query().where('user_id', params.id).firstOrFail();
				response.status(200).json({ certificat });
			}
		} catch (error) {
			console.log(error);
			return response.status(404).json({
				status: 'error',
				message: "Nous n'avons pas pu recuperer le certificat de l'utilisateur."
			});
		}
	}

	async update({ request, params, auth, response }) {
		try {
			const authUser = auth.current.user;

			if (authUser.role != 'Administrateur' && authUser.role != 'Moderateur' && authUser.id != params.id) {
				return response.status(401).json({
					status: 'error',
					message: 'Accès interdit.'
				});
			}

			const certificat = await Certificat.query().where('user_id', params.id).firstOrFail();
			certificat.valide = true;
			certificat.dateecheance = request.input('date');
			await certificat.save();
			response.status(200);
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Nous n'avons pas pu supprimer le certificat."
			});
		}
	}

	async delete({ params, auth, response }) {
		try {
			const authUser = auth.current.user;

			if (authUser.role != 'Administrateur' && authUser.role != 'Moderateur') {
				return response.status(401).json({
					status: 'error',
					message: 'Accès interdit.'
				});
			}

			await Certificat.query().where('user_id', params.id).delete();
			response.status(204);
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Nous n'avons pas pu supprimer le certificat."
			});
		}
	}
}

module.exports = CertificatController;
