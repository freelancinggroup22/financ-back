import { Either, left, right } from '@/core/logic/either';

import { InvalidStatusError } from './errors/invalid-status-error';

export class Status {
  get value(): string {
    return this.status;
  }

  private constructor(private readonly status: string) {
    Object.freeze(this);
  }

  public static create(status: string): Either<InvalidStatusError, Status> {
    if (!status || !this.validate(status.trim())) {
      return left(new InvalidStatusError(status));
    }

    return right(new Status(status));
  }

  static validate(status: string | 'pending' | 'planned' | 'paid'): boolean {
    if (status !== 'pending' && status !== 'planned' && status !== 'paid') {
      return false;
    }

    return true;
  }
}
