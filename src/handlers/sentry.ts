import * as Sentry from '@sentry/node';
import express from 'express';

import { environment, sentryDsn } from '../utils';

export const initSentry = (
  app: express.Application,
  testFlag: boolean
): void => {
  if (environment === 'production' || environment === 'prod' || testFlag) {
    Sentry.init({
      dsn: sentryDsn
    });
    app.use(Sentry.Handlers.errorHandler());
  }
};
