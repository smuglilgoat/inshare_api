'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CertificationSchema extends Schema {
	up() {
		this.create('certifications', (table) => {
			table.increments();
			table.boolean('valide').defaultTo(false);
			table.string('preuve');
			table.enu('typec', [ 'Badge', 'Certificat de Scolarite', 'Contrat de Travail' ]);
			table.date('dateecheance');
			table.integer('user_id').unsigned().references('id').inTable('users');
			table.timestamps();
		});
	}

	down() {
		this.drop('certifications');
	}
}

module.exports = CertificationSchema;
