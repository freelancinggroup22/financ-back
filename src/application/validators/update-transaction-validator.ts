import Joi from 'joi';

import { UpdateTransactionControllerRequest } from '../controllers/update-transaction-controller';

export const UpdateTransactionValidator =
  Joi.object<UpdateTransactionControllerRequest>({
    walletId: Joi.string().required(),
    transactionId: Joi.string().required(),
    title: Joi.string().min(5).max(20).optional().trim(),
    description: Joi.string().min(5).max(40).optional().trim(),
    amount: Joi.number().optional(),
    flow: Joi.string().valid('income', 'outcome').optional().trim(),
    date: Joi.date().optional(),
    category: Joi.string().optional().trim(),
    status: Joi.string().valid('pending', 'planned', 'paid').optional().trim(),
  });
