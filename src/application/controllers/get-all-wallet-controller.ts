import { Controller } from '@/core/infra/controller';
import {
  badRequest,
  HttpResponse,
  notFound,
  ok,
  ServerError,
} from '@/core/infra/http';
import { ValidatorProvider } from '@/infra/providers/models/validator-provider';

import { GetAllWallets } from '../usecases/wallet/get-all-wallets';

export type GetAllWalletsControllerRequest = {
  userId: string;
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

      return ok(result);
    } catch (error) {
      return ServerError(error as Error);
    }
  }
}
