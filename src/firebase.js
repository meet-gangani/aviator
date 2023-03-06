import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAPGroe9JCL5OrTu8enQHXQvObRwtVyOY0",
  authDomain: "login-logout-demo-ccfec.firebaseapp.com",
  databaseURL: "https://login-logout-demo-ccfec-default-rtdb.firebaseio.com",
  projectId: "login-logout-demo-ccfec",
  storageBucket: "login-logout-demo-ccfec.appspot.com",
  messagingSenderId: "971838175414",
  appId: "1:971838175414:web:fcce628ef9e5ed38688e17",
  measurementId: "",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
 const db = getDatabase(app);

export { auth, db };