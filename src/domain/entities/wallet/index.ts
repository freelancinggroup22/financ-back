import { Entity } from '@/core/domain/entity';
import { Either, left, right } from '@/core/logic/either';
import { Amount } from '@/domain/values-objects/amount';
import { InvalidAmountError } from '@/domain/values-objects/errors/invalid-amount-error';
import { InvalidTitleError } from '@/domain/values-objects/errors/invalid-title-error';
import { Title } from '@/domain/values-objects/title';

type WalletProps = {
  title: string;
  user: string;
  balance?: number;
  incomes?: number;
  outcomes?: number;
};

export type WalletErrors = InvalidTitleError | InvalidAmountError;

export class Wallet extends Entity<WalletProps> {
  get title(): string {
    return this.props.title;
  }

  get user(): string {
    return this.props.user;
  }

  get balance(): number {
    return this.props.balance ?? 0;
  }

  get incomes(): number {
    return this.props.incomes ?? 0;
  }

  get outcomes(): number {
    return this.props.outcomes ?? 0;
  }

  private constructor(props: WalletProps, id?: string) {
    super(props, id);
  }

  public static create(
    props: WalletProps,
    id?: string,
  ): Either<WalletErrors, Wallet> {
    const titleOrError = Title.create(props.title);
    if (titleOrError.isLeft()) return left(titleOrError.value);

    if (props.balance) {
      const balanceOrError = Amount.create(props.balance);
      if (balanceOrError.isLeft()) return left(balanceOrError.value);
    }

    if (props.incomes) {
      const incomesOrError = Amount.create(props.incomes);
      if (incomesOrError.isLeft()) return left(incomesOrError.value);
    }

    if (props.outcomes) {
      const outcomesOrError = Amount.create(props.outcomes);
      if (outcomesOrError.isLeft()) return left(outcomesOrError.value);
    }

    const wallet = new Wallet(props, id);

    return right(wallet);
  }
}
