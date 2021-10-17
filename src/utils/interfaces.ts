import express from 'express';
import { ValidationError } from 'express-validator';
import request from 'request';

import { STATUS_CODES } from '.';

export type HTTPMethod =
  | 'all'
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head';

export interface IApiResponseObj {
  statusCode: STATUS_CODES;
  errorCode: number;
  statusReason: string;
  callId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  time: Date | number;
}

export interface IApiErrorObj {
  errorMessage: string | ValidationError[];
  errorDetails?: string;
  statusCode: STATUS_CODES;
  errorCode: number;
  statusReason: string;
  callId: string;
  time: Date | number;
}

export interface userAuth0Jwt {
  ['https://myinterview.com/metadata']: indexedObject;
  iss: string;
  sub: string;
  aud: string | string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string | Date;
  email: string;
  email_verified: boolean;
  at_hash: string;
  nonce: string;
}

export interface ICustomRequest extends express.Request {
  // Add your custom req here...
  callId?: string;
  user?: userAuth0Jwt;
}

export interface indexedObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// AGENDA_JOB
export interface ISendMailPayload {
  from: string;
  to: string;
  subject: string;
  template: string;
  'h:X-Mailgun-Variables': indexedObject | string;
}

export interface ITwilioSMSPayload {
  message: string;
  phoneNumber: string;
}

export type ExpressRoute = (
  req: ICustomRequest,
  res: express.Response,
  next?: express.NextFunction
) =>
  | Promise<express.Response<unknown>>
  | express.Response<unknown, Record<string, unknown>>
  | void
  | request.Request;

export interface IS3Config {
  name: string;
  prefix: string;
  region: string;
  AWSRegion: string;
  cloudFront: string;
}

export interface LeanRequest {
  callId: string;
  path: string;
  body?: Record<string, unknown>;
  query?: Record<string, unknown>;
}
