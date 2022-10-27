import { Router } from 'express';

import { makeCreateWalletController } from '../../factories/make-create-wallet-controller';
import { makeDeleteAccountController } from '../../factories/make-delete-wallet-controller';
import { makeGetAllWalletsController } from '../../factories/make-get-all-wallet-controller';
import { makeGetOneWalletController } from '../../factories/make-get-one-wallet-controller';
import { makeUpdateAccountController } from '../../factories/make-update-wallet-controller';
import { routerAdapter } from '../adapters/express-router';

export const walletRouter = Router();

walletRouter.post('/', routerAdapter(makeCreateWalletController()));
walletRouter.get('/', routerAdapter(makeGetOneWalletController()));
walletRouter.get('/all', routerAdapter(makeGetAllWalletsController()));
walletRouter.patch('/', routerAdapter(makeUpdateAccountController()));
walletRouter.delete('/', routerAdapter(makeDeleteAccountController()));
