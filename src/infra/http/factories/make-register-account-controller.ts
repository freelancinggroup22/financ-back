import Joi from 'joi';

import { Controller } from '@/core/infra/controller';
import { JoiValidatorProvider } from '@/infra/providers/implementations/joi-validator-provider';
import { FirebaseAccountRepository } from '@/infra/repositories/implementations/firebase-account-repository';
import {
  RegisterAccountController,
  RegisterAccountControllerControllerRequest,
} from '@/modules/account/controllers/register-account-controller';
import { RegisterAccount } from '@/modules/account/usecases/register-account';

export const makeRegisterAccountController = (): Controller => {
  const firebaseAccountRepository = new FirebaseAccountRepository();
  const registerAccount = new RegisterAccount(firebaseAccountRepository);

  const validator = new JoiValidatorProvider(
    Joi.object<RegisterAccountControllerControllerRequest>({
      name: Joi.string().min(3).max(255).required().trim(),
      email: Joi.string().email().min(8).max(255).required().trim(),
      password: Joi.string().min(8).max(255).required(),
    }),
  );

  const registerAccountController = new RegisterAccountController(registerAccount, validator);

  return registerAccountController;
};
