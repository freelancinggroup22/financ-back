import { CreateWalletController } from '@/application/controllers/create-wallet-controller';
import { CreateWallet } from '@/application/usecases/wallet/create-wallet';
import { CreateWalletValidator } from '@/application/validators/create-wallet-validator';
import { Controller } from '@/core/infra/controller';
import { FirebaseWalletRepository } from '@/infra/database/firebase/repositories/firebase-wallet-repository';
import { JoiValidatorProvider } from '@/infra/providers/implementations/joi-validator-provider';

export const makeCreateWalletController = (): Controller => {
  const firebaseWalletRepository = new FirebaseWalletRepository();
  const createWallet = new CreateWallet(firebaseWalletRepository);
  const validator = new JoiValidatorProvider(CreateWalletValidator);

  const createWalletController = new CreateWalletController(
    createWallet,
    validator,
  );

  return createWalletController;
};
