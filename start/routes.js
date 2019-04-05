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
	return 'Serveur en marche';
});

Route.group(() => {
	Route.post('/register', 'UserController.register');
	Route.post('/login', 'UserController.login');
	Route.get('/user', 'UserController.getUser').middleware([ 'auth:jwt' ]);
}).prefix('auth');

Route.group(() => {
	Route.put('/ids', 'UserController.updateIds');
	Route.put('/password', 'UserController.updatePassword');
	Route.post('/avatar', 'FileController.avatarPost');
})
	.prefix('update')
	.middleware([ 'auth:jwt' ]);

Route.group(() => {
	Route.get('/avatar/:id.jpg', 'FileController.avatarGet');
}).prefix('view');
