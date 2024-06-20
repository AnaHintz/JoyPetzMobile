import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxAjjzNva5hi-XiclzHMBG9pGO3XadvL4",
  authDomain: "pijoypetz.firebaseapp.com",
  projectId: "pijoypetz",
  storageBucket: "pijoypetz.appspot.com",
  messagingSenderId: "1011445109822",
  appId: "1:1011445109822:web:d1c79ee99100d003706d6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);