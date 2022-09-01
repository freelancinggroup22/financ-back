import { IsEmail, IsString, Length, validate } from 'class-validator';

import { Either, left, right } from '@/core/logic/either';

import { InvalidEmailError } from './errors/invalid-email-error';

export class Email {
  @IsEmail()
  @IsString()
  @Length(8, 255)
  private email: string;

  get value(): string {
    return this.email;
  }

  private constructor(email: string) {
    this.email = email;
  }

  public static async create(email: string): Promise<Either<InvalidEmailError, Email>> {
    const emailOrError = await validate(new Email(email));

    if (emailOrError[0]) {
      return left(new InvalidEmailError(email));
    }

    return right(new Email(email));
  }
}
