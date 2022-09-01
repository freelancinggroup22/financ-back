import { Either, left, right } from '@/core/logic/either';
import { Maybe } from '@/core/logic/maybe';
import { AccountErrors, Account } from '@/domain/entities/account';
import { AccountRepository } from '@/infra/repositories/models/account-repository';

import { ExistingEmailError } from './errors/existing-email';

export type RegisterAccountRequest = {
  name: string;
  email: string;
  password: string;
};

export type RegisterAccountResponse = {
  uid: string;
  photoURL: Maybe<string>;
  displayName: Maybe<string>;
  accessToken: string;
};

export type Response = Either<AccountErrors | ExistingEmailError, Partial<RegisterAccountResponse>>;

export class RegisterAccount {
  constructor(private readonly repository: AccountRepository) {}

  async execute({ name, email, password }: RegisterAccountRequest): Promise<Response> {
    const accountOrError = await Account.create({ name, email, password });

    if (accountOrError.isLeft()) return left(accountOrError.value);

    const account = accountOrError.value;

    const emailAlreadyExists = await this.repository.existsEmail(account.email);

    if (emailAlreadyExists) return left(new ExistingEmailError(email));

    const registerOrError = await this.repository.register(account as RegisterAccountRequest);

    return right(registerOrError);
  }
}
