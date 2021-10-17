import { RequestHandler } from 'express-serve-static-core';
import { ExpressRoute, HTTPMethod, indexedObject } from '../utils';
import { Routable } from '../routes/routable';

/***
 * This will surround a function with error catching
 */
export function route(
  method: HTTPMethod,
  route: string,
  middlewares: Array<RequestHandler<Record<string, unknown>>> = []
): (
  target: indexedObject,
  propertyName: string,
  descriptor?: TypedPropertyDescriptor<ExpressRoute>
) => void {
  return (
    target: Routable,
    propertyName: string,
    descriptor?: TypedPropertyDescriptor<ExpressRoute>
  ): void => {
    const originalFunction = (
      (descriptor?.value || target) as ExpressRoute
    ).bind(target);
    target.registerTarget.apply(target, [
      method,
      route,
      originalFunction,
      middlewares
    ]);
  };
}
