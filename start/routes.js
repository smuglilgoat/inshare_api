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
<<<<<<< HEAD
	return 'Server is running';
});

Route.group(() => {
	Route.post('/inscription', 'UserController.inscription');
	Route.post('/connexion', 'UserController.connexion');
	Route.get('/role', 'UserController.role');
=======
	return 'Serveur en marche';
});

Route.group(() => {
	Route.post('/register', 'UserController.register');
	Route.post('/login', 'UserController.login');
	Route.get('/user', 'UserController.getUser').middleware([ 'auth:jwt' ]);
>>>>>>> clean up
}).prefix('auth');

Route.group(() => {
	Route.put('/ids', 'UserController.updateIds');
	Route.put('/password', 'UserController.updatePassword');
	Route.post('/avatar', 'FileController.avatarPost');
})
	.prefix('update')
	.middleware([ 'auth:jwt' ]);

Route.group(() => {
<<<<<<< HEAD
	Route.get('/moi', 'UserController.me');
})
	.prefix('profile')
	.middleware([ 'auth:jwt' ]);
=======
	Route.get('/avatar/:id.jpg', 'FileController.avatarGet');
}).prefix('view');
>>>>>>> clean up
