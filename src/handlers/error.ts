import express from 'express';

export const initErrorHandler = (app: express.Application): void => {
  // Error Handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({ error: err.message });
  });
};
