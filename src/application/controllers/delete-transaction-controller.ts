import {
  badRequest,
  HttpResponse,
  noContent,
  notFound,
  ServerError,
} from '@/core/infra/http';
import { ValidatorProvider } from '@/infra/providers/models/validator-provider';

import { DeleteTransaction } from '../usecases/transaction/delete-transaction';

export type DeleteTransactionControllerRequest = {
  walletId: string;
  transactionId: string;
};

export default class DeleteTransactionController {
  constructor(
    private readonly deleteTransaction: DeleteTransaction,
    private readonly validator: ValidatorProvider,
  ) {}

  async handle(
    request: DeleteTransactionControllerRequest,
  ): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request);
      if (error) return badRequest(error);

      const result = await this.deleteTransaction.execute(request);
      if (result.isLeft()) return notFound(result.value);

      return noContent();
    } catch (error) {
      return ServerError(error as Error);
    }
  }
}
