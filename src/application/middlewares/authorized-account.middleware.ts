import {
  badRequest,
  forbidden,
  HttpResponse,
  ok,
  ServerError,
} from '@/core/infra/http';
import { Middleware } from '@/core/infra/middleware';
import { ValidatorProvider } from '@/infra/providers/models/validator-provider';

import { AuthorizedAccount } from '../usecases/account/authorized-account';

export type AuthorizedAccountMiddlewareRequest = {
  accessToken: string;
};

export class AuthorizedAccountMiddleware implements Middleware {
  constructor(
    private readonly authorizedAccount: AuthorizedAccount,
    private readonly validator: ValidatorProvider,
  ) {}

  async handle(
    request: AuthorizedAccountMiddlewareRequest,
  ): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request);

      if (error) return badRequest(error);

      const result = await this.authorizedAccount.execute(request);

      if (result.isLeft()) return forbidden(result.value);

      return ok({ userId: result.value });
    } catch (error) {
      return ServerError(error as Error);
    }
  }
}
