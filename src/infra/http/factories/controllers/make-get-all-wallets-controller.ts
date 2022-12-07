import { GetAllWalletsController } from '@/application/controllers/get-all-wallets-controller';
import { GetAllWallets } from '@/application/usecases/wallet/get-all-wallets';
import { GetAllWalletsValidator } from '@/application/validators/get-all-wallets-validator';
import { Controller } from '@/core/infra/controller';
import { FirebaseWalletRepository } from '@/infra/database/firebase/repositories/firebase-wallet-repository';
import { JoiValidatorProvider } from '@/infra/providers/implementations/joi-validator-provider';

export const makeGetAllWalletsController = (): Controller => {
  const firebaseWalletRepository = new FirebaseWalletRepository();
  const getAllWallets = new GetAllWallets(firebaseWalletRepository);
  const validator = new JoiValidatorProvider(GetAllWalletsValidator);

  const getAllWalletsController = new GetAllWalletsController(
    getAllWallets,
    validator,
  );

  return getAllWalletsController;
};
