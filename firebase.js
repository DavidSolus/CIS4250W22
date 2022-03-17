import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
const firebaseConfig = {
    apiKey: "AIzaSyAjczHhdJDf1wqSNRuUDgFZl9yIPaxdAF0",
    authDomain: "cis4250-latest.firebaseapp.com",
    projectId: "cis4250-latest",
    storageBucket: "cis4250-latest.appspot.com",
    messagingSenderId: "471106621576",
    appId: "1:471106621576:web:db5d46e9406f70ada74f3d"
  };

// Initialize Firebase
// if(!firebase.getApps.length){
//     const app = firebase.initializeApp(firebaseConfig);
//     const db = getFirestore(app)
// }

const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);