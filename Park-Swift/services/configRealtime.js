// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK68gmrAE-3J5hFR_UusEiDIet629SBfI",
  authDomain: "void-tech-fc970.firebaseapp.com",
  projectId: "void-tech-fc970",
  storageBucket: "void-tech-fc970.appspot.com",
  messagingSenderId: "955711910546",
  databaseURL: "https://void-tech-fc970-default-rtdb.firebaseio.com",
  appId: "1:955711910546:web:ea76ec1fedc2854cceac4b",
  measurementId: "G-N348WF2D14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app);

export { app, analytics, auth, database };