import { AuthenticateRequestType, AuthenticateResponseType } from '../types/authenticate-type';
import { RegisterRequestType, RegisterResponseType } from '../types/register-type';

export interface AccountRepository {
  register(data: RegisterRequestType): Promise<RegisterResponseType>;
  authenticate(data: AuthenticateRequestType): Promise<AuthenticateResponseType>;
  existsEmail(email: string): Promise<boolean>;
  existsAccount(id: string): Promise<boolean>;
}
