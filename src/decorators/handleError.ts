import {
  errCatchResHandler,
  ERROR_CODES,
  ExpressRoute,
  ICustomRequest,
  indexedObject
} from '../utils';
import express from 'express';

/***
 * This will surround a function with error catching
 */
export function handleError(): (
  target: indexedObject,
  propertyName: string,
  descriptor?: TypedPropertyDescriptor<ExpressRoute>
) => void {
  return (
    target: indexedObject,
    propertyName: string,
    descriptor?: TypedPropertyDescriptor<ExpressRoute>
  ): void => {
    const originalFunction = (
      descriptor?.value || (target as ExpressRoute)
    ).bind(target);
    const factory = async (
      req: ICustomRequest,
      res: express.Response
    ): Promise<express.Response<unknown>> => {
      try {
        return await originalFunction(req, res);
      } catch (error) {
        return errCatchResHandler(
          res,
          req,
          ERROR_CODES.SERVER_ERROR,
          `err in ${target.constructor.name}/${propertyName}`,
          error
        );
      }
    };
    if (descriptor) {
      descriptor.value = factory;
    } else {
      target = factory;
    }
  };
}
