import {
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_STORAGE,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_ID,
} from './config';

export const firebaseConfig = {
  admin: {
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    projectId: FIREBASE_PROJECT_ID,
  },
  app: {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
    appId: FIREBASE_ID,
  },
};
