'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Rating = use('App/Models/Rating');
const Document = use('App/Models/Document');

/**
 * Resourceful controller for interacting with ratings
 */
class RatingController {
	/**
   * Show a list of all ratings.
   * GET ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async index({ request, response, view }) {}

	/**
   * Render a form to be used for creating a new rating.
   * GET ratings/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async create({ request, response, view }) {}

	/**
   * Create/save a new rating.
   * POST ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
	async store({ request, response }) {}

	/**
   * Display a single rating.
   * GET ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async show({ params, response }) {}

	/**
   * Render a form to update an existing rating.
   * GET ratings/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async edit({ params, request, response, view }) {}

	/**
   * Update rating details.
   * PUT or PATCH ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
	async update({ params, request, response, auth }) {
		try {
			const user = auth.current.user;
			const doc = await Document.query().where('id', params.id).firstOrFail();
			console.log('# Rating Update: User=' + user.username + ', Doc=' + doc.titre);

			const rating = await Rating.findOrCreate(
				{ document_id: doc.id, user_id: user.id },
				{ document_id: doc.id, user_id: user.id }
			);
			rating.rating = request.input('rating');
			await rating.save();

			const ratingCount = await Rating.query().where('document_id', doc.id).getCount();
			const ratingSum = await Rating.query().where('document_id', doc.id).getSum('rating');

			doc.evaluation = ratingSum / ratingCount;
			await doc.save();
		} catch (error) {
			console.log(error);
			return response.status(304).json({
				status: 'error',
				message: "Nous n'avons pas pu modifier le commentaire."
			});
		}
	}

	/**
   * Delete a rating with id.
   * DELETE ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
	async destroy({ params, request, response }) {}
}

module.exports = RatingController;
