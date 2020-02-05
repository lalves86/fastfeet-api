import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import DelivererController from './app/controllers/DelivererController';
import OrderController from './app/controllers/OrderController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/users', UserController.index);

routes.get('/users/:id', UserController.show);

routes.post('/users', UserController.store);

routes.put('/users/:id', UserController.update);

routes.delete('/users/:id', UserController.delete);

routes.get('/recipients', RecipientController.index);

routes.get('/recipients/:id', RecipientController.show);

routes.post('/recipients', RecipientController.store);

routes.put('/recipients/:id', RecipientController.update);

routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliverers', DelivererController.index);

routes.get('/deliverers/:id', DelivererController.show);

routes.post('/deliverers', DelivererController.store);

routes.put('/deliverers/:id', DelivererController.update);

routes.delete('/deliverers/:id', DelivererController.delete);

routes.post('/orders', OrderController.store);

export default routes;
