import { Either, left, right } from '@/core/logic/either';

import { InvalidTitleError } from './errors/invalid-title-error';

export class Title {
  get value(): string {
    return this.title;
  }

  private constructor(private readonly title: string) {
    Object.freeze(this);
  }

  public static create(title: string): Either<InvalidTitleError, Title> {
    if (!title || !this.validate(title.trim())) {
      return left(new InvalidTitleError(title));
    }

    return right(new Title(title));
  }

  static validate(title: string): boolean {
    const pattern = /^[a-z '-]+$/i;

    if (title.length > 20 || title.length < 5 || !pattern.test(title)) {
      return false;
    }

    return true;
  }
}
