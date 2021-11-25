import express from 'express';
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
export let DB: mongoose.Connection | undefined;
initDB().then((connection: mongoose.Connection) => {
  DB = connection;
});

app.set('port', PORT);

if (process.env.NODE_ENV !== 'production') {
  morganBody(app);
  app.use(morganMiddleware);
  app.use(logMiddleware);
}

// CORS
initCORS(app);

// Adding call ID to every request
app.use(callIdMiddleware);

// Initialize Routes
initRoutes(app);

// Initialize Error Handlers
initErrorHandler(app);
initSentry(app, false);

export default app;
