import express from 'express';
import { ExpressRoute, HTTPMethod } from '../utils';
import { RequestHandler } from 'express-serve-static-core';

export class Routable {
  protected router: express.Router;
  protected defaultBasePath?: string;

  constructor(defaultBasePath?: string) {
    this.defaultBasePath ??= defaultBasePath;
  }

  registerToRouter(app: express.Router, basePath?: string): void {
    app.use(basePath ?? this.defaultBasePath ?? '/', this.getRouter());
  }

  registerTarget(
    method: HTTPMethod,
    route: string,
    func: ExpressRoute,
    middlewares: RequestHandler<Record<string, unknown>>[] = []
  ): void {
    this.getRouter()[method](route, middlewares, func);
  }

  getRouter(): express.Router {
    return (this.router = this.router ?? express.Router());
  }
}
