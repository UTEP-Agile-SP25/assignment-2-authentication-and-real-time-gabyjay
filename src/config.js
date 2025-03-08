// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5O6b9Gxb7wiApNyG04MjEHK-X94v9e0k",
  authDomain: "assignment2-69837.firebaseapp.com",
  projectId: "assignment2-69837",
  storageBucket: "assignment2-69837.firebasestorage.app",
  messagingSenderId: "377939988866",
  appId: "1:377939988866:web:b23ba1726e84eb3a347f9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app

