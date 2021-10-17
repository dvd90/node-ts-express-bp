import express from 'express';
import { ICustomRequest, randomString } from '../utils';

export function callIdMiddleware(
  req: ICustomRequest,
  res: express.Response,
  next: express.NextFunction
): void {
  // callId
  const callId = randomString(
    12,
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  );

  // Set up call id in the request
  req.callId = callId;

  next();
}
