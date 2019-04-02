'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CertificationSchema extends Schema {
	up() {
		this.create('certifications', (table) => {
			table.increments();
			table.boolean('valide').defaultTo(false);
			table.enu('typec', [ 'Badge', 'Certificat de Scolarite', 'Contrat de Travail' ]);
			table.date('dateecheance');
			table.timestamps();
		});
	}

	down() {
		this.drop('certifications');
	}
}

module.exports = CertificationSchema;
