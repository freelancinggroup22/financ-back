import { DomainError } from '@/core/domain/errors/domain-error';

export class InvalidStatusError extends Error implements DomainError {
  constructor(status: string) {
    super(`The name "${status}" is invalid.`);
    this.name = 'InvalidStatusError';
  }
}
