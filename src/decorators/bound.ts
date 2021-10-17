import { ExpressRoute, indexedObject } from '../utils';

/***
 * This decorator will force a "floating" function (instance function) to be bound to it's object
 */
export function bound(): (
  target: indexedObject,
  propertyName: string,
  descriptor?: PropertyDescriptor
) => void {
  return (
    target: indexedObject,
    propertyName: string,
    descriptor?: PropertyDescriptor
  ): void => {
    const originalFunction = (
      descriptor?.value || (target as ExpressRoute)
    ).bind(target);
    // const factory = (req: ICustomRequest,
    //                        res: express.Response): express.Response<unknown> => {
    //   return originalFunction(req, res);
    // }
    if (descriptor) {
      descriptor.value = originalFunction;
    }
  };
}
