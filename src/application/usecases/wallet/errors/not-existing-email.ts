import { UseCaseError } from '@/core/domain/errors/use-case-error';

export class NotExistingAccountError extends Error implements UseCaseError {
  constructor(userId: string) {
    super(`Id: Account with ${userId} does not exists`);
    this.name = 'NotExistingAccountError';
  }
}
