'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ImageSchema extends Schema {
	up() {
		this.create('images', (table) => {
			table.increments();
			table.string('path');
			table.string('name');
			table.string('ext');
			table.integer('size').unsigned();
			table.integer('document_id').unsigned().references('id').inTable('documents');
			table.timestamps();
		});
	}

	down() {
		this.drop('images');
	}
}

module.exports = ImageSchema;
