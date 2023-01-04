import Joi from 'joi';

import { AuthenticateAccountControllerRequest } from '../controllers/authenticate-account-controller';

export const AuthenticateAccountValidator =
  Joi.object<AuthenticateAccountControllerRequest>({
    email: Joi.string().email().min(8).max(255).required().trim(),
    password: Joi.string().min(8).max(255).required(),
  });
