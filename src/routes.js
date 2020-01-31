import { Router } from 'express';

import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

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

export default routes;
