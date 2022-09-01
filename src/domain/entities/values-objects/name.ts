import { IsString, Length, validate } from 'class-validator';

import { Either, left, right } from '@/core/logic/either';

import { InvalidNameError } from './errors/invalid-name-error';

export class Name {
  @IsString()
  @Length(3, 255)
  private name: string;

  get value(): string {
    return this.name;
  }

  private constructor(name: string) {
    this.name = name;
  }

  public static async create(name: string): Promise<Either<InvalidNameError, Name>> {
    const nameOrError = await validate(new Name(name));

    if (nameOrError[0]) {
      return left(new InvalidNameError(name));
    }

    return right(new Name(name));
  }
}
