import { UseCaseError } from '@/core/domain/errors/use-case-error';

export class ExistingWalletError extends Error implements UseCaseError {
  constructor(wallet: string) {
    super(`Wallet: ${wallet} is already in use`);
    this.name = 'ExistingWalletError';
  }
}
