import { Controller } from '@/core/infra/controller';
import { badRequest, HttpResponse, notFound, ok } from '@/core/infra/http';
import { ValidatorProvider } from '@/infra/providers/models/validator-provider';

import { AuthenticateAccount } from '../usecases/authenticate-account';

export type AuthenticateAccountControllerControllerRequest = {
  email: string;
  password: string;
};

export class AuthenticateAccountController implements Controller {
  constructor(
    private readonly authenticateAccount: AuthenticateAccount,
    private readonly validator: ValidatorProvider,
  ) {}

  async handle(request: AuthenticateAccountControllerControllerRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request);
      if (error) return badRequest(error);

      const result = await this.authenticateAccount.execute(request);

      if (result.isLeft()) return notFound(result.value);

      return ok(result);
    } catch (error) {
      return fail(error as Error);
    }
  }
}
