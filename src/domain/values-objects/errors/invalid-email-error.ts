import { DomainError } from '@/core/domain/errors/domain-error';

export class InvalidEmailError extends Error implements DomainError {
  constructor(email: string) {
    super(`Email: ${email} is not in a valid format`);
    this.name = 'InvalidEmailError';
  }
}
