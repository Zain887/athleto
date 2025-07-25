// src/lib/firebase.ts

// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA6ZEZx4U7myIn_Gk0j3IBBs4OukLugHQw",
  authDomain: "athleto-site.firebaseapp.com",
  projectId: "athleto-site",
  storageBucket: "athleto-site.appspot.com",
  messagingSenderId: "903059601751",
  appId: "1:903059601751:web:4f920af73880b4e8d26612",
  measurementId: "G-ZYWDJ0CTH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth instances
export const db = getFirestore(app);
export const auth = getAuth(app);
