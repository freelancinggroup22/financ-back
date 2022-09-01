import { Maybe } from '@/core/logic/maybe';

export type RegisterRequestType = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponseType = {
  uid: string;
  photoURL: Maybe<string>;
  displayName: Maybe<string>;
  accessToken: string;
};
