// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe6ZV0iTozP4oep4M8XAczP71_3oTgI2s",
  authDomain: "bhookh-lagg-gayi.firebaseapp.com",
  projectId: "bhookh-lagg-gayi",
  storageBucket: "bhookh-lagg-gayi.firebasestorage.app",
  messagingSenderId: "375575398776",
  appId: "1:375575398776:web:a356da80f73fe19938e08d",
  measurementId: "G-2Q0CKQHQ6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

