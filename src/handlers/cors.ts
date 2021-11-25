import express from 'express';
import cors from 'cors';
import { log } from '../utils';

export const initCORS = (app: express.Application): void => {
  app.use(
    cors({
      credentials: true,
      origin: (origin, callback) => {
        if (
          !origin ||
          origin === 'null' ||
          [
            'localhost',
            'file://',
            'chrome-extension://' // To test from Postman App
          ].some((value) => origin.indexOf(value) >= 0)
        ) {
          callback(null, true);
        } else {
          log('not allowed by CORS', origin);
          callback(new Error('Not allowed by CORS'));
        }
      }
    })
  );
};
