import { Amount } from './amount';
import { InvalidAmountError } from './errors/invalid-amount-error';

describe('Title value object', () => {
  it('Should create a amount on success', () => {
    expect(Amount.create(1000).isRight()).toBeTruthy();
  });

  it('Should reject if try to create an invalid amount', () => {
    expect(Amount.create('1' as any).isLeft()).toBeTruthy();
    expect(Amount.create(Number('S')).isLeft()).toBeTruthy();
    expect(Amount.create(Number('')).isLeft()).toBeTruthy();
    expect(Amount.create(Number('')).value).toBeInstanceOf(InvalidAmountError);
  });
});
