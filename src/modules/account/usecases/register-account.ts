import { Either, left, right } from '@/core/logic/either';
import { Maybe } from '@/core/logic/maybe';
import { AccountErrors, Account } from '@/domain/entities/account';
import { AccountRepository } from '@/infra/repositories/models/account-repository';

import { ExistingEmailError } from './errors/existing-email';

export type RegisterAccountInput = {
  name: string;
  email: string;
  password: string;
};

export type RegisterAccountOutput = {
  uid: string;
  photoURL: Maybe<string>;
  displayName: Maybe<string>;
  accessToken: string;
};

export type Output = Either<AccountErrors | ExistingEmailError, Partial<RegisterAccountOutput>>;

export class RegisterAccount {
  constructor(private readonly repository: AccountRepository) {}

  async execute({ name, email, password }: RegisterAccountInput): Promise<Output> {
    const accountOrError = await Account.create({ name, email, password });

    if (accountOrError.isLeft()) return left(accountOrError.value);

    const account = accountOrError.value;

    const emailAlreadyExists = await this.repository.existsEmail(account.email);

    if (emailAlreadyExists) return left(new ExistingEmailError(email));

    const registerOrError = await this.repository.register(account as RegisterAccountInput);

    return right(registerOrError);
  }
}
