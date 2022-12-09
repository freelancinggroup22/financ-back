import {
  badRequest,
  HttpResponse,
  noContent,
  notFound,
  ServerError,
} from '@/core/infra/http';
import { ValidatorProvider } from '@/infra/providers/models/validator-provider';

import { UpdateTransaction } from '../usecases/transaction/update-transaction';

export type UpdateTransactionControllerRequest = {
  walletId: string;
  transactionId: string;
  title?: string;
  description?: string;
  amount?: number;
  flow?: string;
  date?: number;
  category?: string;
  status?: string;
};

export default class UpdateTransactionController {
  constructor(
    private readonly updateTransaction: UpdateTransaction,
    private readonly validator: ValidatorProvider,
  ) {}

  async handle(
    request: UpdateTransactionControllerRequest,
  ): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request);
      if (error) return badRequest(error);

      const result = await this.updateTransaction.execute(request);
      if (result.isLeft()) return notFound(result.value);

      return noContent();
    } catch (error) {
      return ServerError(error as Error);
    }
  }
}
