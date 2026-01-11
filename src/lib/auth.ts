import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { initializeApp, getApps, getApp } from 'firebase/app'

// Use the same Firebase config as firebase.js to ensure we use the same app instance
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Get existing app or initialize if it doesn't exist
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const getClientAuth =()=>{
    if(typeof window === 'undefined') return null;
    return getAuth(app);
     } 

export const login = async (email: string, password: string) => {
    const auth = getClientAuth();
    if(!auth) throw new Error('Firebase auth not initialized');
    return  signInWithEmailAndPassword(auth, email, password)
}
   
export const logout = async () => {
    const auth = getClientAuth();
    if(!auth) return;
 await signOut(auth)
}
    
