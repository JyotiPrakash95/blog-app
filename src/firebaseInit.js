// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq4EQDW20du5DioAU9mRQwor6nxQ2mjt8",
  authDomain: "blogging-app-78885.firebaseapp.com",
  projectId: "blogging-app-78885",
  storageBucket: "blogging-app-78885.appspot.com",
  messagingSenderId: "515204892928",
  appId: "1:515204892928:web:3dc851c516a1f4fa958be5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

