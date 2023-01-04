import { DomainError } from '@/core/domain/errors/domain-error';

export class InvalidFlowError extends Error implements DomainError {
  constructor(flow: string) {
    super(`The name "${flow}" is invalid.`);
    this.name = 'InvalidFlowError';
  }
}
