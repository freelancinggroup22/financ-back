import { TransactionRepository } from '@/application/repositories/transaction.repository';
import { WalletRepository } from '@/application/repositories/wallet-repository';
import { Either, left, right } from '@/core/logic/either';
import { Transaction, TransactionErrors } from '@/domain/entities/transaction';

import { NotExistingTransactionError } from './errors/not-existing-transaction';

export type CreateTransactionInput = {
  walletId: string;
  userId: string;
  title: string;
  description: string;
  amount: number;
  flow: string;
  date: string;
  category: string;
  status: string;
};

export type CreateTransactionOutput = Either<
  TransactionErrors | NotExistingTransactionError,
  Transaction
>;

export class CreateTransaction {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly walletRepository: WalletRepository,
  ) {}

  async execute({
    walletId,
    userId,
    title,
    description,
    amount,
    flow,
    date,
    category,
    status,
  }: CreateTransactionInput): Promise<CreateTransactionOutput> {
    const walletAlreadyExists = await this.walletRepository.existsWallet(
      userId,
      walletId,
    );
    if (!walletAlreadyExists)
      return left(new NotExistingTransactionError(walletId));

    const dateTransactionOccurred = new Date(date).valueOf();

    const transactionOrError = Transaction.create({
      wallet: walletId,
      title,
      description,
      amount: Number(amount),
      flow,
      date: dateTransactionOccurred,
      category,
      status,
    });

    if (transactionOrError.isLeft()) return left(transactionOrError.value);

    const transaction = transactionOrError.value;

    await this.transactionRepository.create(transaction);

    return right(transaction);
  }
}
