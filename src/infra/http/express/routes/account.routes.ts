import { Router } from 'express';

import { makeAuthenticateAccountController } from '../../factories/make-authenticate-account-controller';
import { makeRegisterAccountController } from '../../factories/make-register-account-controller';
import { routerAdapter } from '../adapters/express-router';

export const accountRouter = Router();

accountRouter.post('/register', routerAdapter(makeRegisterAccountController()));
accountRouter.post(
  '/authenticate',
  routerAdapter(makeAuthenticateAccountController()),
);
