import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// create app source
const app = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,

      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,

      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,

      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,

      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    })
  : firebase.app();

console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
console.log(firebase.apps);

//export variable for authentication
export const auth = app.auth();

//export variable for firestore
export const db = getFirestore(app);

//export variable for cloud storage
export const storage = getStorage(app);

export default app;
