'use strict'
const Posto = use('App/Models/Posto');
const Combustivel = use('App/Models/Combustivel');
const Historico = use('App/Models/Historico');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with historicos
 */
class HistoricoController {
  /**
   * Show a list of all historicos.
   * GET historicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      var posto = await Posto.query().with('historicos', (builder) => { builder.orderBy("created_at", "asc") }).fetch();
      return response.status(200).json(posto);
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }

  async historico({ request, response, view }) {
    try {
      var historico = await Historico.query().with('postos_historico', (builder) => { builder.orderBy("created_at", "asc") }).fetch();
      return response.status(200).json(historico);
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }


  async gcomum({ request, response, view }) {
    try {
      let data = request.only(['cidade']);

      var combusteveis = await Posto.query().whereHas('historicos', (builder) => {
        builder.where('tipo', '=', 'GASOLINA COMUM');
        builder.orderBy('updated_at', "asc");
      }).with('historicos', (builder) => {
        builder.where('tipo', '=', 'GASOLINA COMUM');
      }).where('cidade', "=", data.cidade).where('nome', "!=", "null").fetch();

      return response.status(200).json(combusteveis);
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }

  async gaditivada({ request, response, view }) {
    try {
      let data = request.only(['cidade']);

      var combusteveis = await Posto.query().whereHas('historicos', (builder) => {
        builder.where('tipo', '=', 'GASOLINA ADITIVADA');
        builder.orderBy('updated_at', "asc");
      }).with('historicos', (builder) => {
        builder.where('tipo', '=', 'GASOLINA ADITIVADA');
      }).where('cidade', "=", data.cidade).where('nome', "!=", "null").fetch();

      return response.status(200).json(combusteveis);
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }


  async gnv({ request, response, view }) {
    try {
      let data = request.only(['cidade']);

      var combusteveis = await Posto.query().whereHas('historicos', (builder) => {
        builder.where('tipo', '=', 'GNV');
        builder.orderBy('updated_at', "asc");
      }).with('historicos', (builder) => {
        builder.where('tipo', '=', 'GNV');
      }).where('cidade', "=", data.cidade).where('nome', "!=", "null").fetch();

      return response.status(200).json(combusteveis);
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }

  async etanol({ request, response, view }) {
    try {
      let data = request.only(['cidade']);

      var combusteveis = await Posto.query().whereHas('historicos', (builder) => {
        builder.where('tipo', '=', 'ETANOL');
        builder.orderBy('updated_at', "asc");
      }).with('historicos', (builder) => {
        builder.where('tipo', '=', 'ETANOL');
      }).where('cidade', "=", data.cidade).where('nome', "!=", "null").fetch();

      return response.status(200).json(combusteveis);
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }

  async diesel({ request, response, view }) {
    try {
      let data = request.only(['cidade']);

      var combusteveis = await Posto.query().whereHas('historicos', (builder) => {
        builder.whereNotIn('tipo', ['ETANOL', 'GASOLINA ADITIVADA', "GASOLINA COMUM", "GNV"]);
        builder.orderBy('updated_at', "asc");
      }).with('historicos', (builder) => {
        builder.whereNotIn('tipo', ['ETANOL', 'GASOLINA ADITIVADA', "GASOLINA COMUM", "GNV"]);
      }).where('cidade', "=", data.cidade).where('nome', "!=", "null").fetch();

      return response.status(200).json(combusteveis);
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }

  
  /**
   * Display a single historico.
   * GET historicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      var combusteveis = await Posto.query().with('historicos', (builder)=>{
        builder.orderBy('updated_at', "asc");
      }).where('id',params.id).first();

      if (!combusteveis) {
        return response.status(404).send({ message: "ID de Posto não existe!" });
    }

      
      
      return response.status(200).json(combusteveis);
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }

  /**
   * Render a form to update an existing historico.
   * GET historicos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {

  
  }

  /**
   * Update historico details.
   * PUT or PATCH historicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a historico with id.
   * DELETE historicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = HistoricoController
