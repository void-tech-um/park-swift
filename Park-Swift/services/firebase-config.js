import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAVj53OwAL19Ky5kcRl5nRdhI6ImNgk_h0",
  authDomain: "park-swift-3c0f1.firebaseapp.com",
  databaseURL: "https://park-swift-3c0f1-default-rtdb.firebaseio.com",
  projectId: "park-swift-3c0f1",
  storageBucket: "park-swift-3c0f1.appspot.com",
  messagingSenderId: "750660951168",
  appId: "1:750660951168:web:77b7b2738d48406f78da65",
  measurementId: "G-FKFJS57VM0"
};

// Initialize Firebase App with Configurations
firebase.initializeApp(config);

export { firebase };

  
  
// // Import the functions you need from the SDKs you need
// import * as firebase from "firebase/app";
// import '@firebase/auth';
// import '@firebase/firestore';

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAVj53OwAL19Ky5kcRl5nRdhI6ImNgk_h0",
//   authDomain: "park-swift-3c0f1.firebaseapp.com",
//   databaseURL: "https://park-swift-3c0f1-default-rtdb.firebaseio.com",
//   projectId: "park-swift-3c0f1",
//   storageBucket: "park-swift-3c0f1.appspot.com",
//   messagingSenderId: "750660951168",
//   appId: "1:750660951168:web:77b7b2738d48406f78da65",
//   measurementId: "G-FKFJS57VM0"
// };

// // Initialize Firebase
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

// // const db = firebaseApp.firestore();

// // const auth = firebase.auth();

// // const provider = new firebase.auth.GoogleAuthProvider();

// export { firebase };