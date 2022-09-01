import { Router } from 'express';

import { routerAdapter } from '@/infra/adapters/express-router';

import { makeRegisterAccountController } from '../factories/make-register-account-controller';

export const accountRouter = Router();

accountRouter.post('/', routerAdapter(makeRegisterAccountController()));
