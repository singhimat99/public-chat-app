import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBsve2EI1mimCQEI-UVAh90I8xSLzfgLyg",
  authDomain: "chat-app-fdc7b.firebaseapp.com",
  projectId: "chat-app-fdc7b",
  storageBucket: "chat-app-fdc7b.appspot.com",
  messagingSenderId: "1036136994442",
  appId: "1:1036136994442:web:cc1f30a75498b89946ff73",
  measurementId: "G-R2QN9J9JHB",
});

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export { firebaseApp, auth, firestore };
