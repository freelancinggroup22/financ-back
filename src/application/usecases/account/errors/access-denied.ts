import { UseCaseError } from '@/core/domain/errors/use-case-error';

export class AccessDeniedError extends Error implements UseCaseError {
  constructor(accessToken: string) {
    super(`Access denied: token ${accessToken} does not valid`);
    this.name = 'AccessDeniedError';
  }
}
