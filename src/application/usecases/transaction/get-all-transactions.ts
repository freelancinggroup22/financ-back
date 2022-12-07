import { TransactionRepository } from '@/application/repositories/transaction.repository';
import { Either, right } from '@/core/logic/either';
import { Transaction, TransactionErrors } from '@/domain/entities/transaction';

export type GetAllTransactionsInput = {
  walletId: string;
  limit?: number;
};

export type GetAllTransactionsOutput = Either<TransactionErrors, Transaction[]>;

export class GetAllTransactions {
  constructor(private readonly repository: TransactionRepository) {}

  async execute({
    walletId,
    limit = 10,
  }: GetAllTransactionsInput): Promise<GetAllTransactionsOutput> {
    const transactionsFromUser =
      await this.repository.getAllTransactionsFromUser(walletId, Number(limit));

    const transactions = transactionsFromUser.filter((transaction) => {
      const transactionOrError = Transaction.create(transaction);
      if (transactionOrError.isRight()) return transactionOrError.value;
    });

    return right(transactions);
  }
}
