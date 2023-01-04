import { UpdateWalletController } from '@/application/controllers/update-wallet-controller';
import { UpdateWallet } from '@/application/usecases/wallet/update-wallet';
import { UpdateWalletValidator } from '@/application/validators/update-wallet-validator';
import { Controller } from '@/core/infra/controller';
import { FirebaseAccountRepository } from '@/infra/database/firebase/repositories/firebase-account-repository';
import { FirebaseWalletRepository } from '@/infra/database/firebase/repositories/firebase-wallet-repository';
import { JoiValidatorProvider } from '@/infra/providers/implementations/joi-validator-provider';

export const makeUpdateWalletController = (): Controller => {
  const firebaseWalletRepository = new FirebaseWalletRepository();
  const firebaseAccountRepository = new FirebaseAccountRepository();
  const updateAccount = new UpdateWallet(
    firebaseWalletRepository,
    firebaseAccountRepository,
  );
  const validator = new JoiValidatorProvider(UpdateWalletValidator);

  const registerAccountController = new UpdateWalletController(
    updateAccount,
    validator,
  );

  return registerAccountController;
};
