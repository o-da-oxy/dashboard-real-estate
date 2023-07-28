import express from 'express';
import { routes as realtorsRoutes } from '../realtors/realtors.router.js';
import { routes as propertiesRoutes } from '../properties/properties.router.js';
import { healthCheckController } from '../base-controllers/health-check.controller.js';
import { notFoundController } from '../base-controllers/not-found.controller.js';
import { errorHandler } from './error.handler.js';

const routes = express.Router();

routes.use('/realtors', realtorsRoutes);
routes.use('/properties', propertiesRoutes);
routes.use('/health', healthCheckController);
routes.use('*', notFoundController);

routes.use(errorHandler);

export { routes };
