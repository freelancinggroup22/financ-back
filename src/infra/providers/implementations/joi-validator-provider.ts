import Joi from 'joi';

import { Maybe } from '@/core/logic/maybe';

import { ValidatorProvider } from '../models/validator-provider';

export class JoiValidatorProvider implements ValidatorProvider {
  constructor(private readonly schema: Joi.Schema) {}

  validate(input: any): Maybe<Error> {
    return this.schema.validate(input, { stripUnknown: true }).error;
  }
}
