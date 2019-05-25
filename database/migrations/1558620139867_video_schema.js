'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class VideoSchema extends Schema {
	up() {
		this.create('videos', (table) => {
			table.increments();
			table.string('provider');
			table.string('link');
			table.integer('document_id').unsigned().references('id').inTable('documents');
			table.timestamps();
		});
	}

	down() {
		this.drop('videos');
	}
}

module.exports = VideoSchema;
