// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZyD6di1SG2MjuJgWl6-721KDx7ijE8T0",
  authDomain: "chatapp-1f2bf.firebaseapp.com",
  projectId: "chatapp-1f2bf",
  storageBucket: "chatapp-1f2bf.appspot.com",
  messagingSenderId: "776421343937",
  appId: "1:776421343937:web:02e62074e994aacbe40a40",
  measurementId: "G-LEXGRPVDR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const provider = new GoogleAuthProvider();
export const db=getFirestore(app);