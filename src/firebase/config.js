import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCe6ZV0iTozP4oep4M8XAczP71_3oTgI2s",
  authDomain: "bhookh-lagg-gayi.firebaseapp.com",
  projectId: "bhookh-lagg-gayi",
  storageBucket: "bhookh-lagg-gayi.firebasestorage.app",
  messagingSenderId: "375575398776",
  appId: "1:375575398776:web:a356da80f73fe19938e08d",
  measurementId: "G-2Q0CKQHQ6Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();