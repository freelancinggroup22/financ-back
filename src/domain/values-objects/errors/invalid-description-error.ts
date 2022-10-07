import { DomainError } from '@/core/domain/errors/domain-error';

export class InvalidDescriptionError extends Error implements DomainError {
  constructor(description: string) {
    super(`The name "${description}" is invalid.`);
    this.name = 'InvalidDescriptionError';
  }
}
