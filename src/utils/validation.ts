import express from 'express';
import { ValidationChain, check, validationResult } from 'express-validator';
import { ICustomRequest } from '.';

export class BodyValidator {
  static exemple(): (
    | ValidationChain
    | ((
        req: ICustomRequest,
        res: express.Response,
        next: express.NextFunction
      ) => void | express.Response<unknown>)
  )[] {
    return [
      this.checkNotEmpty('exemple', 'exemple'),
      this.errValidationMiddleware
    ];
  }

  // Response Handler for validation errors
  static errValidationMiddleware(
    req: ICustomRequest,
    res: express.Response,
    next: express.NextFunction
  ): express.Response<unknown> | void {
    const { resHandler } = req;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return resHandler.validation(errors.array());
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
