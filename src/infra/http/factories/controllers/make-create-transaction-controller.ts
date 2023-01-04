import CreateTransactionController from '@/application/controllers/create-transaction-controller';
import { CreateTransaction } from '@/application/usecases/transaction/create-transaction';
import { CreateTransactionValidator } from '@/application/validators/create-transaction-validator';
import { Controller } from '@/core/infra/controller';
import { FirebaseTransactionRepository } from '@/infra/database/firebase/repositories/firebase-transaction-repository';
import { FirebaseWalletRepository } from '@/infra/database/firebase/repositories/firebase-wallet-repository';
import { JoiValidatorProvider } from '@/infra/providers/implementations/joi-validator-provider';

export const makeCreateTransactionController = (): Controller => {
  const firebaseTransactionRepository = new FirebaseTransactionRepository();
  const firebaseWalletRepository = new FirebaseWalletRepository();
  const createTransaction = new CreateTransaction(
    firebaseTransactionRepository,
    firebaseWalletRepository,
  );
  const validator = new JoiValidatorProvider(CreateTransactionValidator);

  const createTransactionController = new CreateTransactionController(
    createTransaction,
    validator,
  );

  return createTransactionController;
};
