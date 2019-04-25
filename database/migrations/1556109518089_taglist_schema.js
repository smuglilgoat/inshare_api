'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TaglistSchema extends Schema {
	up() {
		this.create('taglists', (table) => {
			table.increments();
			table.integer('document_id').unsigned().references('id').inTable('documents');
			table.integer('tag_id').unsigned().references('id').inTable('tags');
			table.timestamps();
		});
	}

	down() {
		this.drop('taglists');
	}
}

module.exports = TaglistSchema;
