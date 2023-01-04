import Joi from 'joi';

import { GetAllTransactionsControllerRequest } from '../controllers/get-all-transactions-controller';

export const GetAllTransactionsValidator =
  Joi.object<GetAllTransactionsControllerRequest>({
    walletId: Joi.string().required(),
    limit: Joi.number().optional(),
  });
