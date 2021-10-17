import { Application } from 'express';
import * as Controllers from '../controllers';

export default function (app: Application): void {
  for (const ControllerName in Controllers) {
    // Create the controller instance
    const controllerInstance = new Controllers[ControllerName]();
    controllerInstance.registerToRouter(app);
  }

  app.get('/', (req, res) => res.json('EXPRESS-TS Boilerplate is 🏃‍♂️'));
}
