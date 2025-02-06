// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-estate-a77a0.firebaseapp.com",
  projectId: "mern-estate-a77a0",
  storageBucket: "mern-estate-a77a0.firebasestorage.app",
  messagingSenderId: "206907467258",
  appId: "1:206907467258:web:465a19fa5017af72f33043"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);