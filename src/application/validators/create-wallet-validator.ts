import Joi from 'joi';

import { CreateWalletControllerRequest } from '../controllers/create-wallet-controller';

export const CreateWalletValidator = Joi.object<CreateWalletControllerRequest>({
  title: Joi.string().min(5).max(20).required().trim(),
  user: Joi.string().required(),
});
