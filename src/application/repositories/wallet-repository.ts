import { Wallet } from '@/domain/entities/wallet';

export interface WalletRepository {
  createWallet(data: Wallet): Promise<void>;
  existsTitleWallet(title: string, userId: string): Promise<boolean>;
  existsWallet(userId: string, walletId: string): Promise<boolean>;
  getAllWalletsFromUser(userId: string, limit?: number): Promise<Wallet[]>;
  getOneWalletFromUser(
    userId: string,
    walletId: string,
  ): Promise<Wallet | undefined>;
  updateWallet(data: Wallet, id: string): Promise<void>;
  removeWallet(walletId: string): Promise<void>;
}
