import Joi from 'joi';

import { GetOneTransactionControllerRequest } from '../controllers/get-one-transaction-controller';

export const GetOneTransactionValidator =
  Joi.object<GetOneTransactionControllerRequest>({
    walletId: Joi.string().required(),
    transactionId: Joi.string().required(),
  });
