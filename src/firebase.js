// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZxGk7RIOFuuYq0OLBY4IkfO-MnibFjDw",
  authDomain: "planmate-3edb8.firebaseapp.com",
  projectId: "planmate-3edb8",
  storageBucket: "planmate-3edb8.appspot.com",
  messagingSenderId: "1050982742484",
  appId: "1:1050982742484:web:749c99896374588a07fe41"
};

//initialize firebase app
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();