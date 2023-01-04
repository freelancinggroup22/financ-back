import { GetAllTransactionsController } from '@/application/controllers/get-all-transactions-controller';
import { GetAllTransactions } from '@/application/usecases/transaction/get-all-transactions';
import { GetAllTransactionsValidator } from '@/application/validators/get-all-transactions-validator';
import { Controller } from '@/core/infra/controller';
import { FirebaseTransactionRepository } from '@/infra/database/firebase/repositories/firebase-transaction-repository';
import { JoiValidatorProvider } from '@/infra/providers/implementations/joi-validator-provider';

export const makeGetAllTransactionsController = (): Controller => {
  const firebaseTransactionRepository = new FirebaseTransactionRepository();
  const getAllTransactions = new GetAllTransactions(
    firebaseTransactionRepository,
  );

  const validator = new JoiValidatorProvider(GetAllTransactionsValidator);

  const getAllTransactionsController = new GetAllTransactionsController(
    getAllTransactions,
    validator,
  );

  return getAllTransactionsController;
};
