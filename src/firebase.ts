require("dotenv").config();

import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "dc-d2-raidorganizer.firebaseapp.com",
  projectId: "dc-d2-raidorganizer",
  storageBucket: "dc-d2-raidorganizer.appspot.com",
  messagingSenderId: "1088730598260",
  appId: "1:1088730598260:web:f38ee26b454640e21cba21",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
