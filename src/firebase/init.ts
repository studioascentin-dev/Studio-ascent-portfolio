
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// This structure ensures that we have typed return values.
interface FirebaseServices {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
}

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase(): FirebaseServices {
  if (getApps().length === 0) {
    // When running in a serverless environment like App Hosting,
    // the Firebase-provided environment variables will be used for initialization.
    // In a local environment, the firebaseConfig object will be used.
    const app = initializeApp(firebaseConfig);
    return {
      firebaseApp: app,
      auth: getAuth(app),
      firestore: getFirestore(app),
      storage: getStorage(app),
    };
  } else {
    // If the app is already initialized, return the existing instances.
    const app = getApp();
    return {
      firebaseApp: app,
      auth: getAuth(app),
      firestore: getFirestore(app),
      storage: getStorage(app),
    };
  }
}
