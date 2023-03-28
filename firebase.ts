import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJnz89_ff6_xIwdtMlx36AGRhd7hi8sig",
  authDomain: "clone-chatgpt-c8faf.firebaseapp.com",
  projectId: "clone-chatgpt-c8faf",
  storageBucket: "clone-chatgpt-c8faf.appspot.com",
  messagingSenderId: "216886350297",
  appId: "1:216886350297:web:d95b24ed4ac7edc6fac9c8",
  measurementId: "G-417ZLKGB01"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
