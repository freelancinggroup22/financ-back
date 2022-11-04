import { InvalidAmountError } from '@/domain/values-objects/errors/invalid-amount-error';
import { InvalidTitleError } from '@/domain/values-objects/errors/invalid-title-error';

import { Wallet } from './';

describe('Wallet Entity', () => {
  it('Should create an wallet on success if receive all values valid', () => {
    const data = {
      title: 'Wallet John Doe',
      user: '12345yt67u',
    };

    const response = Wallet.create(data);

    expect(response.isRight).toBeTruthy();
  });

  it('Should reject wallet creation if receive title invalid value', () => {
    const data = {
      title: 'Test Test Wallet John Doe',
      user: '12345yt67u',
    };

    const response = Wallet.create(data);
    expect(response.isLeft).toBeTruthy();
    expect(response.value).toBeInstanceOf(InvalidTitleError);
  });

  it('Should reject wallet creation if receive balance invalid value', () => {
    const data = {
      title: 'Tesy Wallet John Doe',
      user: '12345yt67u',
      balance: '1',
    };

    const response = Wallet.create(data as any);
    expect(response.isLeft).toBeTruthy();
    expect(response.value).toBeInstanceOf(InvalidAmountError);
  });
});
