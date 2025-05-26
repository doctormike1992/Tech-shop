// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZBpdELTn5Nd6zCnpeHzcT9o6OCCRx1zA",
  authDomain: "shopproject-511f5.firebaseapp.com",
  projectId: "shopproject-511f5",
  storageBucket: "shopproject-511f5.firebasestorage.app",
  messagingSenderId: "65505380333",
  appId: "1:65505380333:web:774c91f7a85e714bb409e4",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 const db = getFirestore(app);
 const storage = getStorage(app);

export { app, auth, db, storage };