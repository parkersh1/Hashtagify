// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';  

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNB9Dz1YAOK1BSGezR5kcpGeApOiGo0xw",
  authDomain: "concerto-1bba9.firebaseapp.com",
  databaseURL: "https://concerto-1bba9-default-rtdb.firebaseio.com",
  projectId: "concerto-1bba9",
  storageBucket: "concerto-1bba9.appspot.com",
  messagingSenderId: "1023604336018",
  appId: "1:1023604336018:web:8be756614ffdbe83150d4b",
  measurementId: "G-1H4JVQWYQL"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };  