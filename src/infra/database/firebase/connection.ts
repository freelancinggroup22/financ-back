import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from '@/infra/config/firebase';

export const AppFirebase = initializeApp(firebaseConfig);
export const AuthFirebase = getAuth();
export const AppFirestore = getFirestore(AppFirebase);
