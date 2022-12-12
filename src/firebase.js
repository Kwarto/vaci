import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBAhqi9LGSjOw3asGopzNbQBKy7dmeaD-0",
  authDomain: "vaci-online.firebaseapp.com",
  projectId: "vaci-online",
  storageBucket: "vaci-online.appspot.com",
  messagingSenderId: "888659694574",
  appId: "1:888659694574:web:cf30ba2bd84f40e20bf4ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

