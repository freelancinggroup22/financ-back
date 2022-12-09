import { Transaction } from '@/domain/entities/transaction';

export interface TransactionRepository {
  create(data: Transaction): Promise<void>;
  getAllTransactionsFromUser(
    walletId: string,
    limit: number,
  ): Promise<Transaction[]>;
  getOneTransactionFromUser(
    walletId: string,
    transactionId: string,
  ): Promise<Partial<Transaction> | undefined>;
  updateTransaction(
    data: Transaction,
    transactionId: string,
    walletId: string,
  ): Promise<void>;
  removeTransaction(walletId: string, transactionId: string): Promise<void>;
}
