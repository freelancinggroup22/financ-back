import { Controller } from '@/core/infra/controller';
import {
  badRequest,
  fail,
  HttpResponse,
  notFound,
  created,
} from '@/core/infra/http';
import { ValidatorProvider } from '@/infra/providers/models/validator-provider';

import { CreateWallet } from '../usecases/wallet/create-wallet';

export type CreateWalletControllerRequest = {
  title: string;
  user: string;
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
      return fail(error as Error);
    }
  }
}
