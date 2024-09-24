import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB3YpaMtjcLBNF9V5S_T7O4ALpqxaLCOAM',
  authDomain: 'markethive-recovery.firebaseapp.com',
  projectId: 'markethive-recovery',
  storageBucket: 'markethive-recovery.appspot.com',
  messagingSenderId: '113383015154',
  appId: '1:113383015154:web:8005a74f003b5b0932066b',
  measurementId: 'G-JEZYYHVKGT',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app, 'gs://markethive-258a5.appspot.com');

export { auth, db, storage };
