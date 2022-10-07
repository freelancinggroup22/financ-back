import { InvalidTitleError } from './errors/invalid-title-error';
import { Title } from './title';

describe('Title value object', () => {
  it('Should create a title on success', () => {
    expect(Title.create('Test Title').isRight()).toBeTruthy();
  });

  it('Should reject if try to create an invalid title', () => {
    expect(Title.create(''.repeat(300)).isLeft()).toBeTruthy();
    expect(Title.create('').isLeft()).toBeTruthy();
    expect(Title.create('S').isLeft()).toBeTruthy();
    expect(Title.create('  TS').isLeft()).toBeTruthy();
    expect(Title.create('Test Title'.repeat(300)).isLeft()).toBeTruthy();
    expect(Title.create('Test]n§=¨5¨# Titleºª').isLeft()).toBeTruthy();
    expect(Title.create('TS'.repeat(300)).isLeft()).toBeTruthy();
    expect(Title.create('TS'.repeat(300)).value).toBeInstanceOf(
      InvalidTitleError,
    );
  });
});
