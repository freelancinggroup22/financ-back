import { Router } from 'express';

import { makeCreateTransactionController } from '../../factories/controllers/make-create-transaction-controller';
import { makeDeleteTransactionController } from '../../factories/controllers/make-delete-transaction-controller';
import { makeGetAllTransactionsController } from '../../factories/controllers/make-get-all-transactions-controller';
import { makeGetOneTransactionController } from '../../factories/controllers/make-get-one-transaction-controller';
import { makeUpdateTransactionController } from '../../factories/controllers/make-update-transaction-controller';
import { makeAuthorizedAccountMiddleware } from '../../factories/middlewares/make-authorized-account.middleware';
import { middlewareAdapter } from '../adapters/express-middlewares';
import { routerAdapter } from '../adapters/express-router';

export const transactionRouter = Router();

transactionRouter.use(middlewareAdapter([makeAuthorizedAccountMiddleware()]));
transactionRouter.get(
  '/all',
  routerAdapter(makeGetAllTransactionsController()),
);
transactionRouter.get('/', routerAdapter(makeGetOneTransactionController()));
transactionRouter.post('/', routerAdapter(makeCreateTransactionController()));
transactionRouter.put('/', routerAdapter(makeUpdateTransactionController()));
transactionRouter.delete('/', routerAdapter(makeDeleteTransactionController()));
