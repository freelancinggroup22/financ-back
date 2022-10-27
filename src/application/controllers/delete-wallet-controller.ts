import { Controller } from '@/core/infra/controller';
import {
  badRequest,
  HttpResponse,
  noContent,
  notFound,
} from '@/core/infra/http';
import { ValidatorProvider } from '@/infra/providers/models/validator-provider';

import { DeleteWallet } from '../usecases/wallet/delete-wallet';

export type DeleteWalletControllerRequest = {
  userId: string;
  walletId: string;
};

export class DeleteWalletController implements Controller {
  constructor(
    private readonly deleteWallet: DeleteWallet,
    private readonly validator: ValidatorProvider,
  ) {}

  async handle(request: DeleteWalletControllerRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request);
      if (error) return badRequest(error);

      const result = await this.deleteWallet.execute(request);
      if (result.isLeft()) return notFound(result.value);

      return noContent();
    } catch (error) {
      return fail(error as Error);
    }
  }
}
