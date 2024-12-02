// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "anonymous-12318.firebaseapp.com",
  projectId: "anonymous-12318",
  storageBucket: "anonymous-12318.firebasestorage.app",
  messagingSenderId: "967559900359",
  appId: "1:967559900359:web:7fbba5b122b544a3d8a2e2",
  measurementId: "G-TJZG2EC1T2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default db;