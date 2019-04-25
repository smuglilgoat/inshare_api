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
	Route.post('/register', 'UserController.createUser');
	Route.post('/certificat', 'CertificatController.createCertif').middleware([ 'auth:jwt' ]);
	Route.post('/document', 'DocumentController.createDoc').middleware([ 'auth:jwt' ]);
}).prefix('create');

Route.group(() => {
	Route.post('/login', 'UserController.login');
	Route.get('/user', 'UserController.getUser').middleware([ 'auth:jwt' ]);
	Route.get('/users', 'UserController.getUsers').middleware([ 'auth:jwt' ]);
	Route.get('/avatar/:id.jpg', 'UserController.viewAvatar');
	Route.get('/certificat/:id.jpg', 'CertificatController.viewCertif');
	Route.get('/document/:id.jpg', 'DocumentController.viewDoc');
	Route.get('/certificat', 'CertificatController.getCertif').middleware([ 'auth:jwt' ]);
	Route.get('/certificats', 'CertificatController.getCertifs').middleware([ 'auth:jwt' ]);
}).prefix('read');

Route.group(() => {
	Route.put('/ids', 'UserController.updateIds');
	Route.put('/password', 'UserController.updatePassword');
	Route.post('/avatar', 'UserController.updateAvatar');
	Route.put('/user', 'UserController.updateUser');
	Route.put('/certificat', 'CertificatController.updateCertif');
	Route.put('/document', 'DocumentController.updateDoc');
})
	.prefix('update')
	.middleware([ 'auth:jwt' ]);

Route.group(() => {
	Route.delete('/certificat', 'CertificatController.deleteCertif');
	Route.delete('/user', 'UserController.deleteUser');
	Route.delete('/document', 'DocumentController.deleteDoc');
})
	.prefix('delete')
	.middleware([ 'auth:jwt' ]);
