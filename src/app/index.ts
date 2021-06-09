import express, { Router } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { initCORS, initErrorHandler, initSentry } from '../handlers';
import initRoutes from '../routes';
import { PORT } from '../utils';
import morganBody from 'morgan-body';
import {
  callIdMiddleware,
  logMiddleware,
  morganMiddleware
} from '../middleware';
import { initDB } from '../db';

dotenv.config();

const app = express();
app.use(express.json());

app.use(helmet());

// Initialize Mongodb
export const DB = (initDB() as unknown) as mongoose.Connection;

app.set('port', PORT);

if (process.env.NODE_ENV === 'development') {
  morganBody(app);
  app.use(morganMiddleware);
  app.use(logMiddleware);
}

// CORS
initCORS(app);

// Adding call ID to every request
app.use(callIdMiddleware);

const router = Router();

// Initialize Routes
initRoutes(app, router);

// Initialize Error Handlers
initErrorHandler(app);
initSentry(app, true);

export default app;
