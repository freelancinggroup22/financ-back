import { WalletRepository } from '@/application/repositories/wallet-repository';
import { Wallet } from '@/domain/entities/wallet';
import { InMemoryWalletRepository } from '@tests/mocks/repositories/in-memory-wallet-repository';

import { CreateWallet, CreateWalletInput } from './create-wallet';
import { ExistingWalletError } from './errors/existing-wallet';

describe('Create Wallet', () => {
  let repository: WalletRepository;
  let sut: CreateWallet;
  let params: CreateWalletInput;
  let wallet: Wallet;

  beforeEach(() => {
    repository = new InMemoryWalletRepository();
    sut = new CreateWallet(repository);
    params = {
      title: 'johndoe',
      user: 'ayJTyuIciOiJIUzI1NiJ9.eyJSb2xlIjoLiyRtaW4iLJJnk',
    };
    wallet = Wallet.create(params).value as Wallet;
  });

  it('Should be able to create an wallet', async () => {
    const response = await sut.execute(params);

    expect(response.isRight()).toBeTruthy();
  });

  it('Should return an error if received wallet is already registered', async () => {
    await repository.createWallet(wallet);
    const response = await sut.execute(params);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toEqual(new ExistingWalletError(wallet.title));
  });
});
