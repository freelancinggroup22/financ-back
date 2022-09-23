import { Email } from './email';
import { InvalidEmailError } from './errors/invalid-email-error';

describe('Email value object', () => {
  it('Should be able create an email on success', () => {
    expect(Email.create('email@example.com').isRight()).toBeTruthy();
  });

  it('Should reject if try to create an invalid email', () => {
    expect(Email.create('').isLeft()).toBeTruthy();
    expect(Email.create('emailexample.com').isLeft()).toBeTruthy();
    expect(Email.create('emailexamplecom').isLeft()).toBeTruthy();
    expect(Email.create('emailexample.').isLeft()).toBeTruthy();
    expect(Email.create('@example.com').isLeft()).toBeTruthy();
  });

  it('Should reject if trying to create invalid email with too many characters', () => {
    expect(
      Email.create(`${'e'.repeat(256)}@example.com`).isLeft(),
    ).toBeTruthy();
    expect(Email.create(`${'e'.repeat(66)}@example.com`).isLeft()).toBeTruthy();
    expect(Email.create(`email@${'e'.repeat(66)}.com`).isLeft()).toBeTruthy();
    expect(Email.create(`${'e'.repeat(256)}`).value).toBeInstanceOf(
      InvalidEmailError,
    );
  });
});
