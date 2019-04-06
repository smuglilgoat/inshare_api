'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Certificat extends Model {
	user() {
		this.belongsTo('App/Models/User', 'user_id', 'id');
	}
}

module.exports = Certificat;
