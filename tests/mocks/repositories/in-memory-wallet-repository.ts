import { WalletRepository } from '@/application/repositories/wallet-repository';
import { Wallet } from '@/domain/entities/wallet';

export class InMemoryWalletRepository implements WalletRepository {
  constructor(private rows: Wallet[] = []) {}

  async createWallet(data: Wallet): Promise<void> {
    this.rows.push(data);
  }

  async existsWallet(title: string, user: string): Promise<boolean> {
    return this.rows.some((row) => row.user === user && row.title === title);
  }

  async getAllWalletsFromUser(user: string): Promise<Wallet[]> {
    return this.rows.filter((row) => row.user === user);
  }

  async getOneWalletFromUser(id: string): Promise<Wallet | undefined> {
    return this.rows.find((row) => row.id === id);
  }

  async updateOneWalletFromUser(data: Wallet, id: string): Promise<void> {
    const wallet = this.rows.findIndex((row) => row.id === id);

    this.rows[wallet] = data;
  }

  async deleteOneWalletFromUser(id: string): Promise<void> {
    const wallet = this.rows.find((row) => row.id === id);

    this.rows.splice(this.rows.indexOf(wallet as Wallet), 1);
  }
}
