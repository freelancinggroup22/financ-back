import { DomainError } from '@/core/domain/errors/domain-error';

export class InvalidPasswordError extends Error implements DomainError {
  constructor(password: string) {
    super(`Password: ${password} is not in a valid format`);
    this.name = 'InvalidPasswordError';
    this.message = 'Passwords must have a minimum of 8 characters and a maximum of 255.';
  }
}
