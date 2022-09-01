import { UseCaseError } from '@/core/domain/errors/use-case-error';

export class ExistingEmailError extends Error implements UseCaseError {
  constructor(email: string) {
    super(`Email: ${email} is already in use`);
    this.name = 'ExistingEmailError';
  }
}
