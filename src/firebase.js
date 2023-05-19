import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'; //to integrate firestore in the project
import { GoogleAuthProvider, getAuth, signOut, createUserWithEmailAndPassword } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZxGk7RIOFuuYq0OLBY4IkfO-MnibFjDw",
  authDomain: "planmate-3edb8.firebaseapp.com",
  projectId: "planmate-3edb8",
  storageBucket: "planmate-3edb8.appspot.com",
  messagingSenderId: "1050982742484",
  appId: "1:1050982742484:web:749c99896374588a07fe41"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const GoogleAuthProviderInstance = new GoogleAuthProvider();

export { auth, db, GoogleAuthProviderInstance as GoogleAuthProvider, signOut, createUserWithEmailAndPassword };
