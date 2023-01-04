import { Controller } from '@/core/infra/controller';
import {
  badRequest,
  created,
  HttpResponse,
  notFound,
  ServerError,
} from '@/core/infra/http';
import { ValidatorProvider } from '@/infra/providers/models/validator-provider';

import { CreateTransaction } from '../usecases/transaction/create-transaction';

export type CreateTransactionControllerRequest = {
  walletId: string;
  userId: string;
  title: string;
  description: string;
  amount: number;
  flow: string;
  date: string;
  category: string;
  status: string;
};

export default class CreateTransactionController implements Controller {
  constructor(
    private readonly createTransaction: CreateTransaction,
    private readonly validator: ValidatorProvider,
  ) {}

  async handle(
    request: CreateTransactionControllerRequest,
  ): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request);
      if (error) return badRequest(error);

      const result = await this.createTransaction.execute(request);
      if (result.isLeft()) return notFound(result.value);

      return created();
    } catch (error) {
      return ServerError(error as Error);
    }
  }
}
