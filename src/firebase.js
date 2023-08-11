import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'; //to integrate firestore in the project
import { GoogleAuthProvider, getAuth, signOut, createUserWithEmailAndPassword } from "firebase/auth";

/**
 * Firebase configuration object containing API keys and other settings.
 * @type {Object}
 */
const firebaseConfig = {
  apiKey: "AIzaSyAZxGk7RIOFuuYq0OLBY4IkfO-MnibFjDw",
  authDomain: "planmate-3edb8.firebaseapp.com",
  projectId: "planmate-3edb8",
  storageBucket: "planmate-3edb8.appspot.com",
  messagingSenderId: "1050982742484",
  appId: "1:1050982742484:web:749c99896374588a07fe41"
};

/**
 * Initializes the Firebase app with the provided configuration object.
 * @type {Object}
 */
const app = initializeApp(firebaseConfig);

/**
 * Gets a Firestore instance for the initialized app.
 * @type {Object}
 */
const db = getFirestore(app);

/**
 * Gets an Auth instance for the initialized app.
 * @type {Object}
 */
const auth = getAuth(app);

/**
 * Google Auth Provider instance for the initialized app.
 * @type {Object}
 */
const GoogleAuthProviderInstance = new GoogleAuthProvider();

/**
 * Exports the initialized Auth, Firestore, and Google Auth Provider instances along with signOut and createUserWithEmailAndPassword functions.
 */
export { auth, db, GoogleAuthProviderInstance as GoogleAuthProvider, signOut, createUserWithEmailAndPassword };
