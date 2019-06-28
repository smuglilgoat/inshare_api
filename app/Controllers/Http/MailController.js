'use strict';
const Mail = use('Mail');

class MailController {
	async report({ request, params, response, auth }) {
		try {
			const user = auth.current.user;
			await Mail.raw('message', (message) => {
				message.from('pfe@pfe.com');
				message.to('k.mame2810@gmail.com');
				message.subject('Signalement du document #' + params.id);
				message.text(
					'Utilisateur: ' +
						user.username +
						'\n' +
						'ID: ' +
						user.id +
						'\n' +
						'ID du Document signalé: ' +
						params.id +
						'\n' +
						'Sujet: ' +
						request.input('subject') +
						'\n' +
						'Message:\n' +
						request.input('message')
				);
			});
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Nous n'avons pas pu signaler le document."
			});
		}
	}
}

module.exports = MailController;
