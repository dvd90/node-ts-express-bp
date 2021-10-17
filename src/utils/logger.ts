import chalk from 'chalk';
import * as Sentry from '@sentry/node';
import { LeanRequest } from './interfaces';

// region ERROR JSON handling
// this will define a proper toJSON function on the standard Error object prototype
// and thus will allow it to be JSON.stringify-ed properly
if (!('toJSON' in Error.prototype))
  Object.defineProperty(Error.prototype, 'toJSON', {
    value: function () {
      const alt = {};

      Object.getOwnPropertyNames(this).forEach(function (key) {
        alt[key] = this[key];
      }, this);

      return alt;
    },
    configurable: true,
    writable: true
  });
// endregion ERROR JSON handling

export const { log, error } = console;

export function logDanger(content: string): void {
  log(chalk.red.bold(content));
}

export function logWarning(content: string): void {
  log(chalk.yellow.bold(content));
}

export function logSuccess(content: string): void {
  log(chalk.green.bold(content));
}

export function logPrimary(content: string): void {
  log(chalk.blue.bold(content));
}

export function logConsole(content: unknown): void {
  log(content);
}

export function sentryErrLog(
  err: Error,
  title?: string, // TODO: title ignored, maybe send it to sentry as well
  user?: unknown,
  request?: LeanRequest
): void {
  Sentry.captureException(err, { extra: { request }, user });

  if (request) error(new Date().toISOString() + ': ', err, request);
  else error(new Date().toISOString() + ': ', err);
}

export function sentryMessageHandler(context: string, data: unknown): void {
  const additionalInfo = data ? ' : ' + JSON.stringify(data) : '';

  Sentry.captureMessage(context + additionalInfo);
}
