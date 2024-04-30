import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './Components/App.js';
import { BrowserRouter } from 'react-router-dom';
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_x6xWX52wi_i5RcS1A_dX8ggBGK-WwLs",
  authDomain: "project-yl0517.firebaseapp.com",
  projectId: "project-yl0517",
  storageBucket: "project-yl0517.appspot.com",
  messagingSenderId: "70664415649",
  appId: "1:70664415649:web:fedd0bb5b63c6615f183e0",
  measurementId: "G-F6XC7CFNHK",
  databaseURL: "https://project-yl0517-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const storage = getStorage(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App database={database} />
    </BrowserRouter>
  </React.StrictMode>
);
