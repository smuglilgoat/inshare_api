'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CommentSchema extends Schema {
	up() {
		this.create('comments', (table) => {
			table.increments();
			table.text('content', 'text');
			table.integer('user_id').unsigned().references('id').inTable('users');
			table.integer('document_id').unsigned().references('id').inTable('documents');
			table.timestamps();
		});
	}

	down() {
		this.drop('comments');
	}
}

module.exports = CommentSchema;
