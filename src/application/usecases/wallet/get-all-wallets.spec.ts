import { WalletRepository } from '@/application/repositories/wallet-repository';
import { Wallet } from '@/domain/entities/wallet';
import { InMemoryWalletRepository } from '@tests/mocks/repositories/in-memory-wallet-repository';

import { GetAllWallets, GetAllWalletInput } from './get-all-wallets';

describe('Get All Wallets', () => {
  let repository: WalletRepository;
  let sut: GetAllWallets;
  let params: GetAllWalletInput;
  let wallet: Wallet;

  beforeEach(() => {
    repository = new InMemoryWalletRepository();
    sut = new GetAllWallets(repository);
    params = {
      user: 'ayJTyuIciOiJIUzI1NiJ9.eyJSb2xlIjoLiyRtaW4iLJJnk',
      limit: 10,
    };
    wallet = Wallet.create({
      title: 'johndoe',
      user: 'ayJTyuIciOiJIUzI1NiJ9.eyJSb2xlIjoLiyRtaW4iLJJnk',
    }).value as Wallet;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to get all wallets from user', async () => {
    await repository.createWallet(wallet);
    jest
      .spyOn(repository, 'getAllWalletsFromUser')
      .mockReturnValue(Promise.resolve([{ title: '' }] as Wallet[]));

    const response = await sut.execute(params);

    expect(response.isRight()).toBeTruthy();
  });
});
