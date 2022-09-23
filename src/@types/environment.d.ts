declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FIREBASE_PROJECT_ID: string;
      FIREBASE_PRIVATE_KEY: string;
      FIREBASE_CLIENT_EMAIL: string;
      FIREBASE_CLIENT: string;
      FIREBASE_API_KEY: string;
      FIREBASE_AUTH_DOMAIN: string;
      FIREBASE_STORAGE: string;
      FIREBASE_MESSAGING_SENDER_ID: string;
      FIREBASE_ID: string;
      FIREBASE_MEASUREMENT_ID: string;
      PORT: number;
    }
  }
}
export {};
