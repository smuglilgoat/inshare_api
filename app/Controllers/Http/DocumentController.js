'use strict';
const User = use('App/Models/User');

class DocumentController {
	//CREATE
	async createDoc({ request, auth, response }) {
		try {
			const user = await User.query().where('id', auth.current.user.id).firstOrFail();
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
				document.link = 'http://127.0.0.1:3333/read/document/' + document.id + '.jpg';
				document.taille = file.size;
				document.save();
				return document;
			} catch (error) {
				if (!file.moved()) {
					console.log(error);
					return response.status(500).json({
						status: 'error',
						message: "Une erreur s'est produite: Nous n'avons pas pu stocker l'image."
					});
				}
			}
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite: Nous n'avons pas pu enregistrer votre fichier."
			});
		}
	}

	//READ
	async viewDoc({ params, response }) {
		return response.download(
			'G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\Files\\Documents\\' + params.id + '.jpg'
		);
	}
	//UPDATE
	async updateDoc({ request, auth, response }) {
		try {
			const user = await User.query().where('id', auth.current.user.id).firstOrFail();
			await user
				.document()
				.where('id', request.input('id'))
				.update({ titre: request.input('titre'), description: request.input('description') });
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite: Nous n'avons pas pu supprimer votre fichier."
			});
		}
	}

	//DELETE
	async deleteDoc({ request, auth, response }) {
		try {
			const user = await User.query().where('id', auth.current.user.id).firstOrFail();
			await user.document().where('id', request.input('id')).delete();
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Une erreur s'est produite: Nous n'avons pas pu supprimer votre fichier."
			});
		}
	}
}

module.exports = DocumentController;
