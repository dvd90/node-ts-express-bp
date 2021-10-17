import express from 'express';
import { log, logPrimary } from '../utils';

export function logMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  logPrimary('REQUEST-HEADER:');
  log(req.headers);

  next();
}
