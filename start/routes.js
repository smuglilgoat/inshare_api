'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
	return { greeting: 'Hello world in JSON' };
});

Route.group(() => {
	Route.post('/inscription', 'UserController.inscription');
	Route.post('/connexion', 'UserController.connexion');
}).prefix('auth');

Route.group(() => {
	Route.get('/profile', 'UserController.profile');
	Route.put('/parametres', 'UserController.parametres');
})
	.prefix('compte')
	.middleware([ 'auth:jwt' ]);
