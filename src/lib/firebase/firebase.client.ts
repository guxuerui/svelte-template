import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, setPersistence, inMemoryPersistence } from 'firebase/auth';

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID
};

let firebaseAPP;

if (!getApps().length) {
  firebaseAPP = initializeApp(firebaseConfig);
} else {
  firebaseAPP = getApp();
  deleteApp(firebaseAPP)
  firebaseAPP = initializeApp(firebaseConfig);
}

export const auth = getAuth(firebaseAPP);
