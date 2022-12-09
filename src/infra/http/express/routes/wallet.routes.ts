import { Router } from 'express';

import { makeCreateWalletController } from '../../factories/controllers/make-create-wallet-controller';
import { makeDeleteWalletController } from '../../factories/controllers/make-delete-wallet-controller';
import { makeGetAllWalletsController } from '../../factories/controllers/make-get-all-wallets-controller';
import { makeGetOneWalletController } from '../../factories/controllers/make-get-one-wallet-controller';
import { makeUpdateWalletController } from '../../factories/controllers/make-update-wallet-controller';
import { makeAuthorizedAccountMiddleware } from '../../factories/middlewares/make-authorized-account.middleware';
import { middlewareAdapter } from '../adapters/express-middlewares';
import { routerAdapter } from '../adapters/express-router';

export const walletRouter = Router();

walletRouter.use(middlewareAdapter([makeAuthorizedAccountMiddleware()]));

walletRouter.post('/', routerAdapter(makeCreateWalletController()));
walletRouter.get('/', routerAdapter(makeGetOneWalletController()));
walletRouter.get('/all', routerAdapter(makeGetAllWalletsController()));
walletRouter.patch('/', routerAdapter(makeUpdateWalletController()));
walletRouter.delete('/', routerAdapter(makeDeleteWalletController()));
