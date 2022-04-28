import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebase = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: ".firebaseapp.com",
    projectId: "nftnftwhitelistekaziwhitelistekazi",
    storageBucket: "nftwhitelistekazi.appspot.com",
    messagingSenderId: "533050978935",
    appId: "1:533050978935:web:b7735e03bdf092e48f0c72"
}

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebase)
const auth = getAuth(app)
export {auth}