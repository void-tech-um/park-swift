import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCg1-48Clnq5ut9XVrR9crKGAGSsCvEuXw",
  authDomain: "parkswift2-d3759.firebaseapp.com",
  projectId: "parkswift2-d3759",
  storageBucket: "parkswift2-d3759.appspot.com",
  messagingSenderId: "605780498133",
  appId: "1:605780498133:web:0ecea016a7c14dc746f45c",
  measurementId: "G-TP9DN6CH31"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getFirestore(app);

export { app, analytics, auth, database };
