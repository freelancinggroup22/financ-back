import { TransactionRepository } from '@/application/repositories/transaction.repository';
import { Either, left, right } from '@/core/logic/either';
import { TransactionErrors } from '@/domain/entities/transaction';

import { NotExistingTransactionError } from './errors/not-existing-transaction';

export type DeleteTransactionInput = {
  walletId: string;
  transactionId: string;
};

export type DeleteTransactionOutput = Either<
  TransactionErrors | NotExistingTransactionError,
  { ok: string }
>;

export class DeleteTransaction {
  constructor(private readonly repository: TransactionRepository) {}

  async execute({
    walletId,
    transactionId,
  }: DeleteTransactionInput): Promise<DeleteTransactionOutput> {
    const transactionAlreadyExists =
      await this.repository.getOneTransactionFromUser(walletId, transactionId);

    if (!transactionAlreadyExists)
      return left(new NotExistingTransactionError(transactionId));

    await this.repository.removeTransaction(walletId, transactionId);

    return right({ ok: transactionId });
  }
}
