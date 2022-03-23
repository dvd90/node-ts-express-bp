import { logSuccess } from './utils';
import APP from './app';

APP().then((app) => {
  app.listen(app.get('port'), () =>
    logSuccess(`Server started on port ${app.get('port')} 🚀`)
  );
});
