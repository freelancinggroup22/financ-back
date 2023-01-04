import Joi from 'joi';

import { DeleteWalletControllerRequest } from '../controllers/delete-wallet-controller';

export const DeleteWalletValidator = Joi.object<DeleteWalletControllerRequest>({
  walletId: Joi.string().required(),
  userId: Joi.string().required(),
});
