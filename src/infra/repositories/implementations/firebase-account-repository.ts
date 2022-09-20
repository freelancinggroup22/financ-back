import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';

import { AppFirestore, AuthFirebase } from '@/infra/database/firebase/connection';

import { AccountRepository } from '../models/account-repository';
import { AuthenticateRequestType, AuthenticateResponseType } from '../types/authenticate-type';
import { RegisterRequestType, RegisterResponseType } from '../types/register-type';

export class FirebaseAccountRepository implements AccountRepository {
  constructor(private readonly auth = AuthFirebase, private readonly firestore = AppFirestore) {}

  async register({ name, email, password }: RegisterRequestType): Promise<RegisterResponseType> {
    const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
    const { uid, photoURL, refreshToken } = user;

    await addDoc(collection(this.firestore, 'users'), {
      uid,
      email,
      photoURL,
      displayName: name,
    });

    return { uid, photoURL, displayName: name, accessToken: refreshToken };
  }

  async authenticate({
    email,
    password,
  }: AuthenticateRequestType): Promise<AuthenticateResponseType> {
    const { user } = await signInWithEmailAndPassword(this.auth, email, password);
    const { uid, refreshToken } = user;

    const querySnapshot = await getDocs(collection(this.firestore, 'users'));

    const data = {} as AuthenticateResponseType;

    querySnapshot.forEach((doc) => {
      if (doc.data().uid === uid) {
        Object.assign(data, { ...doc.data(), accessToken: refreshToken });
      }
    });

    return data;
  }

  async existsEmail(email: string): Promise<boolean> {
    const querySnapshot = await getDocs(collection(this.firestore, 'users'));
    let emailAlreadyExists = false;

    querySnapshot.forEach((doc) => {
      if (doc.data().email === email) {
        emailAlreadyExists = true;
      }
    });

    return emailAlreadyExists;
  }

  async existsAccount(id: string): Promise<boolean> {
    const querySnapshot = await getDocs(collection(this.firestore, 'users'));
    let accountAlreadyExists = false;

    querySnapshot.forEach((doc) => {
      if (doc.data().uid === id) {
        accountAlreadyExists = true;
      }
    });

    return accountAlreadyExists;
  }
}
