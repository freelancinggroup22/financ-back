import { Entity } from '@/core/domain/entity';
import { Either, left, right } from '@/core/logic/either';
import { Maybe } from '@/core/logic/maybe';

import { Email, Name, Password } from './values-objects';
import { InvalidEmailError } from './values-objects/errors/invalid-email-error';
import { InvalidPasswordError } from './values-objects/errors/invalid-password-error';

export type AccountProps = {
  name?: string;
  email: string;
  password: string;
};

export type AccountErrors = InvalidEmailError | InvalidPasswordError;

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

  private constructor(props: AccountProps, id?: string) {
    super(props, id);
  }

  public static async create(
    props: AccountProps,
    id?: string,
  ): Promise<Either<AccountErrors, Account>> {
    if (props.name) {
      const nameOrError = await Name.create(props.name);
      if (nameOrError.isLeft()) return left(nameOrError.value);
    }

    const emailOrError = await Email.create(props.email);
    if (emailOrError.isLeft()) return left(emailOrError.value);

    const passwordOrError = await Password.create(props.password);
    if (passwordOrError.isLeft()) return left(passwordOrError.value);

    const account = new Account(props, id);

    return right(account);
  }
}
