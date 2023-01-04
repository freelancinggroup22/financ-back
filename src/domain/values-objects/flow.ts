import { Either, left, right } from '@/core/logic/either';

import { InvalidFlowError } from './errors/invalid-flow-error';

export class Flow {
  get value(): string {
    return this.flow;
  }

  private constructor(private readonly flow: string) {
    Object.freeze(this);
  }

  public static create(flow: string): Either<InvalidFlowError, Flow> {
    if (!flow || !this.validate(flow.trim())) {
      return left(new InvalidFlowError(flow));
    }

    return right(new Flow(flow));
  }

  static validate(flow: string | 'income' | 'outcome'): boolean {
    if (flow !== 'income' && flow !== 'outcome') {
      return false;
    }

    return true;
  }
}
