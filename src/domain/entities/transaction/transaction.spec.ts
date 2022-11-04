import { InvalidAmountError } from '@/domain/values-objects/errors/invalid-amount-error';
import { InvalidCategoryError } from '@/domain/values-objects/errors/invalid-category-error';
import { InvalidDescriptionError } from '@/domain/values-objects/errors/invalid-description-error';
import { InvalidFlowError } from '@/domain/values-objects/errors/invalid-flow-error';
import { InvalidStatusError } from '@/domain/values-objects/errors/invalid-status-error';
import { InvalidTitleError } from '@/domain/values-objects/errors/invalid-title-error';

import { Transaction } from './inde';

describe('Wallet Entity', () => {
  it('Should create an wallet on success if receive all values valid', () => {
    const mockTransaction = {
      title: 'Wallet',
      description: 'Wallet John Doe',
      wallet: '12345yt67u',
      amount: 1,
      flow: 'income',
      date: new Date().toISOString() as Date | string,
      category: 'Test Like',
      status: 'pending',
    };

    const response = Transaction.create(mockTransaction as any);
    expect(response.isRight).toBeTruthy();
  });

  it('Should reject wallet creation if receive title invalid value', () => {
    const mockTransaction = {
      title: 'Wallet',
      description: 'Wallet John Doe',
      wallet: '12345yt67u',
      amount: 1 as string | number,
      flow: 'income',
      date: new Date().toISOString() as Date | string,
      category: 'Test Like' as string | number,
      status: 'pending',
    };

    mockTransaction.title = 'w';

    const response = Transaction.create(mockTransaction as any);
    expect(response.isLeft).toBeTruthy();
    expect(response.value).toBeInstanceOf(InvalidTitleError);
  });

  it('Should reject wallet creation if receive description invalid value', () => {
    const mockTransaction = {
      title: 'Wallet',
      description: 'Wallet John Doe',
      wallet: '12345yt67u',
      amount: 1,
      flow: 'income',
      date: new Date().toISOString() as Date | string,
      category: 'Test Like',
      status: 'pending',
    };

    mockTransaction.description = 'w';

    const response = Transaction.create(mockTransaction as any);
    expect(response.isLeft).toBeTruthy();
    expect(response.value).toBeInstanceOf(InvalidDescriptionError);
  });

  it('Should reject wallet creation if receive amount invalid value', () => {
    const mockTransaction = {
      title: 'Wallet',
      description: 'Wallet John Doe',
      wallet: '12345yt67u',
      amount: 1 as string | number,
      flow: 'income',
      date: new Date().toISOString() as Date | string,
      category: 'Test Like',
      status: 'pending',
    };

    mockTransaction.amount = 'w';

    const response = Transaction.create(mockTransaction as any);
    expect(response.isLeft).toBeTruthy();
    expect(response.value).toBeInstanceOf(InvalidAmountError);
  });

  it('Should reject wallet creation if receive flow invalid value', () => {
    const mockTransaction = {
      title: 'Wallet',
      description: 'Wallet John Doe',
      wallet: '12345yt67u',
      amount: 1,
      flow: 'income',
      date: new Date().toISOString() as Date | string,
      category: 'Test Like',
      status: 'pending',
    };

    mockTransaction.flow = 'teste';

    const response = Transaction.create(mockTransaction as any);
    expect(response.isLeft).toBeTruthy();
    expect(response.value).toBeInstanceOf(InvalidFlowError);
  });

  it('Should reject wallet creation if receive category invalid value', () => {
    const mockTransaction = {
      title: 'Wallet',
      description: 'Wallet John Doe',
      wallet: '12345yt67u',
      amount: 1,
      flow: 'income',
      date: new Date().toISOString() as Date | string,
      category: 'Test Like' as string | number,
      status: 'pending',
    };

    mockTransaction.category = 0;

    const response = Transaction.create(mockTransaction as any);
    expect(response.isLeft).toBeTruthy();
    expect(response.value).toBeInstanceOf(InvalidCategoryError);
  });

  it('Should reject wallet creation if receive status invalid value', () => {
    const mockTransaction = {
      title: 'Wallet',
      description: 'Wallet John Doe',
      wallet: '12345yt67u',
      amount: 1,
      flow: 'income',
      date: new Date().toISOString() as Date | string,
      category: 'Test Like',
      status: 'pending',
    };

    mockTransaction.status = 'teste';

    const response = Transaction.create(mockTransaction as any);
    expect(response.isLeft).toBeTruthy();
    expect(response.value).toBeInstanceOf(InvalidStatusError);
  });
});
