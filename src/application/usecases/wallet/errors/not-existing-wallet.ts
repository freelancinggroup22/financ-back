import { UseCaseError } from '@/core/domain/errors/use-case-error';

export class NotExistingWalletError extends Error implements UseCaseError {
  constructor(wallet: string) {
    super(`Wallet: ${wallet} does not exists`);
    this.name = 'NotExistingWalletError';
  }
}
