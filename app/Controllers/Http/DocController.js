'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Document = use('App/Models/Document');
const Doc = use('App/Models/Doc');

/**
 * Resourceful controller for interacting with docs
 */
class DocController {
	/**
   * Show a list of all docs.
   * GET docs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async index({ request, response, view }) {}

	/**
   * Render a form to be used for creating a new doc.
   * GET docs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async create({ request, response, view }) {}

	/**
   * Create/save a new doc.
   * POST docs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
	async store({ request, response }) {}

	/**
   * Display a single doc.
   * GET docs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async show({ params, response }) {
		try {
			const document = await Document.query().where('id', params.id).firstOrFail();
			const doc = await Doc.query().where('document_id', document.id).firstOrFail();
			response.status(200).json({ doc });
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Nous n'avons pas pu recuperer la doc."
			});
		}
	}

	/**
   * Render a form to update an existing doc.
   * GET docs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async edit({ params, request, response, view }) {}

	/**
   * Update doc details.
   * PUT or PATCH docs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
	async update({ params, request, response }) {}

	/**
   * Delete a doc with id.
   * DELETE docs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
	async destroy({ params, request, response }) {}

	async viewDoc({ params, response }) {
		return response.download(
			'G:\\Documents\\Code\\Web\\pfe\\pfe-api\\app\\Files\\Documents\\' + params.id + '\\' + params.filename
		);
	}
}

module.exports = DocController;
