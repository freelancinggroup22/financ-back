import { AccountRepository } from '@/application/repositories/account-repository';
import { Either, left, right } from '@/core/logic/either';
import { Account, AccountErrors } from '@/domain/entities/account/account';

import { ExistingEmailError } from './errors/existing-email';

export type RegisterAccountInput = {
  name: string;
  email: string;
  password: string;
};

export type RegisterAccountOutput = Either<
  AccountErrors | ExistingEmailError,
  Account
>;

export class RegisterAccount {
  constructor(private readonly repository: AccountRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterAccountInput): Promise<RegisterAccountOutput> {
    const accountOrError = Account.create({ name, email, password });
    if (accountOrError.isLeft()) return left(accountOrError.value);

    const emailAlreadyExists = await this.repository.existsEmail(email);
    if (emailAlreadyExists) return left(new ExistingEmailError(email));

    const account = accountOrError.value;

    await this.repository.create(account);

    return right(account);
  }
}
