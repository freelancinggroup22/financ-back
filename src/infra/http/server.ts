import http from 'http';

import { PORT } from '../config';
import { App } from './app';

const { app } = new App();

http.createServer(app).listen(PORT, () => console.log(`🚀 Started Application in port: ${PORT}`));
