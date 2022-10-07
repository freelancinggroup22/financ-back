import { AccountRepository } from '@/application/repositories/account-repository';
import { Account } from '@/domain/entities/account';
import { InMemoryAccountRepository } from '@tests/mocks/repositories/in-memory-account-repository';

import {
  AuthenticateAccount,
  AuthenticateAccountInput,
} from './authenticate-account';
import { NotExistingEmailError } from './errors/not-existing-email';

describe('Authenticate Account', () => {
  let repository: AccountRepository;
  let sut: AuthenticateAccount;
  let params: AuthenticateAccountInput;
  let account: Account;

  beforeEach(() => {
    repository = new InMemoryAccountRepository();
    sut = new AuthenticateAccount(repository);
    params = {
      email: 'johndoe@mail.com',
      password: 'secret_pass',
    };
    account = Account.create({ name: 'John Doe', ...params }).value as Account;
  });

  it('Should be able to authenticate an account', async () => {
    await repository.create(account);
    const response = await sut.execute(params);

    expect(response.isRight()).toBeTruthy();
    expect(response.value).toEqual(
      expect.objectContaining({
        uid: expect.any(String),
        displayName: expect.any(String),
        refreshToken: expect.any(String),
      }),
    );
  });

  it('Should return an error if received account is not already registered', async () => {
    const auth = jest.spyOn(repository, 'authenticate');
    const response = await sut.execute(params);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toEqual(new NotExistingEmailError(account.email));
    expect(auth).not.toHaveBeenCalled();
  });
});
