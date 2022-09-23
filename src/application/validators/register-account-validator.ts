import Joi from 'joi';

import { RegisterAccountControllerRequest } from '../controllers/register-account-controller';

export const RegisterAccountValidator =
  Joi.object<RegisterAccountControllerRequest>({
    name: Joi.string().min(3).max(255).required().trim(),
    email: Joi.string().email().min(8).max(255).required().trim(),
    password: Joi.string().min(8).max(255).required(),
  });
