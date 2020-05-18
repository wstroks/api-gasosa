'use strict'

const Comentario = use('App/Models/Comentario')
const Database = use('Database');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with comentarios
 */
class ComentarioController {
  /**
   * Show a list of all comentarios.
   * GET comentarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const comentario = await Comentario.query().orderBy('created_at','desc').fetch();
      return response.status(200).json(comentario);
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}`});
    }
  }

   /**
   * Create/save a new comentario.
   * POST comentarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const data = request.only(['descricao']);
      const comentario = Comentario.create({...data});
      return response.status(200).json({sucess: "Criado o comentário, sugestão ou bug!"});
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }

  }

  /**
   * Display a single comentario.
   * GET comentarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

 
  /**
   * Delete a comentario with id.
   * DELETE comentarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {

    const comentario = await Comentario.query().where('id', params.id).first();
    
    if(!comentario){
      return response.status(404).send({message: "Nenhum registro encontrado"});
      
    }

    await comentario.delete();

    return response.status(200).send({message:"delete done"});
  }
  
}

module.exports = ComentarioController
