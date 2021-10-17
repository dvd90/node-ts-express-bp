import app from './app';
import { logSuccess } from './utils';

app.listen(app.get('port'), () =>
  logSuccess(`Server started on port ${app.get('port')} 🚀`)
);
