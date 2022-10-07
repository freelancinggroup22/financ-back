import { WalletRepository } from '@/application/repositories/wallet-repository';
import { Wallet } from '@/domain/entities/wallet';

import { FirebaseConnection } from '../connection';

export class FirebaseWalletRepository implements WalletRepository {
  private readonly collection = 'wallets';

  constructor(private readonly repo = FirebaseConnection().getFirestore) {}

  async createWallet({ title, user }: Wallet): Promise<void> {
    await this.repo.collection(this.collection).add({ title, user });
  }

  async existsWallet(title: string, user: string): Promise<boolean> {
    const wallets = await this.getAllWalletsFromUser(user);

    const result = wallets.some((wallet) => wallet.title === title);

    return result;
  }

  async getAllWalletsFromUser(user: string): Promise<Wallet[]> {
    const wallets: Wallet[] = [];

    await this.repo
      .collection(this.collection)
      .where('user', '==', user)
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

  async getOneWalletFromUser(id: string): Promise<Wallet | undefined> {
    const wallet = await this.repo
      .collection(this.collection)
      .doc(id)
      .get()
      .then((querySnapshot) => {
        const doc = querySnapshot.data();

        if (doc) {
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

  async updateOneWalletFromUser(
    { balance, incomes, outcomes, title }: Wallet,
    id: string,
  ): Promise<void> {
    await this.repo
      .collection(this.collection)
      .doc(id)
      .update({ balance, incomes, outcomes, title });
  }

  async deleteOneWalletFromUser(walletId: string): Promise<void> {
    await this.repo.collection(this.collection).doc(walletId).delete();
  }
}
