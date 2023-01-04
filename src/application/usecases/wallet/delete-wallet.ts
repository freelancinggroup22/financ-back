import { AccountRepository } from '@/application/repositories/account-repository';
import { WalletRepository } from '@/application/repositories/wallet-repository';
import { Either, left, right } from '@/core/logic/either';

import { NotExistingAccountError } from './errors/not-existing-email';
import { NotExistingWalletError } from './errors/not-existing-wallet';

export type DeleteWalletInput = {
  userId: string;
  walletId: string;
};

export type DeleteWalletOutput = Either<
  NotExistingAccountError | NotExistingWalletError,
  { ok: string }
>;

export class DeleteWallet {
  constructor(
    private readonly repository: WalletRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute({
    userId,
    walletId,
  }: DeleteWalletInput): Promise<DeleteWalletOutput> {
    const accountAlreadyExists = await this.accountRepository.existsId(userId);
    if (!accountAlreadyExists) return left(new NotExistingAccountError(userId));

    const walletAlreadyExists = await this.repository.getOneWalletFromUser(
      userId,
      walletId,
    );

    if (!walletAlreadyExists) return left(new NotExistingWalletError(userId));

    await this.repository.removeWallet(walletId);

    return right({ ok: walletId });
  }
}
