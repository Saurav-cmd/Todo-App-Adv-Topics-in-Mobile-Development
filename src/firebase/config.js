// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUdWmCJ7H7GMIb55uk8x1zd8SllN8Pjhw",
  authDomain: "adv-topic-in-mobile-dev.firebaseapp.com",
  databaseURL: "https://adv-topic-in-mobile-dev-default-rtdb.firebaseio.com",
  projectId: "adv-topic-in-mobile-dev",
  storageBucket: "adv-topic-in-mobile-dev.appspot.com",
  messagingSenderId: "864790036661",
  appId: "1:864790036661:web:35e313e23409bb9d79befc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore
export { db };
