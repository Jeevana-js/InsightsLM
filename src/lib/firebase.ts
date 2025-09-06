import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "class-10-tutor",
  appId: "1:662619694149:web:7a67345eb2964c73ce2f2c",
  storageBucket: "class-10-tutor.appspot.com",
  apiKey: "AIzaSyC2-rN_OOTvBr4x766zssY75DRBhTLlWj4",
  authDomain: "class-10-tutor.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "662619694149"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
