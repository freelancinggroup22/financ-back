import { Router } from 'express';

import { makeAuthenticateAccountController } from '../../factories/controllers/make-authenticate-account-controller';
import { makeRegisterAccountController } from '../../factories/controllers/make-register-account-controller';
import { routerAdapter } from '../adapters/express-router';

export const accountRouter = Router();

accountRouter.post('/register', routerAdapter(makeRegisterAccountController()));
accountRouter.post(
  '/authenticate',
  routerAdapter(makeAuthenticateAccountController()),
);
