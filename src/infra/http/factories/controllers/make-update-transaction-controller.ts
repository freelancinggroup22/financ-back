import UpdateTransactionController from '@/application/controllers/update-transaction-controller';
import { UpdateTransaction } from '@/application/usecases/transaction/update-transaction';
import { UpdateTransactionValidator } from '@/application/validators/update-transaction-validator';
import { Controller } from '@/core/infra/controller';
import { FirebaseTransactionRepository } from '@/infra/database/firebase/repositories/firebase-transaction-repository';
import { JoiValidatorProvider } from '@/infra/providers/implementations/joi-validator-provider';

export const makeUpdateTransactionController = (): Controller => {
  const firebaseTransactionRepository = new FirebaseTransactionRepository();
  const updateTransaction = new UpdateTransaction(
    firebaseTransactionRepository,
  );
  const validator = new JoiValidatorProvider(UpdateTransactionValidator);

  const updateTransactionController = new UpdateTransactionController(
    updateTransaction,
    validator,
  );

  return updateTransactionController;
};
