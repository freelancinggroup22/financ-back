import Joi from 'joi';

import { Controller } from '@/core/infra/controller';
import { JoiValidatorProvider } from '@/infra/providers/implementations/joi-validator-provider';
import { FirebaseAccountRepository } from '@/infra/repositories/implementations/firebase-account-repository';
import {
  AuthenticateAccountController,
  AuthenticateAccountControllerControllerRequest,
} from '@/modules/account/controllers/authenticate-account.controller';
import { AuthenticateAccount } from '@/modules/account/usecases/authenticate-account';

export const makeAuthenticateAccountController = (): Controller => {
  const firebaseAccountRepository = new FirebaseAccountRepository();
  const authenticateAccount = new AuthenticateAccount(firebaseAccountRepository);

  const validator = new JoiValidatorProvider(
    Joi.object<AuthenticateAccountControllerControllerRequest>({
      email: Joi.string().email().min(8).max(255).required().trim(),
      password: Joi.string().min(8).max(255).required(),
    }),
  );

  const registerAccountController = new AuthenticateAccountController(
    authenticateAccount,
    validator,
  );

  return registerAccountController;
};
