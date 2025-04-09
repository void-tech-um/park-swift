// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth, initializeAuth, getReactNativePersistence} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCg1-48Clnq5ut9XVrR9crKGAGSsCvEuXw",
  authDomain: "parkswift2-d3759.firebaseapp.com",
  projectId: "parkswift2-d3759",
  storageBucket: "parkswift2-d3759.appspot.com",
  messagingSenderId: "605780498133",
  appId: "1:605780498133:web:0ecea016a7c14dc746f45c",
  measurementId: "G-TP9DN6CH31",
};

// Use a module-scoped flag to make sure initializeAuth is only called once
let auth;

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

// Firebase app reference
const app = getApp();

// React Native Auth must be initialized manually
// Use this ONLY if auth hasn't already been initialized (no official check, so we assume a singleton file)
auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Firestore
const database = getFirestore(app);

// Analytics (optional)
let analytics;
isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});

export { app, auth, database, analytics };

