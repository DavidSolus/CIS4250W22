// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQVVZFfBI9GYNaCHzjRBEhovRe-3EvVew",
  authDomain: "cis4250-f351a.firebaseapp.com",
  projectId: "cis4250-f351a",
  storageBucket: "cis4250-f351a.appspot.com",
  messagingSenderId: "404237621587",
  appId: "1:404237621587:web:736b68385636eb325ca9a6",
  measurementId: "G-9ZCEGEYLWV"
};

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const fbStorage = getStorage(firebaseApp);

export { fbStorage };