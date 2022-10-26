import { WalletRepository } from '@/application/repositories/wallet-repository';
import { Either, left, right } from '@/core/logic/either';
import { Wallet, WalletErrors } from '@/domain/entities/wallet';

import { NotExistingWalletError } from './errors/not-existing-wallet';

export type GetOneWalletInput = {
  user: string;
  walletId: string;
};

export type GetOneWalletOutput = Either<
  WalletErrors | NotExistingWalletError,
  Wallet
>;

export class GetOneWallet {
  constructor(private readonly repository: WalletRepository) {}

  async execute({
    user,
    walletId,
  }: GetOneWalletInput): Promise<GetOneWalletOutput> {
    const walletAlreadyExists = await this.repository.getOneWalletFromUser(
      user,
      walletId,
    );

    if (!walletAlreadyExists) return left(new NotExistingWalletError(user));

    const walletOrError = Wallet.create(walletAlreadyExists);
    if (walletOrError.isLeft()) return left(walletOrError.value);

    const wallet = walletOrError.value;

    return right(wallet);
  }
}
