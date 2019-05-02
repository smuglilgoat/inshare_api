'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Image extends Model {
	document() {
		return this.belongsTo('App/Models/Document');
	}
}

module.exports = Image;
