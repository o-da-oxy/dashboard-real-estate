import express from 'express';
import {
  createPropertyController,
  deletePropertyController,
  getAllPropertiesController,
  updatePropertyController
} from './properties.controller.js';

const routes = express.Router();

routes.get('/', getAllPropertiesController);
routes.post('/', createPropertyController);
routes.put('/', updatePropertyController);
routes.delete('/', deletePropertyController);

export { routes };
