import { TransactionRepository } from '@/application/repositories/transaction.repository';
import { Either, left, right } from '@/core/logic/either';
import { Transaction, TransactionErrors } from '@/domain/entities/transaction';

import { NotExistingTransactionError } from './errors/not-existing-transaction';

export type GetOneTransactionInput = {
  walletId: string;
  transactionId: string;
};

export type GetOneTransactionOutput = Either<
  TransactionErrors | NotExistingTransactionError,
  Transaction
>;

export class GetOneTransaction {
  constructor(private readonly repository: TransactionRepository) {}

  async execute({
    walletId,
    transactionId,
  }: GetOneTransactionInput): Promise<GetOneTransactionOutput> {
    const transactionAlreadyExists =
      await this.repository.getOneTransactionFromUser(walletId, transactionId);

    if (!transactionAlreadyExists)
      return left(new NotExistingTransactionError(transactionId));

    const transactionOrError = Transaction.create(
      transactionAlreadyExists as Transaction,
    );

    if (transactionOrError.isLeft()) return left(transactionOrError.value);

    const transaction = transactionOrError.value;

    return right(transaction);
  }
}
