import { Maybe } from '@/core/logic/maybe';

export type AuthenticateRequestType = {
  email: string;
  password: string;
};

export type AuthenticateResponseType = {
  uid: string;
  photoURL: Maybe<string>;
  displayName: Maybe<string>;
  accessToken: string;
};
