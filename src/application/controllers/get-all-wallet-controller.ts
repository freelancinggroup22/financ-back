import { Controller } from '@/core/infra/controller';
import {
  badRequest,
  ok,
  fail,
  HttpResponse,
  notFound,
} from '@/core/infra/http';
import { ValidatorProvider } from '@/infra/providers/models/validator-provider';

import { GetAllWallets } from '../usecases/wallet/get-all-wallets';

export type GetAllWalletsControllerRequest = {
  user: string;
  limit?: number;
};

export class GetAllWalletsController implements Controller {
  constructor(
    private readonly getOneWallets: GetAllWallets,
    private readonly validator: ValidatorProvider,
  ) {}

  async handle(request: GetAllWalletsControllerRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request);
      if (error) return badRequest(error);

      const result = await this.getOneWallets.execute(request);
      if (result.isLeft()) return notFound(result.value);
      console.log('GetAllWalletsControllerRequest');

      return ok(result);
    } catch (error) {
      return fail(error as Error);
    }
  }
}
