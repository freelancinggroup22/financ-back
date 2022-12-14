import { Controller } from '@/core/infra/controller';
import {
  badRequest,
  created,
  HttpResponse,
  notFound,
  ServerError,
} from '@/core/infra/http';
import { ValidatorProvider } from '@/infra/providers/models/validator-provider';

import { CreateWallet } from '../usecases/wallet/create-wallet';

export type CreateWalletControllerRequest = {
  title: string;
  userId: string;
};

export class CreateWalletController implements Controller {
  constructor(
    private readonly createWallet: CreateWallet,
    private readonly validator: ValidatorProvider,
  ) {}

  async handle(request: CreateWalletControllerRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request);
      if (error) return badRequest(error);

      const result = await this.createWallet.execute(request);
      if (result.isLeft()) return notFound(result.value);

      return created();
    } catch (error) {
      return ServerError(error as Error);
    }
  }
}
