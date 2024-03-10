import { initializeApp } from 'firebase/app';
// import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import { ..., getFirestore } from 'firebase/firestore';
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC6iQJEvP9QQNWtrrTUR35Obhk3aTTLyV8",
    authDomain: "food-3ad3b.firebaseapp.com",
    projectId: "food-3ad3b",
    storageBucket: "food-3ad3b.appspot.com",
    messagingSenderId: "480802356383",
    appId: "1:480802356383:web:03d5f2984e7414c045f6aa",
    measurementId: "G-F7GPZGBD2R"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB  = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
