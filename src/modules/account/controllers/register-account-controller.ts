import { Controller } from '@/core/infra/controller';
import { badRequest, HttpResponse, notFound, ok } from '@/core/infra/http';
import { ValidatorProvider } from '@/infra/providers/models/validator-provider';

import { RegisterAccount } from '../usecases/register-account';

export type RegisterAccountControllerControllerRequest = {
  name: string;
  email: string;
  password: string;
};

export class RegisterAccountController implements Controller {
  constructor(
    private readonly registerAccount: RegisterAccount,
    private readonly validator: ValidatorProvider,
  ) {}

  async handle(request: RegisterAccountControllerControllerRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request);
      if (error) return badRequest(error);

      const result = await this.registerAccount.execute(request);
      console.log(result.isLeft() && notFound(result.value));

      if (result.isLeft()) return notFound(result.value);

      return ok(result);
    } catch (error) {
      return fail(error as Error);
    }
  }
}
