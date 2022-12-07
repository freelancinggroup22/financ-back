import { TransactionRepository } from '@/application/repositories/transaction.repository';
import { Transaction } from '@/domain/entities/transaction';

import { FirebaseConnection } from '../connection';

export class FirebaseTransactionRepository implements TransactionRepository {
  private readonly collection = 'wallets';

  constructor(private readonly repo = FirebaseConnection().getFirestore) {}

  async create(data: Transaction): Promise<void> {
    const walletsRef = await this.repo.doc(`wallets/${data.wallet}`);
    const transactionsRef = await this.repo.collection(
      `${this.collection}/${data.wallet}/transactions`,
    );

    this.repo.runTransaction(async (fireBaseTransaction) => {
      const walletSnap = await fireBaseTransaction.get(walletsRef);

      if (walletSnap.exists) {
        const balance = walletSnap.data()?.balance || 0;
        const income = walletSnap.data()?.income || 0;
        const outcome = walletSnap.data()?.outcome || 0;

        const balanceUpdated =
          data.flow === 'income'
            ? balance + data.amount
            : balance - data.amount;

        const incomeUpdated = income + data.amount;
        const outcomeUpdated = outcome + data.amount;

        data.flow === 'income'
          ? fireBaseTransaction.update(walletsRef, {
              balance: balanceUpdated,
              income: incomeUpdated,
            })
          : fireBaseTransaction.update(walletsRef, {
              balance: balanceUpdated,
              outcome: outcomeUpdated,
            });

        transactionsRef.add({
          title: data.title,
          description: data.description,
          flow: data.flow,
          date: new Date().valueOf(),
          category: data.category,
          amount: data.amount,
          status: data.status,
        });
      }
    });
  }

  async getAllTransactionsFromUser(
    walletId: string,
    limit: number,
  ): Promise<Transaction[]> {
    const transactionsRef = await this.repo.collection(
      `${this.collection}/${walletId}/transactions`,
    );
    const transactions: Transaction[] = [];

    await transactionsRef
      .limit(limit)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const transactionOrError = Transaction.create(
            {
              title: doc.data().title,
              description: doc.data().description,
              flow: doc.data().flow,
              amount: doc.data().amount,
              date: doc.data().date,
              category: doc.data().category,
              status: doc.data().status,
            },
            doc.id,
          );

          if (transactionOrError.isRight()) {
            transactions.push(transactionOrError.value);
          }
        });
      });

    return transactions;
  }

  async getOneTransactionFromUser(
    walletId: string,
    transactionId: string,
  ): Promise<any | undefined> {
    const transactionsRef = await this.repo.collection(
      `${this.collection}/${walletId}/transactions`,
    );

    const transaction = await transactionsRef
      .doc(transactionId)
      .get()
      .then((querySnapshot) => {
        const doc = querySnapshot.data();

        if (doc) {
          const transactionOrError = Transaction.create(
            {
              title: doc.title || '',
              description: doc.description || '',
              flow: doc.flow || '',
              amount: doc.amount || 0,
              date: doc.date || '',
              category: doc.category || '',
              status: doc.status || '',
            },
            transactionId,
          );

          if (transactionOrError.isRight()) {
            return transactionOrError.value;
          }
        }
      });

    return {
      id: transactionId,
      title: transaction?.title,
      description: transaction?.description,
      flow: transaction?.flow,
      amount: transaction?.amount,
      date: transaction?.date,
      category: transaction?.category,
      status: transaction?.status,
    };
  }

  async updateTransaction(
    { title, description, flow, amount, date, category, status }: Transaction,
    userId: string,
  ): Promise<void> {
    await this.repo
      .collection(this.collection)
      .doc(userId)
      .update({ title, description, flow, amount, date, category, status });
  }

  async removeTransaction(
    walletId: string,
    transactionId: string,
  ): Promise<void> {
    const transactionsRef = await this.repo.collection(
      `${this.collection}/${walletId}/transactions`,
    );

    await transactionsRef.doc(transactionId).delete();
  }
}
