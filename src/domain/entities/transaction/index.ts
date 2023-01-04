import { Entity } from '@/core/domain/entity';
import { Either, left, right } from '@/core/logic/either';
import { Amount } from '@/domain/values-objects/amount';
import { Category } from '@/domain/values-objects/category';
import { Description } from '@/domain/values-objects/description';
import { InvalidAmountError } from '@/domain/values-objects/errors/invalid-amount-error';
import { InvalidCategoryError } from '@/domain/values-objects/errors/invalid-category-error';
import { InvalidDescriptionError } from '@/domain/values-objects/errors/invalid-description-error';
import { InvalidFlowError } from '@/domain/values-objects/errors/invalid-flow-error';
import { InvalidStatusError } from '@/domain/values-objects/errors/invalid-status-error';
import { InvalidTitleError } from '@/domain/values-objects/errors/invalid-title-error';
import { Flow } from '@/domain/values-objects/flow';
import { Status } from '@/domain/values-objects/status';
import { Title } from '@/domain/values-objects/title';

type TransactionProps = {
  title: string;
  description: string;
  wallet?: string;
  amount: number;
  flow: string;
  date: number;
  category: string;
  status: string;
};

export type TransactionErrors =
  | InvalidTitleError
  | InvalidDescriptionError
  | InvalidAmountError
  | InvalidFlowError
  | InvalidCategoryError
  | InvalidStatusError;

export class Transaction extends Entity<TransactionProps> {
  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get wallet(): string | undefined {
    return this.props.wallet;
  }

  get amount(): number {
    return this.props.amount;
  }

  get flow(): string {
    return this.props.flow;
  }

  get date(): number {
    return this.props.date;
  }

  get category(): string {
    return this.props.category;
  }

  get status(): string {
    return this.props.status;
  }

  private constructor(props: TransactionProps, id?: string) {
    super(props, id);
  }

  public static create(
    props: TransactionProps,
    id?: string,
  ): Either<TransactionErrors, Transaction> {
    const titleOrError = Title.create(props.title);
    if (titleOrError.isLeft()) return left(titleOrError.value);

    const descriptionOrError = Description.create(props.description);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);

    const amountOrError = Amount.create(props.amount);
    if (amountOrError.isLeft()) return left(amountOrError.value);

    const flowOrError = Flow.create(props.flow);
    if (flowOrError.isLeft()) return left(flowOrError.value);

    const categoryOrError = Category.create(props.category);
    if (categoryOrError.isLeft()) return left(categoryOrError.value);

    const statusOrError = Status.create(props.status);
    if (statusOrError.isLeft()) return left(statusOrError.value);

    const wallet = new Transaction(props, id);

    return right(wallet);
  }
}
