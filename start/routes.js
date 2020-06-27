'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'PostoController.starts')

Route.group(() => {
  Route.get('', 'HistoricoController.index');
  Route.get('/show/:id', 'HistoricoController.show');
  Route.get('grafico', 'HistoricoController.historico');

  //historico por tipos de combustiveis
  Route.get('gcomum:cidade?', 'HistoricoController.gcomum');
  Route.get('gaditivada:cidade?', 'HistoricoController.gaditivada');
  Route.get('gnv:cidade?', 'HistoricoController.gnv');
  Route.get('etanol:cidade?', 'HistoricoController.etanol');
  Route.get('diesel:cidade?', 'HistoricoController.diesel');
 

}).prefix('historicos');

Route.group(() => {
  Route.get('', 'ComentarioController.index');
  Route.post('', 'ComentarioController.store');
  Route.delete(':id', 'ComentarioController.destroy');
}).prefix('comentarios');

Route.group(() => {

  Route.get('', 'CombustivelController.index');
  Route.delete(':id', 'CombustivelController.destroy');
  Route.get('gcomum:page?:orderBy?', 'CombustivelController.gcomum');
  Route.get('gaditivada:page?:orderBy?', 'CombustivelController.gaditivada');
  Route.get('etanol:page?:orderBy?', 'CombustivelController.etanol');
  Route.get('diesel:page?:orderBy?', 'CombustivelController.diesel');
  Route.get('gnv:page?:orderBy?', 'CombustivelController.gnv');

  //distancia 
  Route.get('distancia/gnv:page?:orderBy?', 'CombustivelController.gnvdistancia');
  Route.get('distancia/etanol:page?:orderBy?', 'CombustivelController.etanoldistancia');
  Route.get('distancia/gcomum:page?:orderBy?', 'CombustivelController.gcomumdistancia');
  Route.get('distancia/gaditivada:page?:orderBy?', 'CombustivelController.gadtivadadistancia');
  Route.get('distancia/diesel:page?:orderBy?', 'CombustivelController.dieseldistancia');

  //Crud
  Route.get('/busca/:id', 'CombustivelController.show');
  Route.post('/busca/:id', 'CombustivelController.edit');
  

}).prefix('combustiveis');

Route.group(() => {
  
  Route.post('create', 'PostoController.create');
  Route.get('json', 'PostoController.jsonadd');
  Route.get('arquivos', 'PostoController.jsonvisualizar');
  Route.put('update', 'PostoController.update');
  Route.get('', 'PostoController.index');
  Route.get('paginacao', 'PostoController.paginacao');

  //feira de santana
  Route.get("gasolina", "PostoController.gasolina");
  Route.get("etanol", "PostoController.etanol");
  Route.get("diesel", "PostoController.diesel");
  Route.get("gnv", "PostoController.gnv");

  //salvador
  Route.get("gnvssa", "PostoController.gnvssa");
  Route.get("gasolinassa", "PostoController.gasolinassa");
  Route.get("etanolssa", "PostoController.etanolssa");
  Route.get("dieselssa", "PostoController.dieselssa");

  //santo estevão
  Route.get("gasolinasantis", "PostoController.gasolinasantis");
  Route.get("etanolsantis", "PostoController.etanolsantis");
  Route.get("dieselsantis", "PostoController.dieselsantis");

  //conceição do jacuipé
  Route.get("gasolinaberimbau", "PostoController.gasolinaberimbau");
  Route.get("etanolberimbau", "PostoController.etanolberimbau");
  Route.get("dieselberimbau", "PostoController.dieselberimbau");

  //são gonçalo dos campos 
  Route.get("gasolinagonca", "PostoController.gasolinagonca");
  Route.get("etanolgonca", "PostoController.etanolgonca");
  Route.get("dieselgonca", "PostoController.dieselgonca");

  //itamaraju 
  Route.get("gasolinaita", "PostoController.gasolinaita");
  Route.get("etanolita", "PostoController.etanolita");
  Route.get("dieselita", "PostoController.dieselita");

  Route.post(":id", "PostoController.edit");
  Route.get(":id", "PostoController.show");
}).prefix('postos')