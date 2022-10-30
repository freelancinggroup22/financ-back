import { AccountRepository } from '@/application/repositories/account-repository';
import { Either, left, right } from '@/core/logic/either';

import { AccessDeniedError } from './errors/access-denied';

export type AuthorizedAccountInput = {
  accessToken: string;
};

export type AuthorizedAccountOutput = Either<AccessDeniedError, string>;

export class AuthorizedAccount {
  constructor(private readonly repository: AccountRepository) {}

  async execute({
    accessToken,
  }: AuthorizedAccountInput): Promise<AuthorizedAccountOutput> {
    if (!accessToken) return left(new AccessDeniedError(accessToken));

    const uid = await this.repository.verifyToken(accessToken);

    return right(uid);
  }
}
