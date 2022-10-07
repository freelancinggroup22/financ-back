import { Either, left, right } from '@/core/logic/either';

import { InvalidPasswordError } from './errors/invalid-password-error';

export class Password {
  get value(): string {
    return this.password;
  }

  private constructor(private readonly password: string) {
    Object.freeze(this);
  }

  public static create(
    password: string,
  ): Either<InvalidPasswordError, Password> {
    if (!password || !this.validate(password.trim())) {
      return left(new InvalidPasswordError(password));
    }

    return right(new Password(password));
  }

  public static validate(password: string): boolean {
    if (password.length > 15 || password.length < 8) {
      return false;
    }
    return true;
  }
}
