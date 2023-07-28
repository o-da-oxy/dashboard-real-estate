import express from 'express';
import {
  createRealtorController,
  getAllRealtorsController,
  updateRealtorController,
  deleteRealtorController
} from './realtors.controller.js';

const routes = express.Router();

routes.get('/', getAllRealtorsController);
routes.post('/', createRealtorController);
routes.put('/', updateRealtorController);
routes.delete('/', deleteRealtorController);

export { routes };
