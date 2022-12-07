import { Router } from 'express';

import { makeCreateTransactionController } from '../../factories/controllers/make-create-transaction-controller';
import { makeGetAllTransactionsController } from '../../factories/controllers/make-get-all-transactions-controller';
import { makeAuthorizedAccountMiddleware } from '../../factories/middlewares/make-authorized-account.middleware';
import { middlewareAdapter } from '../adapters/express-middlewares';
import { routerAdapter } from '../adapters/express-router';

export const transactionRouter = Router();

transactionRouter.use(middlewareAdapter([makeAuthorizedAccountMiddleware()]));

transactionRouter.post('/', routerAdapter(makeCreateTransactionController()));
transactionRouter.get(
  '/all',
  routerAdapter(makeGetAllTransactionsController()),
);
