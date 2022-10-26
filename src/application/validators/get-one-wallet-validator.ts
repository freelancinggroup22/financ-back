import Joi from 'joi';

import { GetOneWalletControllerRequest } from '../controllers/get-one-wallet-controller';

export const GetOneWalletValidator = Joi.object<GetOneWalletControllerRequest>({
  user: Joi.string().required(),
  walletId: Joi.string().required(),
});
