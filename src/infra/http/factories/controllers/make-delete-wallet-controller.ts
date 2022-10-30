import { DeleteWalletController } from '@/application/controllers/delete-wallet-controller';
import { DeleteWallet } from '@/application/usecases/wallet/delete-wallet';
import { DeleteWalletValidator } from '@/application/validators/delete-wallet-validator';
import { Controller } from '@/core/infra/controller';
import { FirebaseAccountRepository } from '@/infra/database/firebase/repositories/firebase-account-repository';
import { FirebaseWalletRepository } from '@/infra/database/firebase/repositories/firebase-wallet-repository';
import { JoiValidatorProvider } from '@/infra/providers/implementations/joi-validator-provider';

export const makeDeleteAccountController = (): Controller => {
  const firebaseWalletRepository = new FirebaseWalletRepository();
  const firebaseAccountRepository = new FirebaseAccountRepository();
  const updateAccount = new DeleteWallet(
    firebaseWalletRepository,
    firebaseAccountRepository,
  );
  const validator = new JoiValidatorProvider(DeleteWalletValidator);

  const registerAccountController = new DeleteWalletController(
    updateAccount,
    validator,
  );

  return registerAccountController;
};
