import firebase from "firebase/compat/app";
import "firebase/compat/database"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCoh08rvP16q8iTlbpMplSsDe6t0XVEYrk",
  authDomain: "vaci-57d2c.firebaseapp.com",
  projectId: "vaci-57d2c",
  storageBucket: "vaci-57d2c.appspot.com",
  messagingSenderId: "280457237480",
  appId: "1:280457237480:web:0ec7eba80b0f5700b50a5d"
};

// Initialize Firebase
const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
export const storage = getStorage();

