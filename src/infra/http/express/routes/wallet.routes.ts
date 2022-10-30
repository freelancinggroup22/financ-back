import { Router } from 'express';

import { makeCreateWalletController } from '../../factories/controllers/make-create-wallet-controller';
import { makeDeleteAccountController } from '../../factories/controllers/make-delete-wallet-controller';
import { makeGetAllWalletsController } from '../../factories/controllers/make-get-all-wallet-controller';
import { makeGetOneWalletController } from '../../factories/controllers/make-get-one-wallet-controller';
import { makeUpdateAccountController } from '../../factories/controllers/make-update-wallet-controller';
import { makeAuthorizedAccountMiddleware } from '../../factories/middlewares/make-authorized-account.middleware';
import { middlewareAdapter } from '../adapters/express-middlewares';
import { routerAdapter } from '../adapters/express-router';

export const walletRouter = Router();

walletRouter.use(middlewareAdapter([makeAuthorizedAccountMiddleware()]));

walletRouter.post('/', routerAdapter(makeCreateWalletController()));
walletRouter.get('/', routerAdapter(makeGetOneWalletController()));
walletRouter.get('/all', routerAdapter(makeGetAllWalletsController()));
walletRouter.patch('/', routerAdapter(makeUpdateAccountController()));
walletRouter.delete('/', routerAdapter(makeDeleteAccountController()));
