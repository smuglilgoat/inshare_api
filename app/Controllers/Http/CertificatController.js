'use strict';

const User = use('App/Models/User');
const Certificat = use('App/Models/Certificat');

class CertificatController {
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
}

module.exports = CertificatController;
