import { Either, left, right } from '@/core/logic/either';

import { InvalidDescriptionError } from './errors/invalid-description-error';

export class Description {
  get value(): string {
    return this.description;
  }

  private constructor(private readonly description: string) {
    Object.freeze(this);
  }

  public static create(
    description: string,
  ): Either<InvalidDescriptionError, Description> {
    if (!description || !this.validate(description.trim())) {
      return left(new InvalidDescriptionError(description));
    }

    return right(new Description(description));
  }

  static validate(description: string): boolean {
    const pattern = /^[a-z '-]+$/i;

    if (
      description.length > 40 ||
      description.length < 5 ||
      !pattern.test(description)
    ) {
      return false;
    }

    return true;
  }
}
