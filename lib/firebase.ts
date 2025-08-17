import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBAs0mBN765HEZBCNL8qX6kaL5K3DRzcUM",
  authDomain: "teaspot-80d42.firebaseapp.com",
  databaseURL: "https://teaspot-80d42-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "teaspot-80d42",
  storageBucket: "teaspot-80d42.appspot.com",
  messagingSenderId: "590733455543",
  appId: "1:590733455543:web:09e15bdc71f996188add32",
  measurementId: "G-FT40VHT6YE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;