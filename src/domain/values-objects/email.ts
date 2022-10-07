import { Either, left, right } from '@/core/logic/either';

import { InvalidEmailError } from './errors/invalid-email-error';

export class Email {
  get value(): string {
    return this.email;
  }

  private constructor(private readonly email: string) {
    Object.freeze(this);
  }

  public static create(email: string): Either<InvalidEmailError, Email> {
    if (!email || !this.validate(email.trim())) {
      return left(new InvalidEmailError(email));
    }

    return right(new Email(email));
  }

  public static validate(email: string) {
    const pattern =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (email.length > 255 || !pattern.test(email)) {
      return false;
    }

    const [account, address] = email.split('@');

    if (account.length > 65) {
      return false;
    }

    const domain = address.split('.');

    if (domain.some((part) => part.length > 65)) {
      return false;
    }

    return true;
  }
}
