import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { router } from './routes';

export class App {
  private readonly _app: express.Application;

  get app() {
    return this._app;
  }

  constructor() {
    this._app = express();

    this.middlewares();
    this.routes();
  }

  private async middlewares(): Promise<void> {
    this._app.use([express.json(), compression(), cors(), helmet()]);
  }

  private async routes(): Promise<void> {
    this._app.use(router);
  }
}
