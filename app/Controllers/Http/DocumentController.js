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
}

module.exports = DocumentController;
