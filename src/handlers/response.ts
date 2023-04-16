import express from 'express';

import {
  ERROR_CODES,
  ICustomRequest,
  IErrorCode,
  indexedObject,
  // sentryErrLog,
  winstonLogger
} from '../utils';
import { ValidationError } from 'express-validator';

export class ResponseHandler {
  req: ICustomRequest;
  res: express.Response;

  constructor(req: ICustomRequest, res: express.Response) {
    this.req = req;
    this.res = res;
  }

  static responseHandlerMiddleware(
    req: ICustomRequest,
    res: express.Response,
    next: express.NextFunction
  ): void {
    req.resHandler = new ResponseHandler(req, res);

    return next();
  }

  ok(data?: indexedObject | unknown): express.Response<unknown> {
    this.populateAndPrintMeta(ERROR_CODES.OK);

    return this.res.status(200).send(data);
  }

  wrongToken(data?: indexedObject): express.Response<unknown> {
    const response = this.populateAndPrintMeta(ERROR_CODES.WRONG_TOKEN);

    return this.res.status(401).send({ ...response, ...data });
  }

  validation(message?: ValidationError[]): express.Response<unknown> {
    const response = this.populateAndPrintMeta(ERROR_CODES.VALIDATION);

    return this.res
      .status(ERROR_CODES.VALIDATION.statusCode)
      .send({ ...response, message });
  }

  notFound(message: string): express.Response<unknown> {
    const response = this.populateAndPrintMeta(ERROR_CODES.NOT_FOUND);

    return this.res
      .status(ERROR_CODES.NOT_FOUND.statusCode)
      .send({ ...response, message });
  }

  badRequest(message: string): express.Response<unknown> {
    const response = this.populateAndPrintMeta(ERROR_CODES.VALIDATION);

    return this.res
      .status(ERROR_CODES.VALIDATION.statusCode)
      .send({ ...response, message });
  }

  forbidden(message: string): express.Response<unknown> {
    const response = this.populateAndPrintMeta(ERROR_CODES.FORBIDDEN);

    return this.res
      .status(ERROR_CODES.FORBIDDEN.statusCode)
      .send({ ...response, message });
  }

  manualError(
    errorCodeObj: IErrorCode,
    data: indexedObject = {}
  ): express.Response<unknown> {
    const response = this.populateAndPrintMeta(errorCodeObj);

    return this.res
      .status(errorCodeObj.statusCode)
      .send({ ...response, ...data });
  }

  error(error: Error): express.Response<unknown> {
    this.populateAndPrintMeta(ERROR_CODES.SERVER_ERROR);

    const errObj: Record<string, unknown> = {
      statusReason: ERROR_CODES.SERVER_ERROR.statusReason,
      errorMessage: error.message || 'Server error',
      errorCode: ERROR_CODES.SERVER_ERROR.id,
      statusCode: ERROR_CODES.SERVER_ERROR.statusCode,
      callId: this.req.callId ?? '',
      stack: error.stack,
      method: this.req.method,
      endpoint: this.req.path,
      body: this.req.body,
      query: this.req.query,
      time: new Date()
    };

    // To init & choose what to return
    // sentryErrLog(errObj as any, this.req?.body);

    return this.res.status(ERROR_CODES.SERVER_ERROR.statusCode).json(errObj);
  }

  private populateAndPrintMeta(
    errorCodeObj: IErrorCode
  ): Record<string, unknown> {
    const meta = {
      status: errorCodeObj.statusCode,
      callId: this.req.callId ?? '',
      errorId: errorCodeObj.id.toString(),
      method: this.req.method,
      endpoint: this.req.path,
      body: this.req.body,
      query: this.req.query,
      time: new Date()
    };

    if (errorCodeObj.statusCode <= 299)
      winstonLogger.info(errorCodeObj.statusReason, meta);
    else winstonLogger.error(errorCodeObj.statusReason, meta);

    return meta;
  }
}
