import { Controller } from '@/core/infra/controller';
import {
  badRequest,
  HttpResponse,
  noContent,
  notFound,
  ServerError,
} from '@/core/infra/http';
import { ValidatorProvider } from '@/infra/providers/models/validator-provider';

import { GetOneTransaction } from '../usecases/transaction/get-one-transaction';

export type GetOneTransactionControllerRequest = {
  walletId: string;
  transactionId: string;
};

export class GetOneTransactionController implements Controller {
  constructor(
    private readonly getOneTransaction: GetOneTransaction,
    private readonly validator: ValidatorProvider,
  ) {}

  async handle(
    request: GetOneTransactionControllerRequest,
  ): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request);
      if (error) return badRequest(error);

      const result = await this.getOneTransaction.execute(request);
      if (result.isLeft()) return notFound(result.value);

      return noContent();
    } catch (error) {
      return ServerError(error as Error);
    }
  }
}
