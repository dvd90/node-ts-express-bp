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
    message: (key?: string | ValidationError[]): string =>
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
    message: (resource?: string | ValidationError[]): string =>
      `${resource} was not found`
  },
  ALREADY_EXISTS: {
    id: 10018,
    statusCode: STATUS_CODES.ALREADY_EXISTS,
    statusReason: 'Already exists',
    message: (resource?: string | ValidationError[]): string =>
      `${resource} already exists`
  },
  VALIDATION: {
    id: 10008,
    statusCode: STATUS_CODES.BAD_REQUEST,
    statusReason: 'Validation',
    message: (
      resource?: string | ValidationError[]
    ): string | ValidationError[] => resource as string | ValidationError[]
  },
  BAD_WEBHOOK_REQUEST: {
    id: 10009,
    statusCode: STATUS_CODES.BAD_REQUEST,
    statusReason: 'missing config',
    message: (
      video_id?: string | ValidationError[]
    ): string | ValidationError[] =>
      `Video ID: ${
        video_id as string
      } is not configured to have webhooks` as string
  },
  UNAUTHORIZED_IP: {
    id: 10010,
    statusCode: STATUS_CODES.FORBIDDEN,
    statusReason: 'Unauthorized IP',
    message: (): string =>
      'Unauthorized IP, please check the list of allowed IP addresses'
  },
  EXPIRED: {
    id: 10011,
    statusCode: STATUS_CODES.FORBIDDEN,
    statusReason: 'Expired',
    message: (message?: string | ValidationError[]): string =>
      'Expired ' + message
  },
  MISSING_QUERY_PARAMS: {
    id: 10012,
    statusCode: STATUS_CODES.BAD_REQUEST,
    statusReason: 'Missing Query Params',
    message: (resource?: string | ValidationError[]): string =>
      `${resource} query params was not found`
  },
  PAYMENT_REQUIRED: {
    id: 10013,
    statusCode: STATUS_CODES.PAYMENT_REQUIRED,
    statusReason: 'Payment Required',
    message: (): string => 'Unauthorized, Payment Required'
  },
  UNAUTHORIZED_REFERRER: {
    id: 10014,
    statusCode: STATUS_CODES.FORBIDDEN,
    statusReason: 'Unauthorized Referrer',
    message: (referrer?: string | ValidationError[]): string =>
      `Access Denied for referrer : ${referrer}`
  },
  UNAUTHORIZED_INTEGRATION: {
    id: 10015,
    statusCode: STATUS_CODES.FORBIDDEN,
    statusReason: 'Unauthorized Integration',
    message: (integration?: string | ValidationError[]): string =>
      `Access Denied for integration : ${integration}. Please add the integration on our integration page on myInteview dashboard.`
  },
  JOB_NOT_ACTIVE: {
    id: 10016,
    statusCode: STATUS_CODES.FORBIDDEN,
    statusReason: 'Job not Active',
    message: (): string => 'Job not Active'
  },
  SUBSCRIPTION_NOT_ACTIVE: {
    id: 10017,
    statusCode: STATUS_CODES.FORBIDDEN,
    statusReason: 'Subscription not Active',
    message: (): string => 'Subscription not Active'
  },
  UNAUTHORIZED_EMAIL: {
    id: 10018,
    statusCode: STATUS_CODES.FORBIDDEN,
    statusReason: 'Unauthorized Email',
    message: (): string =>
      'Unauthorized Email, please check the list of allowed Email addresses'
  },
  FORBIDDEN: {
    id: 10018,
    statusCode: STATUS_CODES.FORBIDDEN,
    statusReason: 'Forbidden'
  },
  SERVER_ERROR: {
    id: 50000,
    statusCode: STATUS_CODES.SERVER_ERROR,
    statusReason: 'Server Error'
  },
  MISSING_CONFIG: {
    id: 50001,
    statusCode: STATUS_CODES.SERVER_ERROR,
    statusReason:
      'This server is missing some configuration to preform this request'
  }
};

export type IErrorCodeObj = {
  [errorCodes in keyof typeof ERROR_CODES_TO_TYPE]: IErrorCode;
};

export const ERROR_CODES = ERROR_CODES_TO_TYPE as IErrorCodeObj;
