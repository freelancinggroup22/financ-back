import { DomainError } from '@/core/domain/errors/domain-error';

export class InvalidAmountError extends Error implements DomainError {
  constructor(amount: number) {
    super(`The amount "${amount}" is invalid.`);
    this.name = 'InvalidAmountError';
  }
}
