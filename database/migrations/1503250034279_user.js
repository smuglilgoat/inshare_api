'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Certificat = use('App/Models/Certificat');
class UserSchema extends Schema {
	up() {
		this.create('users', (table) => {
			table.increments();
			table.string('username', 80).notNullable().unique();
			table.string('email', 254).notNullable().unique();
			table.string('password', 60).notNullable();
			table.string('avatar').defaultTo('http://127.0.0.1:3333/view/avatar/0.jpg');
			table.enu('role', [ 'Simple', 'Moderateur', 'Administrateur', 'Etudiant', 'Enseignant' ]);
			table.string('domaine');
			table.string('niveauetud', [ 'L1', 'L2', 'L3', 'M1', 'M2' ]);
			table.string('niveauense', [ 'MA-B', 'MA-A', 'MC-B', 'MC-A', 'P' ]);
			table.timestamps();
		});
	}

	down() {
		this.drop('users');
	}
}

module.exports = UserSchema;
