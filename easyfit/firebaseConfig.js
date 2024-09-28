// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNaXNlMJ4oxD1hC0--X7G-qGeB-9yrVjY",
  authDomain: "fitbits-f8a54.firebaseapp.com",
  projectId: "fitbits-f8a54",
  storageBucket: "fitbits-f8a54.appspot.com",
  messagingSenderId: "391863657652",
  appId: "1:391863657652:web:6d595b0c737b291228e3e1",
  measurementId: "G-107CFCX5D4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);