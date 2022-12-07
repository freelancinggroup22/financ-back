import {
  HttpResponse,
  badRequest,
  notFound,
  ServerError,
  ok,
} from '@/core/infra/http';
import { ValidatorProvider } from '@/infra/providers/models/validator-provider';

import { GetAllTransactions } from '../usecases/transaction/get-all-transactions';

export type GetAllTransactionsControllerRequest = {
  walletId: string;
  limit?: number;
};

export class GetAllTransactionsController {
  constructor(
    private readonly getAllTransactions: GetAllTransactions,
    private readonly validator: ValidatorProvider,
  ) {}

  async handle(
    request: GetAllTransactionsControllerRequest,
  ): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request);
      if (error) return badRequest(error);

      const result = await this.getAllTransactions.execute(request);
      if (result.isLeft()) return notFound(result.value);

      return ok(result);
    } catch (error) {
      return ServerError(error as Error);
    }
  }
}
