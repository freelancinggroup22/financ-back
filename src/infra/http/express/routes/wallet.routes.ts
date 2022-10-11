import { Router } from 'express';

import { makeCreateWalletController } from '../../factories/make-create-wallet-controller';
import { routerAdapter } from '../adapters/express-router';

export const walletRouter = Router();

walletRouter.post('/', routerAdapter(makeCreateWalletController()));
