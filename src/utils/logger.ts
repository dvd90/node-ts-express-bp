import chalk from 'chalk';
import * as Sentry from '@sentry/node';

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

export function sentryErrLog(err: string, data: unknown): void {
  const additionalInfo = data ? ' : ' + JSON.stringify(data) : '';
  Sentry.captureException(err + additionalInfo);

  if (data) error(new Date().toISOString() + ': ', err, data);
  else error(new Date().toISOString() + ': ', err);
}

export function sentryMessageHandler(context: string, data: unknown): void {
  const additionalInfo = data ? ' : ' + JSON.stringify(data) : '';

  Sentry.captureMessage(context + additionalInfo);
}
