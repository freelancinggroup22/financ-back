import { AccountRepository } from '@/application/repositories/account-repository';
import { Either, left, right } from '@/core/logic/either';
import { Maybe } from '@/core/logic/maybe';
import { Account, AccountErrors } from '@/domain/entities/account/account';

import { NotExistingEmailError } from './errors/not-existing-email';

export type AuthenticateAccountInput = {
  email: string;
  password: string;
};

export type AuthenticateOutput = {
  uid: string;
  displayName: Maybe<string>;
  refreshToken: string;
};

export type AuthenticateAccountOutput = Either<
  AccountErrors | NotExistingEmailError,
  AuthenticateOutput
>;

export class AuthenticateAccount {
  constructor(private readonly repository: AccountRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateAccountInput): Promise<AuthenticateAccountOutput> {
    const accountOrError = Account.create({ email, password });
    if (accountOrError.isLeft()) return left(accountOrError.value);

    const emailAlreadyExists = await this.repository.existsEmail(email);
    if (!emailAlreadyExists) return left(new NotExistingEmailError(email));

    const account = accountOrError.value;

    const data = await this.repository.authenticate(account);

    return right(data);
  }
}
