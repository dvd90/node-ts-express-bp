import { ValidationError } from 'express-validator';
import { STATUS_CODES } from '.';

export interface IErrorCode {
  id: number;
  statusCode: STATUS_CODES;
  message?: (key?: string | ValidationError[]) => string | ValidationError[];
  statusReason: string;
}

const ERROR_CODES_TO_TYPE = {
  OK: {
    id: 0,
    statusCode: STATUS_CODES.OK,
    statusReason: 'OK'
  },
  CREATED: {
    id: 1,
    statusCode: STATUS_CODES.CREATED,
    statusReason: 'Created'
  },
  UPDATED: {
    id: 2,
    statusCode: STATUS_CODES.OK,
    statusReason: 'Updated'
  },
  DELETED: {
    id: 3,
    statusCode: STATUS_CODES.DELETED,
    statusReason: 'Deleted'
  },
  WRONG_ACCESS_KEY: {
    id: 10000,
    statusCode: STATUS_CODES.UNAUTHORIZED,
    statusReason: 'Unauthorized',
    message: (key?: string): string =>
      `Access denied with access key: ${key ?? ''}`
  },
  WRONG_TOKEN: {
    id: 10001,
    statusCode: STATUS_CODES.UNAUTHORIZED,
    statusReason: 'Unauthorized',
    message: (): string => 'Access denied, token is wrong'
  },
  TOKEN_EXPIRED: {
    id: 10002,
    statusCode: STATUS_CODES.UNAUTHORIZED,
    statusReason: 'Unauthorized',
    message: (): string => 'Access denied, token is expired'
  },
  ACCESS_DENIED: {
    id: 10003,
    statusCode: STATUS_CODES.UNAUTHORIZED,
    statusReason: 'Unauthorized',
    message: (): string => 'Access denied'
  },
  TOO_MANY_REQUESTS: {
    id: 10004,
    statusCode: STATUS_CODES.TOO_MANY_REQUESTS,
    statusReason: 'Too Many Request',
    message: (): string => 'Too Many Request'
  },
  UNAUTHORIZED: {
    id: 10005,
    statusCode: STATUS_CODES.UNAUTHORIZED,
    statusReason: 'Unauthorized',
    message: (): string => 'Unauthorized'
  },
  UNAUTHORIZED_SCOPE: {
    id: 10006,
    statusCode: STATUS_CODES.UNAUTHORIZED,
    statusReason: 'Unauthorized',
    message: (): string =>
      'Access denied, you should check if your key is in scope (Permission)'
  },
  NOT_FOUND: {
    id: 10007,
    statusCode: STATUS_CODES.NOT_FOUND,
    statusReason: 'Not Found',
    message: (resource: string): string => `${resource} was not found`
  },
  VALIDATION: {
    id: 10008,
    statusCode: STATUS_CODES.BAD_REQUEST,
    statusReason: 'Validation',
    message: (
      resource: string | ValidationError[]
    ): string | ValidationError[] => resource
  },
  UNAUTHORIZED_IP: {
    id: 10009,
    statusCode: STATUS_CODES.FORBIDDEN,
    statusReason: 'Unauthorized IP',
    message: (): string =>
      'Unauthorized IP, please check the list of allowed IP addresses'
  },
  EXPIRED: {
    id: 10010,
    statusCode: STATUS_CODES.FORBIDDEN,
    statusReason: 'Expired',
    message: (message?: string): string => 'Expired ' + message
  },
  MISSING_QUERY_PARAMS: {
    id: 10011,
    statusCode: STATUS_CODES.BAD_REQUEST,
    statusReason: 'Missing Query Params',
    message: (resource: string): string =>
      `${resource} query params was not found`
  },
  SERVER_ERROR: {
    id: 50000,
    statusCode: STATUS_CODES.SERVER_ERROR,
    statusReason: 'Server Error'
  }
};

export type IErrorCodeObj = {
  [errorCodes in keyof typeof ERROR_CODES_TO_TYPE]: IErrorCode;
};

export const ERROR_CODES = ERROR_CODES_TO_TYPE as IErrorCodeObj;
