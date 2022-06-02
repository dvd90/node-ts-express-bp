import * as dotenv from 'dotenv';

dotenv.config();

/**
 * @exampleEnvFile

NODE_ENV=environment
PORT=8000

SENTRY_DSN=sentryDsn

MONGODB_USER=dbdev
MONGODB_PW=dbPassword
MONGODB_URI=dbURI

AUTH0_JWT_DOMAIN=auth0JWTDomain
AUTH0_JWT_AUDIENCE=auth0JWTAudience

 */

export const environment = process.env.NODE_ENV;

export const dbUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@${process.env.MONGODB_URI}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

export const PORT = process.env.PORT || 8000;

export const sentryDsn = process.env.SENTRY_DSN;

export const auth0Vars = {
  domain: process.env.AUTH0_JWT_DOMAIN,
  audience: process.env.AUTH0_JWT_LOGIN
};

export const auth0Connection = process.env.AUTH0_CONNECTION;
