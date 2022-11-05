import { signInWithEmailAndPassword } from 'firebase/auth';

import { AccountRepository } from '@/application/repositories/account-repository';
import { AuthenticateOutput } from '@/application/usecases/account/authenticate-account';
import { Account } from '@/domain/entities/account';

import { FirebaseConnection } from '../connection';

export class FirebaseAccountRepository implements AccountRepository {
  constructor(
    private readonly repo = FirebaseConnection().getRepo,
    private readonly auth = FirebaseConnection().getAuth,
  ) {}

  async create({ name, email, password }: Account): Promise<void> {
    await this.repo.createUser({
      displayName: name,
      email,
      password,
    });
  }

  async authenticate({
    email,
    password,
  }: Account): Promise<AuthenticateOutput> {
    const {
      // @ts-ignore
      user: { uid, displayName, refreshToken, accessToken },
    } = await signInWithEmailAndPassword(this.auth, email, password);

    return {
      uid,
      displayName,
      accessToken,
      refreshToken,
    };
  }

  async existsEmail(email: string): Promise<boolean> {
    const result = await this.repo
      .getUserByEmail(email)
      .then((success) => Boolean(success))
      .catch((error) => Boolean(!error));

    return result;
  }

  async existsId(id: string): Promise<boolean> {
    const result = await this.repo
      .getUser(id)
      .then((success) => Boolean(success))
      .catch((error) => Boolean(!error));

    return result;
  }

  async verifyToken(token: string): Promise<string> {
    const result = await this.repo.verifyIdToken(token, true);

    return result.uid;
  }
}
