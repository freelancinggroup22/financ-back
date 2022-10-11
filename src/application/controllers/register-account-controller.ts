import { Controller } from '@/core/infra/controller';
import {
  badRequest,
  fail,
  HttpResponse,
  notFound,
  created,
} from '@/core/infra/http';
import { ValidatorProvider } from '@/infra/providers/models/validator-provider';

import { RegisterAccount } from '../usecases/account/register-account';

export type RegisterAccountControllerRequest = {
  name: string;
  email: string;
  password: string;
};

export class RegisterAccountController implements Controller {
  constructor(
    private readonly registerAccount: RegisterAccount,
    private readonly validator: ValidatorProvider,
  ) {}

  async handle(
    request: RegisterAccountControllerRequest,
  ): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request);
      if (error) return badRequest(error);

      const result = await this.registerAccount.execute(request);

      if (result.isLeft()) return notFound(result.value);

      return created();
    } catch (error) {
      return fail(error as Error);
    }
  }
}
