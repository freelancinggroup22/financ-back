import { AccountRepository } from '@/application/repositories/account-repository';
import { AuthenticateOutput } from '@/application/usecases/account/authenticate-account';
import { AsyncMaybe } from '@/core/logic/maybe';
import { Account } from '@/domain/entities/account';

export class InMemoryAccountRepository implements AccountRepository {
  constructor(private rows: Account[] = []) {}

  async create(data: Account): Promise<void> {
    this.rows.push(data);
  }

  async authenticate(data: Account): Promise<AuthenticateOutput> {
    const result = (await this.rows.find(
      (row) => row.email === data.email && row.password === data.password,
    )) as Account;

    return {
      uid: result.id,
      displayName: result.name,
      accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc',
      refreshToken: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc',
    };
  }

  async existsEmail(email: string): Promise<boolean> {
    return this.rows.some((row) => row.email === email);
  }

  async findByEmail(email: string): AsyncMaybe<Account> {
    return this.rows.find((row) => row.email === email);
  }

  async existsId(id: string): Promise<boolean> {
    return this.rows.some((row) => row.id === id);
  }

  async findById(id: string): AsyncMaybe<Account> {
    return this.rows.find((row) => row.id === id);
  }

  async verifyToken(token: string): Promise<string> {
    const uid = '1234565789';
    return uid;
  }
}
