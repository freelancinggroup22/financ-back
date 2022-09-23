import { AccountRepository } from '@/application/repositories/account-repository';
import { Account } from '@/domain/entities/account/account';
import { InMemoryAccountRepository } from '@tests/mocks/repositories/in-memory-account-repository';

import { ExistingEmailError } from './errors/existing-email';
import { RegisterAccount, RegisterAccountInput } from './register-account';

describe('Register Account', () => {
  let repository: AccountRepository;
  let sut: RegisterAccount;
  let params: RegisterAccountInput;
  let account: Account;

  beforeEach(() => {
    repository = new InMemoryAccountRepository();
    sut = new RegisterAccount(repository);
    params = {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'secret_pass',
    };
    account = Account.create(params).value as Account;
  });

  it('Should be able to register a new account', async () => {
    const response = await sut.execute(params);

    expect(response.isRight()).toBeTruthy();
    expect(response.value).toEqual(expect.objectContaining({ ...params }));
  });

  it('Should call account registration with correct values', async () => {
    const create = jest.spyOn(repository, 'create');
    const response = await sut.execute(params);

    expect(response.isRight()).toBeTruthy();
    expect(create).toHaveBeenCalledWith(expect.objectContaining({ ...params }));
  });

  it('Should return an error if received email is already registered', async () => {
    await repository.create(account);

    const response = await sut.execute(params);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toEqual(new ExistingEmailError(account.email));
  });

  it('Should not call account registration if its email is already registered', async () => {
    await repository.create(account);

    const create = jest.spyOn(repository, 'create');
    const response = await sut.execute(params);

    expect(response.isLeft()).toBeTruthy();
    expect(create).not.toHaveBeenCalled();
  });
});
