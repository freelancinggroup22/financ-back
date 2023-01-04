import { AuthorizedAccountMiddleware } from '@/application/middlewares/authorized-account.middleware';
import { AuthorizedAccount } from '@/application/usecases/account/authorized-account';
import { AuthenticateAccountValidator } from '@/application/validators/authorized-account.validator';
import { Middleware } from '@/core/infra/middleware';
import { FirebaseAccountRepository } from '@/infra/database/firebase/repositories/firebase-account-repository';
import { JoiValidatorProvider } from '@/infra/providers/implementations/joi-validator-provider';

export const makeAuthorizedAccountMiddleware = (): Middleware => {
  const firebaseAccountRepository = new FirebaseAccountRepository();
  const authorizedAccount = new AuthorizedAccount(firebaseAccountRepository);
  const validator = new JoiValidatorProvider(AuthenticateAccountValidator);

  const authorizedAccountMiddleware = new AuthorizedAccountMiddleware(
    authorizedAccount,
    validator,
  );

  return authorizedAccountMiddleware;
};
