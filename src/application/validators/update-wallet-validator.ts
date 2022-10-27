import Joi from 'joi';

import { UpdateWalletControllerRequest } from '../controllers/update-wallet-controller';

export const UpdateWalletValidator = Joi.object<UpdateWalletControllerRequest>({
  title: Joi.string().required(),
  walletId: Joi.string().required(),
  userId: Joi.string().required(),
});
