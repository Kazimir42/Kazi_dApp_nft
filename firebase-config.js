import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "kazidapp.firebaseapp.com",
    projectId: "kazidapp",
    storageBucket: "kazidapp.appspot.com",
    messagingSenderId: "669384475278",
    appId: "1:669384475278:web:e1caa4d67f0ef17547bfdf"
};

const app = initializeApp(firebaseConfig);
export const ath = getAuth(app);