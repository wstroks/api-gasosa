'use strict'

const Posto = use('App/Models/Posto');
const Combustivel = use('App/Models/Combustivel');
const Database = use('Database');
const geolib = require('geolib');
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
      let data = request.only(['page', 'orderBy', 'cidade']);
      var order="";
      if(data.orderBy=="updated_at"){
      order="DESC"
      }else{
        order="ASC";
      }
      const page = Number(data.page) || 1
      var combusteveis = await Combustivel.query().whereHas('postos', (builder) => {
        builder.where('cidade', "=", data.cidade);
        builder.where('nome',"!=","null");
      }).with('postos').where('tipo', '=', 'GASOLINA COMUM').orderBy(data.orderBy, order).paginate(page, 25);
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
      let data = request.only(['page', 'orderBy', 'cidade']);
      var order="";
      if(data.orderBy=="updated_at"){
      order="DESC"
      }else{
        order="ASC";
      }
      const page = Number(data.page) || 1
      var combusteveis = await Combustivel.query().whereHas('postos', (builder) => {
        builder.where('cidade', "=", data.cidade);
        builder.where('nome',"!=","null");
      }).with('postos').where('tipo', '=', 'GASOLINA ADITIVADA').orderBy(data.orderBy, order).paginate(page, 25);
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
      let data = request.only(['page', 'orderBy', 'cidade']);
      var order="";
      if(data.orderBy=="updated_at"){
      order="DESC"
      }else{
        order="ASC";
      }
      const page = Number(data.page) || 1
      var combusteveis = await Combustivel.query().whereHas('postos', (builder) => {
        builder.where('cidade', "=", data.cidade);
        builder.where('nome',"!=","null");
      }).with('postos').where('tipo', '=', 'ETANOL').orderBy(data.orderBy, order).paginate(page, 25);
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
      let data = request.only(['page', 'orderBy', 'cidade']);
      var order="";
      if(data.orderBy=="updated_at"){
      order="DESC"
      }else{
        order="ASC";
      }
      const page = Number(data.page) || 1
      var combusteveis = await Combustivel.query().whereHas('postos', (builder) => {
        builder.where('cidade', "=", data.cidade);
        builder.where('nome',"!=","null");
      }).with('postos').whereNotIn('tipo', ['ETANOL', 'GASOLINA ADITIVADA', "GASOLINA COMUM", "GNV"]).orderBy(data.orderBy, order).paginate(page, 25);
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
     
      //request.only([ 'page'])
      let data = request.only(['page', 'orderBy', 'cidade']);
      
      var order="";
      if(data.orderBy=="updated_at"){
      order="DESC"
      }else{
        order="ASC";
      }
     
      const page = Number(data.page) || 1
      var combusteveis = await Combustivel.query().whereHas('postos', (builder) => {
        builder.where('cidade', "=", data.cidade)
      }).where('tipo', '=', 'GNV').with('postos').orderBy(data.orderBy, order).paginate(page, 25);
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

  async gnvdistancia({ request, response, view, params, query }) {
    try {
      
      let data = request.only(['page', 'orderBy', 'cidade']);
      const page = Number(data.page) || 1
      const combusteveis = await Combustivel.query().whereHas('postos', (builder) => {
        builder.where('cidade', "=", data.cidade);
        builder.where('nome',"!=","null");
      }).where('tipo', '=', 'GNV').with('postos').orderBy(data.orderBy, 'ASC').fetch();
    
      var aux = [];

      var distancias = combusteveis.toJSON();
      distancias.map(t => {
        aux.push({
          "id": t.id,
          "posto_id": t.posto_id,
          "tipo": t.tipo,
          "valor": t.valor,
          "created_at": t.created_at,
          "updated_at": t.updated_at,
          "postos": t.postos,
          "distancia": (parseFloat(geolib.getPreciseDistance({ latitude: -12.2323411, longitude: -38.9772404 }, { latitude: parseFloat(t.postos.latitude), longitude: parseFloat(t.postos.longitude) }, 1)) / 1000)
        });
      });

      const sortDistancias = aux.sort((a, b) => a.distancia - b.distancia);
      function pag(array, page_size, page_number) {

        return array.slice((page_number - 1) * page_size, page_number * page_size);
      }

      return response.status(200).json({ total: sortDistancias.length, perPage: 25, page: page, lastPage: Math.ceil(sortDistancias.length / 25), data: pag(sortDistancias, 25, page) });
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }


  async etanoldistancia({ request, response, view, params, query }) {
    try {
      
      let data = request.only(['page', 'orderBy', 'cidade']);
      const page = Number(data.page) || 1
      const combusteveis = await Combustivel.query().whereHas('postos', (builder) => {
        builder.where('cidade', "=", data.cidade);
        builder.where('nome',"!=","null");
      }).where('tipo', '=', 'ETANOL').with('postos').orderBy(data.orderBy, 'ASC').fetch();
    
      var aux = [];

      var distancias = combusteveis.toJSON();
      distancias.map(t => {
        aux.push({
          "id": t.id,
          "posto_id": t.posto_id,
          "tipo": t.tipo,
          "valor": t.valor,
          "created_at": t.created_at,
          "updated_at": t.updated_at,
          "postos": t.postos,
          "distancia": (parseFloat(geolib.getPreciseDistance({ latitude: -12.2323411, longitude: -38.9772404 }, { latitude: parseFloat(t.postos.latitude), longitude: parseFloat(t.postos.longitude) }, 1)) / 1000)
        });
      });

      const sortDistancias = aux.sort((a, b) => a.distancia - b.distancia);
      function pag(array, page_size, page_number) {

        return array.slice((page_number - 1) * page_size, page_number * page_size);
      }

      return response.status(200).json({ total: sortDistancias.length, perPage: 25, page: page, lastPage: Math.ceil(sortDistancias.length / 25), data: pag(sortDistancias, 25, page) });
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }


  async gcomumdistancia({ request, response, view, params, query }) {
    try {
      
      let data = request.only(['page', 'orderBy', 'cidade']);
      const page = Number(data.page) || 1
      const combusteveis = await Combustivel.query().whereHas('postos', (builder) => {
        builder.where('cidade', "=", data.cidade);
        builder.where('nome',"!=","null");
      }).where('tipo', '=', 'GASOLINA COMUM').with('postos').orderBy(data.orderBy, 'ASC').fetch();
    
      var aux = [];

      var distancias = combusteveis.toJSON();
      distancias.map(t => {
        aux.push({
          "id": t.id,
          "posto_id": t.posto_id,
          "tipo": t.tipo,
          "valor": t.valor,
          "created_at": t.created_at,
          "updated_at": t.updated_at,
          "postos": t.postos,
          "distancia": (parseFloat(geolib.getPreciseDistance({ latitude: -12.2323411, longitude: -38.9772404 }, { latitude: parseFloat(t.postos.latitude), longitude: parseFloat(t.postos.longitude) }, 1)) / 1000)
        });
      });

      const sortDistancias = aux.sort((a, b) => a.distancia - b.distancia);
      function pag(array, page_size, page_number) {

        return array.slice((page_number - 1) * page_size, page_number * page_size);
      }

      return response.status(200).json({ total: sortDistancias.length, perPage: 25, page: page, lastPage: Math.ceil(sortDistancias.length / 25), data: pag(sortDistancias, 25, page) });
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }

  async gadtivadadistancia({ request, response, view, params, query }) {
    try {
      
      let data = request.only(['page', 'orderBy', 'cidade']);
      const page = Number(data.page) || 1
      const combusteveis = await Combustivel.query().whereHas('postos', (builder) => {
        builder.where('cidade', "=", data.cidade);
        builder.where('nome',"!=","null");
      }).where('tipo', '=', 'GASOLINA ADITIVADA').with('postos').orderBy(data.orderBy, 'ASC').fetch();
    
      var aux = [];

      var distancias = combusteveis.toJSON();
      distancias.map(t => {
        aux.push({
          "id": t.id,
          "posto_id": t.posto_id,
          "tipo": t.tipo,
          "valor": t.valor,
          "created_at": t.created_at,
          "updated_at": t.updated_at,
          "postos": t.postos,
          "distancia": (parseFloat(geolib.getPreciseDistance({ latitude: -12.2323411, longitude: -38.9772404 }, { latitude: parseFloat(t.postos.latitude), longitude: parseFloat(t.postos.longitude) }, 1)) / 1000)
        });
      });

      const sortDistancias = aux.sort((a, b) => a.distancia - b.distancia);
      function pag(array, page_size, page_number) {

        return array.slice((page_number - 1) * page_size, page_number * page_size);
      }

      return response.status(200).json({ total: sortDistancias.length, perPage: 25, page: page, lastPage: Math.ceil(sortDistancias.length / 25), data: pag(sortDistancias, 25, page) });
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
  }


  async dieseldistancia({ request, response, view, params, query }) {
    try {
      
      let data = request.only(['page', 'orderBy', 'cidade']);
      const page = Number(data.page) || 1
      var combusteveis = await Combustivel.query().whereHas('postos', (builder) => {
        builder.where('cidade', "=", data.cidade);
        builder.where('nome',"!=","null");
      }).with('postos').whereNotIn('tipo', ['ETANOL', 'GASOLINA ADITIVADA', "GASOLINA COMUM", "GNV"]).orderBy(data.orderBy, 'ASC').fetch();
    
      var aux = [];

      var distancias = combusteveis.toJSON();
      distancias.map(t => {
        aux.push({
          "id": t.id,
          "posto_id": t.posto_id,
          "tipo": t.tipo,
          "valor": t.valor,
          "created_at": t.created_at,
          "updated_at": t.updated_at,
          "postos": t.postos,
          "distancia": (parseFloat(geolib.getPreciseDistance({ latitude: -12.2323411, longitude: -38.9772404 }, { latitude: parseFloat(t.postos.latitude), longitude: parseFloat(t.postos.longitude) }, 1)) / 1000)
        });
      });

      const sortDistancias = aux.sort((a, b) => a.distancia - b.distancia);
      function pag(array, page_size, page_number) {

        return array.slice((page_number - 1) * page_size, page_number * page_size);
      }

      return response.status(200).json({ total: sortDistancias.length, perPage: 25, page: page, lastPage: Math.ceil(sortDistancias.length / 25), data: pag(sortDistancias, 25, page) });
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` });
    }
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
    try{
      const combustivel = await Combustivel.query().where('id',params.id).first();

      if(!combustivel){
        return response.status(500).send({message: `Id de combustível não existe!`});
      }

      return response.status(200).json(combustivel);
    }catch(err){
      return response.status(500).send({error: `Error ${err.message}`})
    }
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
    try{
      const data= request.only(['valor']);
      const combustivel = await Combustivel.query().where('id',params.id).first();

      if(!combustivel){
        return response.status(500).send({message: `Id de combustível não existe!`});
      }
      
      combustivel.valor= data.valor;
      combustivel.save();

      return response.status(200).json({message: "Alteração realizada com sucesso!", data:combustivel});
    }catch(err){
      return response.status(500).send({error: `Error ${err.message}`})
    }

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
