// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChIWqcoIdgXf2ZbZXzS1UYO4tFC7tqThY",
  authDomain: "mychatapp---online.firebaseapp.com",
  projectId: "mychatapp---online",
  storageBucket: "mychatapp---online.appspot.com",
  messagingSenderId: "573885294684",
  appId: "1:573885294684:web:5e886df4ec6eb7f8b71e99",
  measurementId: "G-68J8DS1HB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth, app}