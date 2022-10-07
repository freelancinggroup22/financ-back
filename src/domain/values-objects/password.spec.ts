import { InvalidPasswordError } from './errors/invalid-password-error';
import { Password } from './password';

describe('Password value object', () => {
  it('Should create an password on success', () => {
    expect(Password.create('my_senha_2000').isRight()).toBeTruthy();
  });

  it('Should reject if try to create an invalid password', () => {});
  expect(Password.create('').isLeft()).toBeTruthy();
  expect(Password.create('p').isLeft()).toBeTruthy();
  expect(Password.create('  p').isLeft()).toBeTruthy();
  expect(Password.create(`${'p'.repeat(300)}`).isLeft()).toBeTruthy();
  expect(Password.create(`${'p'.repeat(300)}`).value).toBeInstanceOf(
    InvalidPasswordError,
  );
});
