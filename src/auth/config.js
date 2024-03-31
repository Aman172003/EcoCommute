import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-h1zdgrAiYeof6ot1liUb0QtjM3kGd5U",
  authDomain: "ecommute-a9cf5.firebaseapp.com",
  projectId: "ecommute-a9cf5",
  storageBucket: "ecommute-a9cf5.appspot.com",
  messagingSenderId: "995252865173",
  appId: "1:995252865173:web:af7f0bdb4813e75a81f39c",
  measurementId: "G-WR85F2K8NL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
