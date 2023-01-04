import { UseCaseError } from '@/core/domain/errors/use-case-error';

export class NotExistingTransactionError extends Error implements UseCaseError {
  constructor(wallet: string) {
    super(`Wallet: ${wallet} does not exists`);
    this.name = 'NotExistingTransactionError';
  }
}
