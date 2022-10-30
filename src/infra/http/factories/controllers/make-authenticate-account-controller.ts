import { AuthenticateAccountController } from '@/application/controllers/authenticate-account-controller';
import { AuthenticateAccount } from '@/application/usecases/account/authenticate-account';
import { AuthenticateAccountValidator } from '@/application/validators/authenticate-account-validator';
import { Controller } from '@/core/infra/controller';
import { FirebaseAccountRepository } from '@/infra/database/firebase/repositories/firebase-account-repository';
import { JoiValidatorProvider } from '@/infra/providers/implementations/joi-validator-provider';

export const makeAuthenticateAccountController = (): Controller => {
  const firebaseAccountRepository = new FirebaseAccountRepository();
  const authenticateAccount = new AuthenticateAccount(
    firebaseAccountRepository,
  );

  const validator = new JoiValidatorProvider(AuthenticateAccountValidator);

  const authenticateAccountController = new AuthenticateAccountController(
    authenticateAccount,
    validator,
  );

  return authenticateAccountController;
};
