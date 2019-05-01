'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
	up() {
		this.create('users', (table) => {
			table.increments();
			table.string('username', 80).notNullable().unique();
			table.string('email', 254).notNullable().unique();
			table.string('password', 60).notNullable();
			table.string('avatar').defaultTo('http://127.0.0.1:3333/avatars/0.jpg');
			table.enu('role', [ 'Simple', 'Moderateur', 'Administrateur', 'Etudiant', 'Enseignant' ]).defaultTo('Simple');;
			table.string('domaine');
			table.string('niveau');
			table.timestamps();
		});
	}

	down() {
		this.drop('users');
	}
}

module.exports = UserSchema;
