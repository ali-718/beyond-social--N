// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB-QFdE60fMg5ei2B2rl-eI--Z0_fI4akc',
  authDomain: 'beyond-social-48e02.firebaseapp.com',
  projectId: 'beyond-social-48e02',
  storageBucket: 'beyond-social-48e02.appspot.com',
  messagingSenderId: '4101506774',
  appId: '1:4101506774:web:c51e63095aa4ab98a9ab77',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
