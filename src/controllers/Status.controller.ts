import express from 'express';

import {
  // AgendaJob,
  errCatchResHandler,
  ERROR_CODES,
  ICustomRequest,
  resHandler
} from '../utils';

export class StatusController {
  /**
   * @route GET api/status
   * @desc get status server
   * @access Public
   */
  async show(
    req: ICustomRequest,
    res: express.Response
  ): Promise<express.Response<unknown>> {
    try {
      const { callId } = req;

      return resHandler(res, ERROR_CODES.OK, callId, {
        message: 'The server is up and running.'
      });
    } catch (error) {
      return errCatchResHandler(
        res,
        ERROR_CODES.SERVER_ERROR,
        'err in StatusController/show',
        req.callId,
        error
      );
    }
  }
}
