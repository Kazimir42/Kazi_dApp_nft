import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const firebase = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "kazidapp.firebaseapp.com",
    projectId: "kazidapp",
    storageBucket: "kazidapp.appspot.com",
    messagingSenderId: "669384475278",
    appId: "1:669384475278:web:e1caa4d67f0ef17547bfdf"
}

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebase)
const auth = getAuth(app)
const db = getFirestore(app)

export {auth}
export {app}
export {db}