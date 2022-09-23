import { Entity } from '@/core/domain/entity';
import { Either, left, right } from '@/core/logic/either';
import { Maybe } from '@/core/logic/maybe';

import { Email } from './values-objects/email';
import { InvalidEmailError } from './values-objects/errors/invalid-email-error';
import { InvalidNameError } from './values-objects/errors/invalid-name-error';
import { InvalidPasswordError } from './values-objects/errors/invalid-password-error';
import { Name } from './values-objects/name';
import { Password } from './values-objects/password';

type AccountProps = {
  name?: Maybe<string>;
  email: string;
  password: string;
};

export type AccountErrors =
  | InvalidNameError
  | InvalidEmailError
  | InvalidPasswordError;

export class Account extends Entity<AccountProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  set password(hash: string) {
    this.props.password = hash;
  }

  private constructor(props: AccountProps, id?: string) {
    super(props, id);
  }

  public static create(
    props: AccountProps,
    id?: string,
  ): Either<AccountErrors, Account> {
    if (props.name) {
      const nameOrError = Name.create(props.name);
      if (nameOrError.isLeft()) return left(nameOrError.value);
    }

    const emailOrError = Email.create(props.email);
    if (emailOrError.isLeft()) return left(emailOrError.value);

    const passwordOrError = Password.create(props.password);
    if (passwordOrError.isLeft()) return left(passwordOrError.value);

    const account = new Account(props, id);

    return right(account);
  }
}
