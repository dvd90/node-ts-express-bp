import dotenv from 'dotenv';

dotenv.config();
import express, { Express } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import {
  ResponseHandler,
  initCORS,
  initErrorHandler,
  initSentry
} from '../handlers';
import initRoutes from '../routes';
import { PORT } from '../utils';
import morganBody from 'morgan-body';
import {
  callIdMiddleware,
  logMiddleware,
  morganMiddleware
} from '../middleware';
import { initDB } from '../db';

// Initialize Mongodb
export let DB: mongoose.Connection | undefined;
initDB().then((connection: mongoose.Connection) => {
  DB = connection;
});

export default async function (testFlag?: boolean): Promise<Express> {
  const app = express();
  app.use(express.json());
  app.use(helmet());
  app.set('port', PORT || 3000);

  if (process.env.NODE_ENV !== 'production') {
    morganBody(app);
    app.use(morganMiddleware);
    app.use(logMiddleware);
  }

  app.use(ResponseHandler.responseHandlerMiddleware);

  // CORS
  initCORS(app);

  // Adding call ID to every request
  app.use(callIdMiddleware);

  // Initialize Routes
  initRoutes(app);

  // Initialize Error Handlers
  initErrorHandler(app);
  initSentry(app, false);

  return app;
}
