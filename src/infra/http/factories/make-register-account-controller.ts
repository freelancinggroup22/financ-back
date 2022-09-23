import { RegisterAccountController } from '@/application/controllers/register-account-controller';
import { RegisterAccount } from '@/application/usecases/account/register-account';
import { RegisterAccountValidator } from '@/application/validators/register-account-validator';
import { Controller } from '@/core/infra/controller';
import { FirebaseAccountRepository } from '@/infra/database/firebase/repositories/firebase-account-repository';
import { JoiValidatorProvider } from '@/infra/providers/implementations/joi-validator-provider';

export const makeRegisterAccountController = (): Controller => {
  const firebaseAccountRepository = new FirebaseAccountRepository();
  const registerAccount = new RegisterAccount(firebaseAccountRepository);
  const validator = new JoiValidatorProvider(RegisterAccountValidator);

  const registerAccountController = new RegisterAccountController(
    registerAccount,
    validator,
  );

  return registerAccountController;
};
