import { DomainError } from '@/core/domain/errors/domain-error';

export class InvalidNameError extends Error implements DomainError {
  constructor(name: string) {
    super(`Name: ${name} is not in a valid format`);
    this.name = 'InvalidNameError';
  }
}
