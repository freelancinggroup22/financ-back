import { WalletRepository } from '@/application/repositories/wallet-repository';
import { Wallet } from '@/domain/entities/wallet';
import { InMemoryWalletRepository } from '@tests/mocks/repositories/in-memory-wallet-repository';

import { NotExistingWalletError } from './errors/not-existing-wallet';
import { GetOneWallet, GetOneWalletInput } from './get-one-wallet';

describe('Get One Wallet', () => {
  let repository: WalletRepository;
  let sut: GetOneWallet;
  let params: GetOneWalletInput;
  let wallet: Wallet;

  beforeEach(() => {
    repository = new InMemoryWalletRepository();
    sut = new GetOneWallet(repository);
    params = {
      userId: 'ayJTyuIciOiJIUzI1NiJ9.eyJSb2xlIjoLiyRtaW4iLJJnk',
      walletId: 'iuh765fgiOiJIUzI1NiJ9.eyJSb2xlIjoLiyRtaW4ilokiujk',
    };
    wallet = Wallet.create({
      title: 'johndoe',
      user: 'ayJTyuIciOiJIUzI1NiJ9.eyJSb2xlIjoLiyRtaW4iLJJnk',
    }).value as Wallet;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to get one wallet from user', async () => {
    const walletOrUndefined: Wallet | undefined = Wallet.create({
      title: 'johndoe',
      user: 'ayJTyuIciOiJIUzI1NiJ9.eyJSb2xlIjoLiyRtaW4iLJJnk',
    }).value as Wallet;

    await repository.createWallet(wallet);

    jest
      .spyOn(repository, 'getOneWalletFromUser')
      .mockReturnValueOnce(Promise.resolve(walletOrUndefined));

    const response = await sut.execute(params);

    expect(response.isRight()).toBeTruthy();
  });

  it('Should return an error if wallet does not already registered', async () => {
    let walletOrUndefined: Wallet | undefined;

    jest
      .spyOn(repository, 'getOneWalletFromUser')
      .mockReturnValueOnce(Promise.resolve(walletOrUndefined));

    const response = await sut.execute(params);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toEqual(new NotExistingWalletError(wallet.user));
  });
});
