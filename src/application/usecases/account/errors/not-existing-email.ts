import { UseCaseError } from '@/core/domain/errors/use-case-error';

export class NotExistingEmailError extends Error implements UseCaseError {
  constructor(email: string) {
    super(`Email: ${email} does not exists`);
    this.name = 'NotExistingEmailError';
  }
}
