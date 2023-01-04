import Joi from 'joi';

import { AuthorizedAccountMiddlewareRequest } from '../middlewares/authorized-account.middleware';

export const AuthenticateAccountValidator =
  Joi.object<AuthorizedAccountMiddlewareRequest>({
    accessToken: Joi.string().required().trim(),
  });
