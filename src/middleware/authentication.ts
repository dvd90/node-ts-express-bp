import express from 'express';
import jwtExpress, { RequestHandler } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import {
  auth0Vars,
  ERROR_CODES,
  errResHandler,
  ICustomRequest
} from '../utils';

// Auth with Auth0
const authJWT: RequestHandler = jwtExpress({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `https://${auth0Vars.domain}/.well-known/jwks.json`
  }),
  audience: auth0Vars.audience,
  issuer: `https://${auth0Vars.domain}/`,
  algorithms: ['RS256'],
  requestProperty: 'user'
});

export const authMiddleware = [
  authJWT,
  function (
    req: ICustomRequest,
    res: express.Response,
    next: express.NextFunction
  ): unknown {
    if (!req.user) {
      return errResHandler(
        res,
        req,
        ERROR_CODES.WRONG_TOKEN,
        'err in authMiddleware',
        'src/middleware/authentication',
        req.callId
      );
    }

    next();
  }
];
