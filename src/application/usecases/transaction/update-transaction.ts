import { TransactionRepository } from '@/application/repositories/transaction.repository';
import { Either, left, right } from '@/core/logic/either';
import { Transaction, TransactionErrors } from '@/domain/entities/transaction';

import { NotExistingTransactionError } from './errors/not-existing-transaction';

export type UpdateTransactionInput = {
  walletId: string;
  transactionId: string;
  title?: string;
  description?: string;
  amount?: number;
  flow?: string;
  date?: number;
  category?: string;
  status?: string;
};

export type UpdateTransactionOutput = Either<
  TransactionErrors | NotExistingTransactionError,
  Transaction
>;

export class UpdateTransaction {
  constructor(private readonly repository: TransactionRepository) {}

  async execute(
    params: UpdateTransactionInput,
  ): Promise<UpdateTransactionOutput> {
    const transactionAlreadyExists =
      await this.repository.getOneTransactionFromUser(
        params.walletId,
        params.transactionId,
      );

    if (!transactionAlreadyExists)
      return left(new NotExistingTransactionError(params.transactionId));

    const transactionOrError = Transaction.create({
      title: params.title
        ? params.title
        : (transactionAlreadyExists.title as string),
      description: params.description
        ? params.description
        : (transactionAlreadyExists.description as string),
      flow: params.flow
        ? params.flow
        : (transactionAlreadyExists.flow as string),
      amount: params.amount
        ? params.amount
        : (transactionAlreadyExists.amount as number),
      date: params.date
        ? params.date
        : (transactionAlreadyExists.date as number),
      category: params.category
        ? params.category
        : (transactionAlreadyExists.category as string),
      status: params.status
        ? params.status
        : (transactionAlreadyExists.status as string),
    });

    if (transactionOrError.isLeft()) return left(transactionOrError.value);

    const transaction = transactionOrError.value;

    await this.repository.updateTransaction(
      transaction,
      params.transactionId,
      params.walletId,
    );

    return right(transaction);
  }
}
