import { Wallet } from '@/domain/entities/wallet';

export interface WalletRepository {
  createWallet(data: Wallet): Promise<void>;
  existsWallet(title: string, user: string): Promise<boolean>;
  getAllWalletsFromUser(user: string): Promise<Wallet[]>;
  getOneWalletFromUser(id: string): Promise<Wallet | undefined>;
  updateOneWalletFromUser(data: Wallet, id: string): Promise<void>;
  deleteOneWalletFromUser(id: string): Promise<void>;
}
