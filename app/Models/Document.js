'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Document extends Model {
	image() {
		return this.hasMany('App/Models/Image');
	}
	comments() {
		return this.hasMany('App/Models/Comment');
	}
}

module.exports = Document;
