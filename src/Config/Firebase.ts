import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Correct capitalization

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4mzBXYXXCjJ17J6xPkFs8gWZ6ErTB_dE",
  authDomain: "react-full-stack-project-e499e.firebaseapp.com",
  projectId: "react-full-stack-project-e499e",
  storageBucket: "react-full-stack-project-e499e.appspot.com",
  messagingSenderId: "928951721156",
  appId: "1:928951721156:web:0d78a8a3f939d56fb2fd91",
  measurementId: "G-8HZZT1CTS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app); // Correct capitalization
