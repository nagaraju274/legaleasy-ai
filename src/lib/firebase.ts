'use client';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6kT1AfOj7WqtcNKO4USnUcjo1BCiAgjA",
  authDomain: "studio-363859993-44900.firebaseapp.com",
  projectId: "studio-363859993-44900",
  storageBucket: "studio-363859993-44900.firebasestorage.app",
  messagingSenderId: "757018108861",
  appId: "1:757018108861:web:eca1e8625105fafd59e8d4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
