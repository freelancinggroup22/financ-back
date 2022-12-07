import Joi from 'joi';

import { CreateTransactionControllerRequest } from '../controllers/create-transaction-controller';

export const CreateTransactionValidator =
  Joi.object<CreateTransactionControllerRequest>({
    userId: Joi.string().required(),
    walletId: Joi.string().required(),
    title: Joi.string().min(5).max(20).required().trim(),
    description: Joi.string().min(5).max(40).required().trim(),
    amount: Joi.number().required(),
    flow: Joi.string().valid('income', 'outcome').required().trim(),
    date: Joi.date().required(),
    category: Joi.string().required().trim(),
    status: Joi.string().valid('pending', 'planned', 'paid').required().trim(),
  });
