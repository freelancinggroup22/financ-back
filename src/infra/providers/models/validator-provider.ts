import { Maybe } from '@/core/logic/maybe';

export interface ValidatorProvider {
  validate(input: any): Maybe<Error>;
}
