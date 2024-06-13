import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjandGljSGYR8YpILt9P55ApXPvQPXIAc",
  authDomain: "joypetzapp.firebaseapp.com",
  projectId: "joypetzapp",
  storageBucket: "joypetzapp.appspot.com",
  messagingSenderId: "475221256496",
  appId: "1:475221256496:web:cc536d0d9bcbefb4a640f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);