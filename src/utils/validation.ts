import express from 'express';
import { ValidationChain, check, validationResult } from 'express-validator';
import { ERROR_CODES, errResHandler, ICustomRequest } from '.';

export class BodyValidator {
  // Response Handler for validation errors
  static errValidationMiddleware(
    req: ICustomRequest,
    res: express.Response,
    next: express.NextFunction
  ): express.Response<unknown> | void {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errResHandler(
        res,
        ERROR_CODES.VALIDATION,
        'err in Validations',
        'Validations',
        req.callId,
        errors.array()
      );
    }

    next();
  }

  private static checkNotEmpty(
    field: string,
    message: string
  ): ValidationChain {
    return check(field, `${message} is required`).not().isEmpty();
  }
}
