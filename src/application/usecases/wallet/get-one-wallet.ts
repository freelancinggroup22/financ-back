import { WalletRepository } from '@/application/repositories/wallet-repository';
import { Either, left, right } from '@/core/logic/either';
import { Wallet, WalletErrors } from '@/domain/entities/wallet';

import { NotExistingWalletError } from './errors/not-existing-wallet';

export type GetOneWalletInput = {
  userId: string;
  walletId: string;
};

export type GetOneWalletOutput = Either<
  WalletErrors | NotExistingWalletError,
  Wallet
>;

export class GetOneWallet {
  constructor(private readonly repository: WalletRepository) {}

  async execute({
    userId,
    walletId,
  }: GetOneWalletInput): Promise<GetOneWalletOutput> {
    const walletAlreadyExists = await this.repository.getOneWalletFromUser(
      userId,
      walletId,
    );

    if (!walletAlreadyExists) return left(new NotExistingWalletError(userId));

    const walletOrError = Wallet.create(walletAlreadyExists);
    if (walletOrError.isLeft()) return left(walletOrError.value);

    const wallet = walletOrError.value;

    return right(wallet);
  }
}
