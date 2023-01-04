import http from 'http';

import { PORT } from '../config/config';
import { App } from './express/app';

const { app } = new App();

http
  .createServer(app)
  .listen(PORT, () => console.log(`🚀 Started in port: ${PORT}`));
