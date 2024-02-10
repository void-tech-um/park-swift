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

// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// const config = {
//   apiKey: "AIzaSyAK68gmrAE-3J5hFR_UusEiDIet629SBfI",
//   authDomain: "void-tech-fc970.firebaseapp.com",
//   databaseURL: "https://void-tech-fc970-default-rtdb.firebaseio.com",
//   projectId: "void-tech-fc970",
//   storageBucket: "void-tech-fc970.appspot.com",
//   messagingSenderId: "750660951168",
//   appId: "1:955711910546:android:d0d06ea6325c2a0eceac4b",
//   // measurementId: "G-FKFJS57VM0"
// };

// // Initialize Firebase App with Configurations
// const app = initializeApp(config);
// const firestore = getFirestore(app);

// export { app, firestore };
  
// // // Import the functions you need from the SDKs you need
// // import * as firebase from "firebase/app";
// // import '@firebase/auth';
// // import '@firebase/firestore';

// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: "AIzaSyAVj53OwAL19Ky5kcRl5nRdhI6ImNgk_h0",
// //   authDomain: "park-swift-3c0f1.firebaseapp.com",
// //   databaseURL: "https://park-swift-3c0f1-default-rtdb.firebaseio.com",
// //   projectId: "park-swift-3c0f1",
// //   storageBucket: "park-swift-3c0f1.appspot.com",
// //   messagingSenderId: "750660951168",
// //   appId: "1:750660951168:web:77b7b2738d48406f78da65",
// //   measurementId: "G-FKFJS57VM0"
// // };

// // // Initialize Firebase
// // if (!firebase.apps.length) {
// //     firebase.initializeApp(firebaseConfig);
// // }

// // // const db = firebaseApp.firestore();

// // // const auth = firebase.auth();

// // // const provider = new firebase.auth.GoogleAuthProvider();

// // export { firebase };