import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAFXCcg6zSv8Q6Q7NfEwp4fx-E6Y1zaics",
  authDomain: "crm-s-a-telecom.firebaseapp.com",
  databaseURL: "https://crm-s-a-telecom-default-rtdb.firebaseio.com",
  projectId: "crm-s-a-telecom",
  storageBucket: "crm-s-a-telecom.firebasestorage.app",
  messagingSenderId: "295341609951",
  appId: "1:295341609951:web:b970e1b4cc422d5dbfaa6a",
  measurementId: "G-RG1KV3DF87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const realtimeDb = getDatabase(app);
export const storage = getStorage(app);

export default app; 