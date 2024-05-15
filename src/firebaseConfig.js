import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';  // Import GoogleAuthProvider along with getAuth

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();  // Create a GoogleAuthProvider instance

export { database, auth, provider };  // Export provider for use in authentication
