import { Account } from '@/domain/entities/account/account';

import { AuthenticateOutput } from '../usecases/account/authenticate-account';

export interface AccountRepository {
  create(data: Account): Promise<void>;
  authenticate(data: Account): Promise<AuthenticateOutput>;
  existsEmail(email: string): Promise<boolean>;
}