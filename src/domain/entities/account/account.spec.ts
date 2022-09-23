import { Account } from './account';
import { InvalidEmailError } from './values-objects/errors/invalid-email-error';

describe('Account Entity', () => {
  it('Should create an account on success if receive all values valid', () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'secret_pass',
    };

    const response = Account.create(data);

    expect(response.isRight).toBeTruthy();
  });

  it('Should reject account creation if receive some invalid value', () => {
    const data = {
      name: 'Test Silva',
      email: 'johndoemailcom',
      password: 'my_senha_2000',
    };

    const response = Account.create(data);
    expect(response.isLeft).toBeTruthy();
    expect(response.value).toBeInstanceOf(InvalidEmailError);
  });
});
