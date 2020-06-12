'use strict'

const Posto = use('App/Models/Posto');
const Combustivel = use('App/Models/Combustivel');
const Database = use('Database');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with combustivels
 */
class CombustivelController {
  /**
   * Show a list of all combustivels.
   * GET combustivels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      var combustivel = await Combustivel.query().with('postos').orderBy("valor", "ASC").fetch();


      return response.status(200).json(combustivel);
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }

  async gcomum({ request, response, view }) {
    try {
      let data = request.only(['page', 'orderBy','cidade']);
      const page = Number(data.page) || 1
      var combusteveis = await Combustivel.query().whereHas('postos', (builder) => {
        builder.where('cidade', "=", data.cidade)
      }).with('postos').where('tipo', '=', 'GASOLINA COMUM').orderBy(data.orderBy, 'ASC').paginate(page, 25);
      const pagination = combusteveis.toJSON();
      pagination.offset = (pagination.page - 1) * pagination.perPage
      pagination.pages = Array(pagination.lastPage).fill(null).map((x, i) => i + 1)
      return response.status(200).json(combusteveis);
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }

  async gaditivada({ request, response, view }) {
    try {
      let data = request.only(['page', 'orderBy','cidade']);
      const page = Number(data.page) || 1
      var combusteveis = await Combustivel.query().whereHas('postos', (builder) => {
        builder.where('cidade', "=", data.cidade)
      }).with('postos').where('tipo', '=', 'GASOLINA ADITIVADA').orderBy(data.orderBy, 'ASC').paginate(page, 25);
      const pagination = combusteveis.toJSON();
      pagination.offset = (pagination.page - 1) * pagination.perPage
      pagination.pages = Array(pagination.lastPage).fill(null).map((x, i) => i + 1)
      return response.status(200).json(combusteveis);
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }

  async etanol({ request, response, view }) {
    try {
      let data = request.only(['page', 'orderBy','cidade']);
      const page = Number(data.page) || 1
      var combusteveis = await Combustivel.query().whereHas('postos', (builder) => {
        builder.where('cidade', "=", data.cidade)
      }).with('postos').where('tipo', '=', 'ETANOL').orderBy(data.orderBy, 'ASC').paginate(page, 25);
      const pagination = combusteveis.toJSON();
      pagination.offset = (pagination.page - 1) * pagination.perPage
      pagination.pages = Array(pagination.lastPage).fill(null).map((x, i) => i + 1)
      return response.status(200).json(combusteveis);
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }

  async diesel({ request, response, view }) {
    try {
      let data = request.only(['page', 'orderBy','cidade']);
      const page = Number(data.page) || 1
      var combusteveis = await Combustivel.query().whereHas('postos', (builder) => {
        builder.where('cidade', "=", data.cidade)
      }).with('postos').whereNotIn('tipo', ['ETANOL', 'GASOLINA ADITIVADA', "GASOLINA COMUM", "GNV"]).orderBy(data.orderBy, 'ASC').paginate(page, 25);
      const pagination = combusteveis.toJSON();
      pagination.offset = (pagination.page - 1) * pagination.perPage
      pagination.pages = Array(pagination.lastPage).fill(null).map((x, i) => i + 1)
      return response.status(200).json(combusteveis);
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }

  async gnv({ request, response, view, params, query }) {
    try {
      console.log(request.only(['page', 'orderBy', 'cidade']))
      //request.only([ 'page'])
      let data = request.only(['page', 'orderBy', 'cidade']);
      const page = Number(data.page) || 1
      var combusteveis = await Combustivel.query().whereHas('postos', (builder) => {
        builder.where('cidade', "=", data.cidade)
      }).where('tipo', '=', 'GNV').with('postos').orderBy(data.orderBy, 'ASC').paginate(page, 25);
      const pagination = combusteveis.toJSON();
      pagination.offset = (pagination.page - 1) * pagination.perPage
      pagination.pages = Array(pagination.lastPage).fill(null).map((x, i) => i + 1)
      // pagination.route = 'employees.pagination'
      //var x=combusteveis.toJSON().filter(person => person.gnv != "GNV");
      return response.status(200).json(combusteveis);
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }

  /**
   * Render a form to be used for creating a new combustivel.
   * GET combustivels/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new combustivel.
   * POST combustivels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single combustivel.
   * GET combustivels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing combustivel.
   * GET combustivels/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update combustivel details.
   * PUT or PATCH combustivels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a combustivel with id.
   * DELETE combustivels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {

    const combustivel = await Combustivel.query().where('id', params.id).first();

    if (!combustivel) {
      return response.status(404).send({ message: "Nenhum registro encontrado" });

    }

    await combustivel.delete();

    return response.status(200).send({ message: "delete done" });
  }
}

module.exports = CombustivelController
