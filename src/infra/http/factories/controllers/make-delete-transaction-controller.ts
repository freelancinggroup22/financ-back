import DeleteTransactionController from '@/application/controllers/delete-transaction-controller';
import { DeleteTransaction } from '@/application/usecases/transaction/delete-transaction';
import { DeleteTransactionValidator } from '@/application/validators/delete-transaction-validatior';
import { Controller } from '@/core/infra/controller';
import { FirebaseTransactionRepository } from '@/infra/database/firebase/repositories/firebase-transaction-repository';
import { JoiValidatorProvider } from '@/infra/providers/implementations/joi-validator-provider';

export const makeDeleteTransactionController = (): Controller => {
  const firebaseTransactionRepository = new FirebaseTransactionRepository();
  const deleteTransaction = new DeleteTransaction(
    firebaseTransactionRepository,
  );
  const validator = new JoiValidatorProvider(DeleteTransactionValidator);

  const deleteTransactionController = new DeleteTransactionController(
    deleteTransaction,
    validator,
  );

  return deleteTransactionController;
};
