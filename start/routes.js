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

Route.get('/','PostoController.starts')

Route.group(() => {
  Route.get('','ComentarioController.index');
  Route.post('','ComentarioController.store');
  Route.delete(':id','ComentarioController.destroy');
}).prefix('comentarios');

Route.group(() => {
  
  Route.delete(':id','CombustivelController.destroy');
}).prefix('combustiveis');

Route.group(() => {
  Route.post('create','PostoController.create');
  Route.get('json','PostoController.jsonadd');
  Route.get('arquivos','PostoController.jsonvisualizar');
  Route.put('update','PostoController.update');
  Route.get('','PostoController.index');
  Route.get("gasolina", "PostoController.app");
  Route.get("etanol", "PostoController.etanol");
  Route.get("diesel", "PostoController.diesel");
  Route.get("gnv", "PostoController.gnv");
  Route.post(":id", "PostoController.edit");
  Route.get(":id", "PostoController.show");
}).prefix('postos')