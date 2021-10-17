/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import express from 'express';
import { ValidationError } from 'express-validator';
import {
  ERROR_CODES,
  ExpressRoute,
  IApiErrorObj,
  IApiResponseObj,
  ICustomRequest,
  IErrorCode,
  indexedObject,
  LeanRequest,
  log,
  sentryErrLog,
  winstonLogger
} from '.';

/***
 * This decorator will force a "floating" function (instance function) to be bound to it's object
 */
export function bound(): (
  target: indexedObject,
  propertyName: string,
  descriptor?: PropertyDescriptor
) => void {
  return (
    target: indexedObject,
    propertyName: string,
    descriptor?: PropertyDescriptor
  ): void => {
    const originalFunction = (
      descriptor?.value || (target as ExpressRoute)
    ).bind(target);
    // const factory = (req: ICustomRequest,
    //                        res: express.Response): express.Response<unknown> => {
    //   return originalFunction(req, res);
    // }
    if (descriptor) {
      descriptor.value = originalFunction;
    }
  };
}

/***
 * This will surround a function with error catching
 */
export function handleError(): (
  target: indexedObject,
  propertyName: string,
  descriptor?: TypedPropertyDescriptor<ExpressRoute>
) => void {
  return (
    target: indexedObject,
    propertyName: string,
    descriptor?: TypedPropertyDescriptor<ExpressRoute>
  ): void => {
    const originalFunction = (
      descriptor?.value || (target as ExpressRoute)
    ).bind(target);

    const factory = async (
      req: ICustomRequest,
      res: express.Response
    ): Promise<express.Response<unknown>> => {
      try {
        return await originalFunction(req, res);
      } catch (error) {
        log(error);
        return errCatchResHandler(
          res,
          req,
          ERROR_CODES.SERVER_ERROR,
          `err in ${target.constructor.name}/${propertyName}`,
          error
        );
      }
    };
    if (descriptor) {
      descriptor.value = factory;
    } else {
      target = factory;
    }
  };
}

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
  req: ICustomRequest,
  errCodeObj: IErrorCode,
  sentryErrTitle: string,
  path: string,
  messageParam?: string | ValidationError[]
): express.Response<unknown, Record<string, unknown>> {
  let errorMessage = errCodeObj.message(messageParam);
  if (typeof errorMessage !== 'string') {
    errorMessage = JSON.stringify(errorMessage);
  }
  sentryErrLog(
    new Error(errorMessage),
    sentryErrTitle,
    req.user,
    toLeanRequest(req)
  );
  // sentryErrLog(sentryErrTitle, {
  //   error: errCodeObj.message(messageParam),
  //   statusCode: errCodeObj.statusCode,
  //   errorCode: errCodeObj.id,
  //   path,
  //   callId: callId ?? ''
  // });
  winstonLogger.error(errCodeObj.message(messageParam) as string, {
    callId: req.callId ?? '',
    errorId: errCodeObj.id
  });

  const errObj: IApiErrorObj = {
    statusReason: errCodeObj.statusReason,
    errorMessage: errCodeObj.message(messageParam),
    errorCode: errCodeObj.id,
    statusCode: errCodeObj.statusCode,
    callId: req.callId ?? '',
    time: Date.now()
  };

  return res.status(errCodeObj.statusCode).json(errObj);
}

export function errCatchResHandler(
  res: express.Response,
  req: ICustomRequest,
  errCodeObj: IErrorCode,
  sentryErrTitle: string,
  errorSystem: Error
): express.Response<unknown, Record<string, unknown>> {
  sentryErrLog(errorSystem, sentryErrTitle, req.user, toLeanRequest(req));
  winstonLogger.error(errCodeObj.statusReason, {
    callId: req.callId ?? '',
    errorId: errCodeObj.id
  });

  const errObj: IApiErrorObj = {
    statusReason: errCodeObj.statusReason,
    errorMessage: errorSystem.message,
    errorCode: errCodeObj.id,
    statusCode: errCodeObj.statusCode,
    callId: req.callId ?? '',
    time: Date.now()
  };

  return res.status(errCodeObj.statusCode).json(errObj);
}

function toLeanRequest({
  body,
  query,
  callId,
  path
}: ICustomRequest): LeanRequest {
  return { body, query, callId, path };
}
