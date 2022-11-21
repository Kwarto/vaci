import firebase from "firebase/compat/app";
import "firebase/compat/database"
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_APP_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE,
  messagingSenderId: process.env.MESSAGE,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
export const auth = getAuth();
export const storage = getStorage();

