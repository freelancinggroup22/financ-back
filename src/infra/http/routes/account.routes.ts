import { Router } from 'express';

import { routerAdapter } from '@/infra/adapters/express-router';

import { makeAuthenticateAccountController } from '../factories/make-authenticate-account-controller';
import { makeRegisterAccountController } from '../factories/make-register-account-controller';

export const accountRouter = Router();

accountRouter.post('/register', routerAdapter(makeRegisterAccountController()));
accountRouter.post(
  '/authenticate',
  routerAdapter(makeAuthenticateAccountController()),
);
