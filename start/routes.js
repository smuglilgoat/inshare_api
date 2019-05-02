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
	return 'API en marche';
});

Route.group(() => {
	Route.post('/register', 'AuthController.register');
	Route.post('/login', 'AuthController.login');
}).prefix('auth');

Route.get('/users', 'UserController.index').middleware([ 'auth:jwt' ]);
Route.get('/users/:id', 'UserController.show');
Route.put('/users/:id', 'UserController.update').middleware([ 'auth:jwt' ]);
Route.delete('/users/:id', 'UserController.delete').middleware([ 'auth:jwt' ]);

Route.get('/avatars/:id.jpg', 'FileController.viewAvatar');
Route.post('/avatars', 'FileController.postAvatar').middleware([ 'auth:jwt' ]);
Route.get('/certificats/:id.jpg', 'FileController.viewCertif');

Route.get('/documents/:id/images/:filename', 'ImageController.viewImage');
Route.get('/documents/:id/images', 'ImageController.index');

Route.get('/certificats', 'CertificatController.index').middleware([ 'auth:jwt' ]);
Route.post('/certificats', 'CertificatController.create').middleware([ 'auth:jwt' ]);
Route.get('/certificats/:id', 'CertificatController.show').middleware([ 'auth:jwt' ]);
Route.put('/certificats/:id', 'CertificatController.update').middleware([ 'auth:jwt' ]);
Route.delete('/certificats/:id', 'CertificatController.delete').middleware([ 'auth:jwt' ]);

Route.get('/documents', 'DocumentController.index').middleware([ 'auth:jwt' ]);
Route.get('/documents/category=:category', 'DocumentController.queryCategory');
Route.post('/documents', 'DocumentController.create').middleware([ 'auth:jwt' ]);
Route.get('/documents/:id', 'DocumentController.show');
Route.put('/documents/:id', 'DocumentController.update').middleware([ 'auth:jwt' ]);
Route.delete('/documents/:id', 'DocumentController.delete').middleware([ 'auth:jwt' ]);
