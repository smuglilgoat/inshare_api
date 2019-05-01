'use strict';
const User = use('App/Models/User');
const Drive = use('Drive');
const Document = use('App/Models/Document');

class DocumentController {
	async index({ auth, response }) {
		try {
			const authUser = auth.current.user;

			if (authUser.role != 'Administrateur' && authUser.role != 'Moderateur') {
				return response.status(401).json({
					status: 'error',
					message: 'Accès interdit.'
				});
			}

			const docs = await Document.all();
			response.status(200).json({ docs });
		} catch (error) {
			console.log(error);
			return response.status(404).json({
				status: 'error',
				message: "Nous n'avons pas pu recuperer les documents."
			});
		}
	}

	async create({ request, auth, response }) {
		try {
			const user = auth.current.user;
			const file = request.file('file_0', {
				types: [ 'image' ],
				size: '5mb'
			});

			const document = await user.document().create({ user_id: user.id });
			try {
				await file.move('G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\Files\\Documents\\', {
					name: ''.concat(document.id).concat('.jpg'),
					overwrite: true
				});
				document.link = 'http://127.0.0.1:3333/documents/' + document.id + '.jpg';
				document.taille = file.size;
				document.save();
				response.status(201).json({ document });
			} catch (error) {
				if (!file.moved()) {
					console.log(error);
					return response.status(500).json({
						status: 'error',
						message: "Nous n'avons pas pu stocker l'image."
					});
				}
			}
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Nous n'avons pas pu enregistrer votre fichier."
			});
		}
	}

	async show({ params, response }) {
		try {
			const exists = await Drive.exists(
				'G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\Files\\Documents\\' + params.id + '.jpg'
			);

			if (exists) {
				const document = await Document.query().where('id', params.id).firstOrFail();
				document.vues++;
				document.save();
				response.status(200).json({ document });
			}
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Nous n'avons pas pu recuperer le document."
			});
		}
	}

	async queryType({ params, response }) {
		try {
			const docs = await Document.query().where('type', params.type).fetch();
			response.status(200).json({ docs });
		} catch (error) {
			console.log(error);
			return response.status(404).json({
				status: 'error',
				message: "Nous n'avons pas pu recuperer les documents."
			});
		}
	}

	async update({ request, params, auth, response }) {
		try {
			const authUser = auth.current.user;
			const doc = await Document.query().where('id', params.id).firstOrFail();

			if (authUser.role != 'Administrateur' && authUser.role != 'Moderateur' && authUser.id != doc.user_id) {
				return response.status(401).json({
					status: 'error',
					message: 'Accès interdit.'
				});
			}
			await doc.update({
				titre: request.input('titre'),
				description: request.input('description'),
				langue: request.input('langue'),
				domaine: request.input('domaine')
			});
			if (request.input('type')) {
				doc.type = request.input('type');
			}
			if (request.input('tags')) {
				doc.tags = request.input('tags');
			}

			await doc.save();
			response.status(200);
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Nous n'avons pas pu mettre à jour le document."
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

			await Document.query().where('id', params.id).delete();
			response.status(204);
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Nous n'avons pas pu supprimer le document."
			});
		}
	}
}

module.exports = DocumentController;
