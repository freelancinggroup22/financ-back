import { RegisterRequestType, RegisterResponseType } from '../types/register-type';

export interface AccountRepository {
  register(data: RegisterRequestType): Promise<RegisterResponseType>;
  existsEmail(email: string): Promise<boolean>;
}
