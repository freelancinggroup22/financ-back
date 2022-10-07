import { Either, left, right } from '@/core/logic/either';

import { InvalidAmountError } from './errors/invalid-amount-error';

export class Amount {
  get value(): number {
    return this.amount;
  }

  private constructor(private readonly amount: number) {
    Object.freeze(this);
  }

  public static create(amount: number): Either<InvalidAmountError, Amount> {
    if (!amount || !this.validate(amount)) {
      return left(new InvalidAmountError(amount));
    }

    return right(new Amount(amount));
  }

  static validate(amount: number): boolean {
    if (typeof amount !== 'number' || Number.isNaN(amount) || amount < 0) {
      return false;
    }

    return true;
  }
}
