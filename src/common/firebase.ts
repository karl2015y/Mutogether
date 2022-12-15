// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref} from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTXByxlCVRp_0aQCXKiO0MyYkUUBFM0bg",
  authDomain: "mutogether.firebaseapp.com",
  projectId: "mutogether",
  storageBucket: "mutogether.appspot.com",
  messagingSenderId: "338637794879",
  appId: "1:338637794879:web:58e1e30b2452bd785ad28a",
  measurementId: "G-6FPNGS49YM",
  databaseURL: "https://mutogether-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

