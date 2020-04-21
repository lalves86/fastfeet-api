import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import DelivererController from './app/controllers/DelivererController';
import OrderController from './app/controllers/OrderController';
import FileController from './app/controllers/FileController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import DeliveryController from './app/controllers/DeliveryController';
import ProblemController from './app/controllers/ProblemController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Rotas públicas
routes.post('/sessions', SessionController.store);

routes.get('/schedule/:id', ScheduleController.index);

routes.get('/notifications/:id', NotificationController.index);

routes.put(
  '/notifications/:delivererId/:notificationId',
  NotificationController.update
);

routes.get('/deliveries/:delivererId', DeliveryController.index);

routes.put('/deliveries/:delivererId/:orderId', DeliveryController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/orders/:orderId/problems', ProblemController.store);

routes.get('/deliverers/:id', DelivererController.show);

routes.get('/problems/:orderId', ProblemController.show);

// Middleware de autenticação
routes.use(authMiddleware);

// Rotas com autenticação
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

routes.post('/deliverers', DelivererController.store);

routes.put('/deliverers/:id', DelivererController.update);

routes.delete('/deliverers/:id', DelivererController.delete);

routes.get('/orders', OrderController.index);

routes.get('/orders/:id', OrderController.show);

routes.post('/orders', OrderController.store);

routes.put('/orders/:id', OrderController.update);

routes.delete('/orders/:id', OrderController.delete);

routes.get('/problems', ProblemController.index);

routes.delete('/problems/:orderId', ProblemController.delete);

export default routes;
