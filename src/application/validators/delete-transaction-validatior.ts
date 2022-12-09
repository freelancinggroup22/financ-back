import Joi from 'joi';

import { DeleteTransactionControllerRequest } from '../controllers/delete-transaction-controller';

export const DeleteTransactionValidator =
  Joi.object<DeleteTransactionControllerRequest>({
    walletId: Joi.string().required(),
    transactionId: Joi.string().required(),
  });
