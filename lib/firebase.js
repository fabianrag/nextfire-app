import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const app = initializeApp({
  apiKey: 'AIzaSyDL_zR0Ncq-0qrrUQs0lZHjIeULIr0xzzA',
  authDomain: 'firenext-app-5ee53.firebaseapp.com',
  projectId: 'firenext-app-5ee53',
  storageBucket: 'firenext-app-5ee53.appspot.com',
  messagingSenderId: '311078113504',
  appId: '1:311078113504:web:1d2efbc7e513b0cd4f0085',
})

export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
