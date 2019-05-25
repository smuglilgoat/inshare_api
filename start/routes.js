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

Route.get('/users-list', 'UserController.queryList');

Route.get('/avatars/:id.jpg', 'FileController.viewAvatar');
Route.post('/avatars', 'FileController.postAvatar').middleware([ 'auth:jwt' ]);
Route.get('/certificats/:id.jpg', 'FileController.viewCertif');
Route.get('/documents/:id/download', 'FileController.downloadDoc');
Route.get('/documents/:id/images/:filename', 'ImageController.viewImage');
Route.get('/documents/:id/images', 'ImageController.index');
Route.get('/documents/:id/video', 'VideoController.show');

Route.get('/certificats', 'CertificatController.index').middleware([ 'auth:jwt' ]);
Route.post('/certificats', 'CertificatController.create').middleware([ 'auth:jwt' ]);
Route.get('/certificats/:id', 'CertificatController.show').middleware([ 'auth:jwt' ]);
Route.put('/certificats/:id', 'CertificatController.update').middleware([ 'auth:jwt' ]);
Route.delete('/certificats/:id', 'CertificatController.delete').middleware([ 'auth:jwt' ]);

Route.get('/documents', 'DocumentController.index').middleware([ 'auth:jwt' ]);
Route.post('/documents/create/t=:type', 'DocumentController.create').middleware([ 'auth:jwt' ]);
Route.get('/documents/doc=:id', 'DocumentController.show');
Route.put('/documents/doc=:id', 'DocumentController.update').middleware([ 'auth:jwt' ]);
Route.delete('/documents/doc=:id', 'DocumentController.delete').middleware([ 'auth:jwt' ]);

Route.get('/documents/category=:category', 'DocumentController.queryCategory');
Route.get('/documents/user=:id', 'DocumentController.queryUser');
Route.get('/documents/query', 'DocumentController.queryTags');

Route.post('/documents/:id/report', 'MailController.report').middleware([ 'auth:jwt' ]);
Route.post('/documents/:id/rate', 'RatingController.update').middleware([ 'auth:jwt' ]);

Route.get('/documents/:id/comments', 'CommentController.index');
Route.put('/documents/:id/comments', 'CommentController.create').middleware([ 'auth:jwt' ]);
Route.get('/documents/:id/comments/:idc', 'CommentController.show');
Route.put('/documents/:id/comments/:idc', 'CommentController.update').middleware([ 'auth:jwt' ]);
Route.delete('/documents/:id/comments/:idc', 'CommentController.destroy').middleware([ 'auth:jwt' ]);

Route.get('/tags', 'TagController.index');
