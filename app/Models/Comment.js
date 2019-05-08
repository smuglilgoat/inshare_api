'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Comment extends Model {
	user() {
		this.belongsTo('App/Models/User');
	}
	document() {
		this.belongsTo('App/Models/Document');
	}
}

module.exports = Comment;
