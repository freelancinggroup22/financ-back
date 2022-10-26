import { Controller } from '@/core/infra/controller';
import {
  badRequest,
  ok,
  fail,
  HttpResponse,
  notFound,
} from '@/core/infra/http';
import { ValidatorProvider } from '@/infra/providers/models/validator-provider';

import { GetOneWallet } from '../usecases/wallet/get-one-wallet';

export type GetOneWalletControllerRequest = {
  user: string;
  walletId: string;
};

export class GetOneWalletController implements Controller {
  constructor(
    private readonly getOneWallet: GetOneWallet,
    private readonly validator: ValidatorProvider,
  ) {}

  async handle(request: GetOneWalletControllerRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request);
      if (error) return badRequest(error);

      const result = await this.getOneWallet.execute(request);
      if (result.isLeft()) return notFound(result.value);

      return ok(result);
    } catch (error) {
      return fail(error as Error);
    }
  }
}