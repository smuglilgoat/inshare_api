'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DocumentSchema extends Schema {
	up() {
		this.create('documents', (table) => {
			table.increments();
			table.string('link');
			table.string('titre');
			table.text('description', 'text');
			table.enu('langue', [ 'Français', 'Arabe', 'Anglais' ]);
			table.integer('taille');
			table.enu('type', [ 'Support de Cours', 'Note de Cours', 'Série de TD', 'Série de TP', 'Examination' ]);
			table.string('domaine');
			table.text('tags', 'text');
			table.integer('evaluation');
			table.integer('telechargements');
			table.integer('vues');
			table.integer('user_id').unsigned().references('id').inTable('users');
			table.timestamps();
		});
	}

	down() {
		this.drop('documents');
	}
}

module.exports = DocumentSchema;
