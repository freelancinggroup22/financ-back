import { Either, left, right } from '@/core/logic/either';

import { InvalidNameError } from './errors/invalid-name-error';

export class Name {
  get value(): string {
    return this.name;
  }

  private constructor(private readonly name: string) {
    Object.freeze(this);
  }

  public static create(name: string): Either<InvalidNameError, Name> {
    if (!name || !this.validate(name.trim())) {
      return left(new InvalidNameError(name));
    }

    return right(new Name(name));
  }

  static validate(name: string): boolean {
    const pattern = /^[a-z '-]+$/i;

    if (name.length > 40 || name.length < 5 || !pattern.test(name)) {
      return false;
    }

    return true;
  }
}
