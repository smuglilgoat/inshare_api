'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Document = use('App/Models/Document');
const Comment = use('App/Models/Comment');

/**
 * Resourceful controller for interacting with comments
 */
class CommentController {
	/**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async index({ params, response }) {
		try {
			const comments = await Comment.query().where('document_id', params.id).fetch();
			return response.status(200).json({ comments });
		} catch (error) {
			console.log(error);
			return response.status(404).json({
				status: 'error',
				message: "Nous n'avons pas pu les commentaires."
			});
		}
	}

	/**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async create({ request, response, auth, params }) {
		try {
			await Comment.create({
				content: request.input('content'),
				user_id: auth.current.user.id,
				document_id: params.id
			});
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				status: 'error',
				message: "Nous n'avons pas pu créer le commentaire."
			});
		}
	}

	/*
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async show({ params, response }) {
		try {
			const comment = await Comment.query().where('id', params.idc).firstOrFail();
			return response.status(200).json({ comment });
		} catch (error) {
			console.log(error);
			return response.status(404).json({
				status: 'error',
				message: "Nous n'avons pas pu le commentaire."
			});
		}
	}

	/**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
	async update({ params, request, response, auth }) {
		try {
			const authUser = auth.current.user;
			const doc = await Document.query().where('id', params.id).firstOrFail();

			if (authUser.role != 'Administrateur' && authUser.role != 'Moderateur' && authUser.id != doc.user_id) {
				return response.status(401).json({
					status: 'error',
					message: 'Accès interdit.'
				});
			}

			const comment = await Comment.query().where('id', params.idc).firstOrFail();
			comment.content = request.input('content');
			comment.save();

			return response.status(200);
		} catch (error) {
			console.log(error);
			return response.status(304).json({
				status: 'error',
				message: "Nous n'avons pas pu modifier le commentaire."
			});
		}
	}

	/**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
	async destroy({ params, auth, response }) {
		try {
			const authUser = auth.current.user;

			if (authUser.role != 'Administrateur' && authUser.role != 'Moderateur' && authUser.id != doc.user_id) {
				return response.status(401).json({
					status: 'error',
					message: 'Accès interdit.'
				});
			}

			const comment = await Comment.query().where('id', params.idc).firstOrFail();
			comment.delete();

			return response.status(204);
		} catch (error) {
			console.log(error);
			return response.status(304).json({
				status: 'error',
				message: "Nous n'avons pas pu modifier le commentaire."
			});
		}
	}
}

module.exports = CommentController;
