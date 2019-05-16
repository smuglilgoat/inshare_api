'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Tag = use('App/Models/Tag');

/**
 * Resourceful controller for interacting with tags
 */
class TagController {
	/**
   * Show a list of all tags.
   * GET tags
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async index({ response }) {
		try {
			const tags = await Tag.query().setVisible([ 'nom' ]).fetch();
			response.status(200).json({ tags });
		} catch (error) {
			console.log(error);
			return response.status(404).json({
				status: 'error',
				message: "Nous n'avons pas pu recuperer les tags."
			});
		}
	}

	/**
   * Render a form to be used for creating a new tag.
   * GET tags/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async create({ request, response, view }) {}

	/**
   * Create/save a new tag.
   * POST tags
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
	async store({ request, response }) {}

	/**
   * Display a single tag.
   * GET tags/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async show({ params, request, response, view }) {}

	/**
   * Render a form to update an existing tag.
   * GET tags/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async edit({ params, request, response, view }) {}

	/**
   * Update tag details.
   * PUT or PATCH tags/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
	async update({ params, request, response }) {}

	/**
   * Delete a tag with id.
   * DELETE tags/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
	async destroy({ params, request, response }) {}
}

module.exports = TagController;
