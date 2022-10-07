import { Description } from './description';
import { InvalidDescriptionError } from './errors/invalid-description-error';

describe('Title value object', () => {
  it('Should create a description on success', () => {
    expect(Description.create('Test description').isRight()).toBeTruthy();
  });

  it('Should reject if try to create an invalid description', () => {
    expect(Description.create(''.repeat(300)).isLeft()).toBeTruthy();
    expect(Description.create('').isLeft()).toBeTruthy();
    expect(Description.create('S').isLeft()).toBeTruthy();
    expect(Description.create('  TS').isLeft()).toBeTruthy();
    expect(
      Description.create('Test description'.repeat(300)).isLeft(),
    ).toBeTruthy();
    expect(
      Description.create('Test]n§=¨5¨# Descriptionºª').isLeft(),
    ).toBeTruthy();
    expect(Description.create('TS'.repeat(300)).isLeft()).toBeTruthy();
    expect(Description.create('TS'.repeat(300)).value).toBeInstanceOf(
      InvalidDescriptionError,
    );
  });
});
