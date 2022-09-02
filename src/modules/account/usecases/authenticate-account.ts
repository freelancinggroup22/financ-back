import { Either, left, right } from '@/core/logic/either';
import { Maybe } from '@/core/logic/maybe';
import { Account, AccountErrors } from '@/domain/entities/account';
import { FirebaseAccountRepository } from '@/infra/repositories/implementations/firebase-account-repository';
import { AccountRepository } from '@/infra/repositories/models/account-repository';

import { NotExistingEmailError } from './errors/not-existing-email';

export type AuthenticateAccountRequest = {
  email: string;
  password: string;
};

export type RegisterAccountResponse = {
  uid: string;
  photoURL: Maybe<string>;
  displayName: Maybe<string>;
  accessToken: string;
};

export type Response = Either<
  AccountErrors | NotExistingEmailError,
  Partial<RegisterAccountResponse>
>;

export class AuthenticateAccount {
  constructor(private readonly repository: AccountRepository) {}

  async execute({ email, password }: AuthenticateAccountRequest): Promise<any> {
    const accountOrError = await Account.create({ email, password });

    if (accountOrError.isLeft()) return left(accountOrError.value);

    const account = accountOrError.value;

    const emailAlreadyExists = await this.repository.existsEmail(account.email);

    if (!emailAlreadyExists) return left(new NotExistingEmailError(email));

    const dataOrError = await this.repository.authenticate(account as AuthenticateAccountRequest);

    return right(dataOrError);
  }
}
