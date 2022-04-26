import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "nftwhitelistekazi.firebaseapp.com",
    projectId: "nftwhitelistekazi",
    storageBucket: "nftwhitelistekazi.appspot.com",
    messagingSenderId: "533050978935",
    appId: "1:533050978935:web:b7735e03bdf092e48f0c72"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);