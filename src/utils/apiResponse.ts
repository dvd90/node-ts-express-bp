/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import express from 'express';
import { ValidationError } from 'express-validator';
import {
  IApiErrorObj,
  IApiResponseObj,
  IErrorCode,
  indexedObject,
  sentryErrLog,
  winstonLogger
} from '.';

export function resHandler(
  res: express.Response,
  errCodeObj: IErrorCode,
  callId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
): express.Response<unknown, Record<string, unknown>> {
  const apiResponse: IApiResponseObj = {
    statusCode: errCodeObj.statusCode,
    errorCode: errCodeObj.id,
    statusReason: errCodeObj.statusReason,
    callId: callId ?? '',
    data,
    time: Date.now()
  };
  winstonLogger.info(errCodeObj.statusReason, {
    callId: callId ?? '',
    errorId: errCodeObj.id
  });

  return res.status(errCodeObj.statusCode).json(apiResponse);
}

export function errResHandler(
  res: express.Response,
  errCodeObj: IErrorCode,
  sentryErr: string,
  path: string,
  callId?: string,
  messageParam?: string | ValidationError[]
): express.Response<unknown, Record<string, unknown>> {
  sentryErrLog(sentryErr, {
    error: errCodeObj.message(messageParam),
    statusCode: errCodeObj.statusCode,
    errorCode: errCodeObj.id,
    path,
    callId: callId ?? ''
  });
  winstonLogger.error(errCodeObj.message(messageParam) as string, {
    callId: callId ?? '',
    errorId: errCodeObj.id
  });

  const errObj: IApiErrorObj = {
    statusReason: errCodeObj.statusReason,
    errorMessage: errCodeObj.message(messageParam),
    errorCode: errCodeObj.id,
    statusCode: errCodeObj.statusCode,
    callId: callId ?? '',
    time: Date.now()
  };

  return res.status(errCodeObj.statusCode).json(errObj);
}

export function errCatchResHandler(
  res: express.Response,
  errCodeObj: IErrorCode,
  sentryErr: string,
  callId: string,
  errorSystem: indexedObject
): express.Response<unknown, Record<string, unknown>> {
  sentryErrLog(sentryErr, {
    ...errorSystem,
    callId: callId ?? ''
  });
  winstonLogger.error(errCodeObj.statusReason, {
    callId: callId ?? '',
    errorId: errCodeObj.id
  });

  const errObj: IApiErrorObj = {
    statusReason: errCodeObj.statusReason,
    errorMessage: errorSystem.message,
    errorCode: errCodeObj.id,
    statusCode: errCodeObj.statusCode,
    callId: callId ?? '',
    time: Date.now()
  };

  return res.status(errCodeObj.statusCode).json(errObj);
}
