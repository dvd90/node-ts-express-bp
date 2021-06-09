import express from 'express';
import { StatusController } from '../controllers';

// Create the controller instance
const controller = new StatusController();

export function initStatusRoutes(router: express.Router): void {
  router.get('/status', controller.show);
}
