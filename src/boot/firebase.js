
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDT8uT1jd6XN8i6varCbGKclYg1L--65jU",
  authDomain: "quasargram-4e56a.firebaseapp.com",
  databaseURL: "https://quasargram-4e56a-default-rtdb.firebaseio.com",
  projectId: "quasargram-4e56a",
  storageBucket: "quasargram-4e56a.appspot.com",
  messagingSenderId: "234178971781",
  appId: "1:234178971781:web:feda91fbf2513bb6a981ec"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb } 