import * as firebaseAdmin from 'firebase-admin';
import * as firebaseApp from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { firebaseConfig } from '@/infra/config/firebase-config';

export const FirebaseConnection = () => {
  const connectionAdmin = !firebaseAdmin.apps.length
    ? firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(firebaseConfig.admin),
      })
    : firebaseAdmin.app();

  const getApp = () => firebaseApp.initializeApp(firebaseConfig.app);
  const getRepo = () => connectionAdmin.auth();
  const getFirestore = () => connectionAdmin.firestore();

  return {
    getApp: getApp(),
    getAuth: getAuth(getApp()),
    getRepo: getRepo(),
    getFirestore: getFirestore(),
  };
};
