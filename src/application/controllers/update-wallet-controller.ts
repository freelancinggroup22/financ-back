import { Controller } from '@/core/infra/controller';
import { badRequest, HttpResponse, notFound, ok } from '@/core/infra/http';
import { ValidatorProvider } from '@/infra/providers/models/validator-provider';

import { UpdateWallet } from '../usecases/wallet/update-wallet';

export type UpdateWalletControllerRequest = {
  title: string;
  userId: string;
  walletId: string;
};

export class UpdateWalletController implements Controller {
  constructor(
    private readonly updateWallet: UpdateWallet,
    private readonly validator: ValidatorProvider,
  ) {}

  async handle(request: UpdateWalletControllerRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request);
      if (error) return badRequest(error);

      const result = await this.updateWallet.execute(request);
      if (result.isLeft()) return notFound(result.value);

      return ok(result);
    } catch (error) {
      return fail(error as Error);
    }
  }
}
