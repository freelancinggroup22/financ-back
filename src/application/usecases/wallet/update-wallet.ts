import { AccountRepository } from '@/application/repositories/account-repository';
import { WalletRepository } from '@/application/repositories/wallet-repository';
import { Either, left, right } from '@/core/logic/either';
import { Wallet, WalletErrors } from '@/domain/entities/wallet';

import { ExistingWalletError } from './errors/existing-wallet';
import { NotExistingAccountError } from './errors/not-existing-email';
import { NotExistingWalletError } from './errors/not-existing-wallet';

export type UpdateWalletInput = {
  title: string;
  userId: string;
  walletId: string;
};

export type UpdateWalletOutput = Either<
  | WalletErrors
  | NotExistingAccountError
  | NotExistingWalletError
  | ExistingWalletError,
  Wallet
>;

export class UpdateWallet {
  constructor(
    private readonly repository: WalletRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute({
    title,
    userId,
    walletId,
  }: UpdateWalletInput): Promise<UpdateWalletOutput> {
    const accountAlreadyExists = await this.accountRepository.existsId(userId);
    if (!accountAlreadyExists) return left(new NotExistingAccountError(userId));

    const walletAlreadyExists = await this.repository.getOneWalletFromUser(
      userId,
      walletId,
    );

    if (!walletAlreadyExists) return left(new NotExistingWalletError(userId));

    const walletWithTitleAlreadyExists =
      await this.repository.existsTitleWallet(title, userId);

    if (walletWithTitleAlreadyExists)
      return left(new ExistingWalletError(title));

    const walletOrError = Wallet.create({
      title,
      user: walletAlreadyExists.user,
    });

    if (walletOrError.isLeft()) return left(walletOrError.value);

    const wallet = walletOrError.value;

    await this.repository.updateWallet(wallet, walletId);

    return right(wallet);
  }
}
