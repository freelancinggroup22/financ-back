import { UseCaseError } from '@/core/domain/errors/use-case-error';

export class ExistingAccountError extends Error implements UseCaseError {
  constructor(id: string) {
    super(`Account: ${id} does not exists`);
    this.name = 'ExistingAccountError';
  }
}
