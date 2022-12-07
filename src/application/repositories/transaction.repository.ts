import { Transaction } from '@/domain/entities/transaction';

export interface TransactionRepository {
  create(data: Transaction): Promise<void>;
  getAllTransactionsFromUser(
    walletId: string,
    limit: number,
  ): Promise<Transaction[]>;
}
