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

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})




Route.group(() => {
  Route.post('create','PostoController.create');
  Route.post('create/etanol','PostoController.createEtanol');
  Route.put('update','PostoController.update');
  Route.get('','PostoController.index');
  Route.get("gasolina", "PostoController.app");
  Route.get("etanol", "PostoController.etanol");
  Route.get("diesel", "PostoController.diesel");

  Route.post(":id", "PostoController.edit");
}).prefix('postos')