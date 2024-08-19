// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'; // Import the Firestore module

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALYWsOLv4c8XFNCxfkodAf-VYTkZEY7u8",
    authDomain: "shop-fullstack.firebaseapp.com",
    projectId: "shop-fullstack",
    storageBucket: "shop-fullstack.appspot.com",
    messagingSenderId: "686704837501",
    appId: "1:686704837501:web:d5c4013cd7d0166ea10214",
    measurementId: "G-DJ00YEDCT6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); // Export the Firestore instance