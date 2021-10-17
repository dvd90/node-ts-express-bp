import express from 'express';
import { ValidationChain, check, validationResult } from 'express-validator';
import { ERROR_CODES, errResHandler, ICustomRequest } from '.';

export class BodyValidator {
  static newNote(): (
    | ValidationChain
    | ((
        req: ICustomRequest,
        res: express.Response,
        next: express.NextFunction
      ) => void | express.Response<unknown>)
  )[] {
    return [
      this.checkNotEmpty('note', 'note'),
      this.checkNotEmpty('note.video_id', 'note.video_id'),
      this.checkNotEmpty('note.message', 'note.message'),
      this.checkNotEmpty('note.email', 'note.email'),
      this.checkNotEmpty('sendingInfo', 'sendingInfo'),
      this.checkNotEmpty('sendingInfo.sendToEmail', 'sendingInfo.sendToEmail'),

      this.errValidationMiddleware
    ];
  }

  static createViewEntry(): (
    | ValidationChain
    | ((
        req: ICustomRequest,
        res: express.Response,
        next: express.NextFunction
      ) => void | express.Response<unknown>)
  )[] {
    return [this.checkNotEmpty('video', 'video'), this.errValidationMiddleware];
  }

  static updateVideoSeen(): (
    | ValidationChain
    | ((
        req: ICustomRequest,
        res: express.Response,
        next: express.NextFunction
      ) => void | express.Response<unknown>)
  )[] {
    return [
      this.checkNotEmpty('id', 'id'),
      this.checkNotEmpty('nbVideosSeen', 'nbVideosSeen'),
      this.checkNotEmpty('totalVideos', 'totalVideos'),
      this.errValidationMiddleware
    ];
  }

  static videoNotes(): (
    | ValidationChain
    | ((
        req: ICustomRequest,
        res: express.Response,
        next: express.NextFunction
      ) => void | express.Response<unknown>)
  )[] {
    return [
      this.checkNotEmpty('videoId', 'videoId'),
      this.errValidationMiddleware
    ];
  }

  static publicReviewer(): (
    | ValidationChain
    | ((
        req: ICustomRequest,
        res: express.Response,
        next: express.NextFunction
      ) => void | express.Response<unknown>)
  )[] {
    return [
      this.checkNotEmpty('email', 'email'),
      check('email').isEmail().normalizeEmail(),
      this.checkNotEmpty('name', 'name'),
      this.checkNotEmpty('shareCode', 'shareCode'),
      this.errValidationMiddleware
    ];
  }

  static like(): (
    | ValidationChain
    | ((
        req: ICustomRequest,
        res: express.Response,
        next: express.NextFunction
      ) => void | express.Response<unknown>)
  )[] {
    return [
      this.checkNotEmpty('videoId', 'videoId'),
      this.checkNotEmpty('email', 'email'),
      check('email').isEmail().normalizeEmail(),
      this.checkNotEmpty('like', 'like'),
      this.errValidationMiddleware
    ];
  }

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
        req,
        ERROR_CODES.VALIDATION,
        'err in Validations',
        'Validations',
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
