import { Category } from './category';
import { InvalidCategoryError } from './errors/invalid-category-error';

describe('Title value object', () => {
  it('Should create a category on success', () => {
    expect(Category.create('Test category').isRight()).toBeTruthy();
  });

  it('Should reject if try to create an invalid category', () => {
    expect(Category.create(''.repeat(300)).isLeft()).toBeTruthy();
    expect(Category.create('').isLeft()).toBeTruthy();
    expect(Category.create('S').isLeft()).toBeTruthy();
    expect(Category.create('  TS').isLeft()).toBeTruthy();
    expect(Category.create('Test category'.repeat(300)).isLeft()).toBeTruthy();
    expect(Category.create('Test]n§=¨5¨# categoryºª').isLeft()).toBeTruthy();
    expect(Category.create('TS'.repeat(300)).isLeft()).toBeTruthy();
    expect(Category.create('TS'.repeat(300)).value).toBeInstanceOf(
      InvalidCategoryError,
    );
  });
});
