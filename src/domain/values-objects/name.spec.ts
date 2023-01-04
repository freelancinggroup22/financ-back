import { InvalidNameError } from './errors/invalid-name-error';
import { Name } from './name';

describe('Name value object', () => {
  it('Should create an name on success', () => {
    expect(Name.create('Test Silva').isRight()).toBeTruthy();
  });

  it('Should reject if try to create an invalid name', () => {
    expect(Name.create(''.repeat(300)).isLeft()).toBeTruthy();
    expect(Name.create('Test Silva'.repeat(300)).isLeft()).toBeTruthy();
    expect(Name.create('Test]n§=¨5¨# Silvaºª').isLeft()).toBeTruthy();
    expect(Name.create('TS'.repeat(300)).isLeft()).toBeTruthy();
    expect(Name.create('  TS').isLeft()).toBeTruthy();
    expect(Name.create('S').isLeft()).toBeTruthy();
    expect(Name.create('TS'.repeat(300)).value).toBeInstanceOf(
      InvalidNameError,
    );
  });
});
