// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC2IDwIEWk9-O4Vm2zufTpWxKwWb7uSnHs',
  authDomain: 'naman-project-36817.firebaseapp.com',
  projectId: 'naman-project-36817',
  storageBucket: 'naman-project-36817.appspot.com',
  messagingSenderId: '248327003736',
  appId: '1:248327003736:web:4b711cc02a44d484c3b42d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
