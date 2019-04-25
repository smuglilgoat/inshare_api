'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Tag extends Model {
	documents() {
		return this.belongsToMany('App/Models/Document', 'tag_id', 'document_id').pivotTable('taglist');
	}
}

module.exports = Tag;
