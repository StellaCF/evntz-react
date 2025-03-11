// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// import dotenv from 'dotenv'

// dotenv.config()

// const firebaseConfig = {
//   apiKey: "AIzaSyCWHEJdI-B9sSrAgJUxOjfGhl13OdvyRQQ",
//   authDomain: "eventz-27855.firebaseapp.com",
//   projectId: "eventz-27855",
//   storageBucket: "eventz-27855.firebasestorage.app",
//   messagingSenderId: "141451320563",
//   appId: "1:141451320563:web:b3ca8993bfd3f5564e2b86"
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app
export const db = getFirestore(app)