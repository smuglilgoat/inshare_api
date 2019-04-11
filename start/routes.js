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
	Route.post('/certificat', 'FileController.certifPost').middleware([ 'auth:jwt' ]);
	Route.delete('/certificat', 'FileController.deleteCertif').middleware([ 'auth:jwt' ]);
	Route.put('/certificat', 'CertificatController.updateCertif').middleware([ 'auth:jwt' ]);
})
	.prefix('update')
	.middleware([ 'auth:jwt' ]);

Route.group(() => {
	Route.get('/avatar/:id.jpg', 'FileController.avatarView');
	Route.get('/certificat/:id.jpg', 'FileController.certifView');
	Route.get('/certificat', 'FileController.certifGet').middleware([ 'auth:jwt' ]);
	Route.get('/certificats', 'FileController.certifGetAll').middleware([ 'auth:jwt' ]);
	Route.get('/users', 'UserController.getAllUsers').middleware([ 'auth:jwt' ]);
}).prefix('view');
