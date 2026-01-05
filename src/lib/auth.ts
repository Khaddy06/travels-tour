import { getAuth, signInWithEmailAndPassword, signOut,
 } from 'firebase/auth'
import { getApp, initializeApp, getApps } from 'firebase/app'



const app = !getApps().length ? initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}) : getApp()
export const auth = getAuth(app)

export const login = async (email: string, password: string) => 
    signInWithEmailAndPassword(auth, email, password)
export const logout = async () => {
 await signOut(auth)
}
    
