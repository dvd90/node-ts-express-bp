import { Application, Router } from 'express';
import { initStatusRoutes } from './status';

export default function (app: Application, router: Router): void {
  initStatusRoutes(router);

  app.use(router);
  app.get('/', (req, res) => res.json('EXPRESS-TS Boilerplate is 🏃‍♂️'));
}
