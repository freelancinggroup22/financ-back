import { DomainError } from '@/core/domain/errors/domain-error';

export class InvalidCategoryError extends Error implements DomainError {
  constructor(category: string) {
    super(`The name "${category}" is invalid.`);
    this.name = 'InvalidCategoryError';
  }
}
