import { WalletRepository } from '@/application/repositories/wallet-repository';
import { Wallet } from '@/domain/entities/wallet';

import { FirebaseConnection } from '../connection';

export class FirebaseWalletRepository implements WalletRepository {
  private readonly collection = 'wallets';

  constructor(private readonly repo = FirebaseConnection().getFirestore) {}

  async createWallet({ title, user }: Wallet): Promise<void> {
    await this.repo.collection(this.collection).add({ title, user });
  }

  async existsTitleWallet(title: string, userId: string): Promise<boolean> {
    let wallet: Wallet | undefined;

    await this.repo
      .collection(this.collection)
      .where('user', '==', userId)
      .where('title', '==', title)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const walletOrError = Wallet.create({
            title: doc.data().title || 'Name not found',
            balance: doc.data().balance || 0,
            incomes: doc.data().income || 0,
            outcomes: doc.data().outcome || 0,
            user: doc.data().user || '',
          });

          if (walletOrError.isRight()) {
            wallet = walletOrError.value;
          }
        });
      });

    return !!wallet;
  }

  async existsWallet(userId: string, walletId: string): Promise<boolean> {
    const wallet = await this.getOneWalletFromUser(userId, walletId);

    return !!wallet;
  }

  async getAllWalletsFromUser(
    userId: string,
    limit: number,
  ): Promise<Wallet[]> {
    const wallets: Wallet[] = [];

    await this.repo
      .collection(this.collection)
      .where('user', '==', userId)
      .limit(limit)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const walletOrError = Wallet.create({
            title: doc.data().title || 'Name not found',
            balance: doc.data().balance || 0,
            incomes: doc.data().income || 0,
            outcomes: doc.data().outcome || 0,
            user: doc.data().user || '',
          });

          if (walletOrError.isRight()) {
            wallets.push(walletOrError.value);
          }
        });
      });

    return wallets;
  }

  async getOneWalletFromUser(
    userId: string,
    walletId: string,
  ): Promise<Wallet | undefined> {
    const wallet = await this.repo
      .collection(this.collection)
      .doc(walletId)
      .get()
      .then((querySnapshot) => {
        const doc = querySnapshot.data();

        if (doc && doc.user === userId) {
          const walletOrError = Wallet.create({
            title: doc.title || 'Name not found',
            balance: doc.balance || 0,
            incomes: doc.income || 0,
            outcomes: doc.outcome || 0,
            user: doc.user || '',
          });

          if (walletOrError.isRight()) {
            return walletOrError.value;
          }
        }
      });

    return wallet;
  }

  async updateWallet(
    { balance, incomes, outcomes, title }: Wallet,
    userId: string,
  ): Promise<void> {
    await this.repo
      .collection(this.collection)
      .doc(userId)
      .update({ balance, incomes, outcomes, title });
  }

  async removeWallet(walletId: string): Promise<void> {
    await this.repo.collection(this.collection).doc(walletId).delete();
  }
}
