import { Either, left, right } from '@/core/logic/either';

import { InvalidCategoryError } from './errors/invalid-category-error';

export class Category {
  get value(): string {
    return this.category;
  }

  private constructor(private readonly category: string) {
    Object.freeze(this);
  }

  public static create(
    category: string,
  ): Either<InvalidCategoryError, Category> {
    if (!category || !this.validate(category.trim())) {
      return left(new InvalidCategoryError(category));
    }

    return right(new Category(category));
  }

  static validate(category: string): boolean {
    const pattern = /^[a-z '-]+$/i;

    if (
      category.length > 15 ||
      category.length < 5 ||
      !pattern.test(category)
    ) {
      return false;
    }

    return true;
  }
}
