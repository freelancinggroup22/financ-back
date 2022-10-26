import { Wallet } from '@/domain/entities/wallet';

export interface WalletRepository {
  createWallet(data: Wallet): Promise<void>;
  existsTitleWallet(title: string, user: string): Promise<boolean>;
  existsWallet(user: string, walletId: string): Promise<boolean>;
  getAllWalletsFromUser(user: string, limit?: number): Promise<Wallet[]>;
  getOneWalletFromUser(
    user: string,
    walletId: string,
  ): Promise<Wallet | undefined>;
  updateWallet(data: Wallet, id: string): Promise<void>;
  removeWallet(user: string): Promise<void>;
}
