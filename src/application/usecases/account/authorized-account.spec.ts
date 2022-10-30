import { AccountRepository } from '@/application/repositories/account-repository';
import { InMemoryAccountRepository } from '@tests/mocks/repositories/in-memory-account-repository';

import {
  AuthorizedAccount,
  AuthorizedAccountInput,
} from './authorized-account';
import { AccessDeniedError } from './errors/access-denied';

describe('Authorized Account', () => {
  let repository: AccountRepository;
  let sut: AuthorizedAccount;
  let params: AuthorizedAccountInput;

  beforeEach(() => {
    repository = new InMemoryAccountRepository();
    sut = new AuthorizedAccount(repository);
    params = {
      accessToken: 'token',
    };
  });

  it('Should be able to authorize an account', async () => {
    const response = await sut.execute(params);

    expect(response.isRight()).toBeTruthy();
    expect(response.value).toEqual('1234565789');
  });

  it('Should not be able to authorize an account without accessToken', async () => {
    const auth = jest.spyOn(repository, 'verifyToken');

    params = {
      accessToken: null as any,
    };

    const response = await sut.execute(params);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toEqual(new AccessDeniedError(params.accessToken));
    expect(auth).not.toHaveBeenCalled();
  });
});
