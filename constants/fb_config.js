//  Author: Tony Miller
//  Google Firebase Firestore setup

import firebase from "firebase";
import "@firebase/firestore";
import firebaseConfig from "./credentials";

console.log(firebaseConfig);

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const dbh = firebase.firestore();

export default dbh;
