import { WalletRepository } from '@/application/repositories/wallet-repository';
import { Either, left, right } from '@/core/logic/either';
import { Wallet, WalletErrors } from '@/domain/entities/wallet';

import { ExistingWalletError } from './errors/existing-wallet';

export type CreateWalletInput = {
  title: string;
  user: string;
};

export type CreateWalletOutput = Either<
  WalletErrors | ExistingWalletError,
  Wallet
>;

export class CreateWallet {
  constructor(private readonly repository: WalletRepository) {}

  async execute({
    title,
    user,
  }: CreateWalletInput): Promise<CreateWalletOutput> {
    const walletOrError = Wallet.create({ title, user });
    if (walletOrError.isLeft()) return left(walletOrError.value);

    const walletAlreadyExists = await this.repository.existsWallet(title, user);
    if (walletAlreadyExists) return left(new ExistingWalletError(title));

    const wallet = walletOrError.value;

    await this.repository.createWallet(wallet);

    return right(wallet);
  }
}
