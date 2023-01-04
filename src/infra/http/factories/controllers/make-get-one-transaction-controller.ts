import { GetOneTransactionController } from '@/application/controllers/get-one-transaction-controller';
import { GetOneTransaction } from '@/application/usecases/transaction/get-one-transaction';
import { GetOneTransactionValidator } from '@/application/validators/get-one-transaction-validator';
import { Controller } from '@/core/infra/controller';
import { FirebaseTransactionRepository } from '@/infra/database/firebase/repositories/firebase-transaction-repository';
import { JoiValidatorProvider } from '@/infra/providers/implementations/joi-validator-provider';

export const makeGetOneTransactionController = (): Controller => {
  const firebaseTransactionRepository = new FirebaseTransactionRepository();
  const getOneTransaction = new GetOneTransaction(
    firebaseTransactionRepository,
  );
  const validator = new JoiValidatorProvider(GetOneTransactionValidator);

  const getOneTransactionController = new GetOneTransactionController(
    getOneTransaction,
    validator,
  );

  return getOneTransactionController;
};
