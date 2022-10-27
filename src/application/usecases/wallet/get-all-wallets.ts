import { WalletRepository } from '@/application/repositories/wallet-repository';
import { Either, left, right } from '@/core/logic/either';
import { Wallet, WalletErrors } from '@/domain/entities/wallet';

import { NotExistingWalletError } from './errors/not-existing-wallet';

export type GetAllWalletInput = {
  userId: string;
  limit?: number;
};

export type GetAllWalletOutput = Either<
  WalletErrors | NotExistingWalletError,
  Wallet[]
>;

export class GetAllWallets {
  constructor(private readonly repository: WalletRepository) {}

  async execute({
    userId,
    limit = 10,
  }: GetAllWalletInput): Promise<GetAllWalletOutput> {
    const walletsFromUser = await this.repository.getAllWalletsFromUser(
      userId,
      Number(limit),
    );

    const wallets = walletsFromUser.filter((wallet) => {
      const walletOrError = Wallet.create(wallet);
      if (walletOrError.isRight()) return walletOrError.value;
    });

    return right(wallets);
  }
}
