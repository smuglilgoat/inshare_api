'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CertificatSchema extends Schema {
	up() {
		this.create('certificats', (table) => {
			table.increments();
			table.boolean('valide').defaultTo(false);
			table.string('preuve');
			table.enu('typec', [ 'Badge', 'Certificat de Scolarite', 'Contrat de Travail' ]);
			table.date('dateecheance').defaultTo('1900-01-01');
			table.integer('user_id').unsigned().references('id').inTable('users');
			table.timestamps();
		});
	}

	down() {
		this.drop('certificats');
	}
}

module.exports = CertificatSchema;
