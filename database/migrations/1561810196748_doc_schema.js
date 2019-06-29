'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DocSchema extends Schema {
	up() {
		this.create('docs', (table) => {
			table.increments();
			table.string('name');
			table.string('path');
			table.integer('document_id').unsigned().references('id').inTable('documents');
			table.timestamps();
		});
	}

	down() {
		this.drop('docs');
	}
}

module.exports = DocSchema;
