import { GetOneWalletController } from '@/application/controllers/get-one-wallet-controller';
import { GetOneWallet } from '@/application/usecases/wallet/get-one-wallet';
import { GetOneWalletValidator } from '@/application/validators/get-one-wallet-validator';
import { Controller } from '@/core/infra/controller';
import { FirebaseWalletRepository } from '@/infra/database/firebase/repositories/firebase-wallet-repository';
import { JoiValidatorProvider } from '@/infra/providers/implementations/joi-validator-provider';

export const makeGetOneWalletController = (): Controller => {
  const firebaseWalletRepository = new FirebaseWalletRepository();
  const getOneWallet = new GetOneWallet(firebaseWalletRepository);
  const validator = new JoiValidatorProvider(GetOneWalletValidator);

  const getOneWalletController = new GetOneWalletController(
    getOneWallet,
    validator,
  );

  return getOneWalletController;
};
