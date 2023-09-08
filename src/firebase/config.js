import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyB1bRR5nGuQT_bIieNiyGr-dMzHBQvm7cU",
  authDomain: "ecommerce-21stapr.firebaseapp.com",
  projectId: "ecommerce-21stapr",
  storageBucket: "ecommerce-21stapr.appspot.com",
  messagingSenderId: "1006366732778",
  appId: "1:1006366732778:web:494a53f02dfc8fe858c293"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore (app)
export const storage=getStorage(app)
export default app