import { WalletRepository } from '@/application/repositories/wallet-repository';
import { Wallet } from '@/domain/entities/wallet';

export class InMemoryWalletRepository implements WalletRepository {
  constructor(private rows: Wallet[] = []) {}

  async createWallet(data: Wallet): Promise<void> {
    this.rows.push(data);
  }

  async existsTitleWallet(title: string, user: string): Promise<boolean> {
    return this.rows.some((row) => row.user === user && row.title === title);
  }

  async existsWallet(user: string, walletId: string): Promise<boolean> {
    return this.rows.some((row) => row.user === user && row.id === walletId);
  }

  async getAllWalletsFromUser(user: string, limit?: number): Promise<Wallet[]> {
    return this.rows.filter((row) => row.user === user);
  }

  async getOneWalletFromUser(id: string): Promise<Wallet | undefined> {
    return this.rows.find((row) => row.id === id);
  }

  async updateWallet(data: Wallet, id: string): Promise<void> {
    const wallet = this.rows.findIndex((row) => row.id === id);

    this.rows[wallet] = data;
  }

  async removeWallet(id: string): Promise<void> {
    const wallet = this.rows.find((row) => row.id === id);

    this.rows.splice(this.rows.indexOf(wallet as Wallet), 1);
  }
}
