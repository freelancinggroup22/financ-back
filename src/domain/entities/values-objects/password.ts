import { IsString, Length, validate } from 'class-validator';

import { Either, left, right } from '@/core/logic/either';

import { InvalidPasswordError } from './errors/invalid-password-error';

export class Password {
  @IsString()
  @Length(8, 255)
  private password: string;

  get value(): string {
    return this.password;
  }

  private constructor(password: string) {
    this.password = password;
  }

  public static async create(password: string): Promise<Either<InvalidPasswordError, Password>> {
    const passwordOrError = await validate(new Password(password));

    if (passwordOrError[0]) {
      return left(new InvalidPasswordError(password));
    }

    return right(new Password(password));
  }
}
