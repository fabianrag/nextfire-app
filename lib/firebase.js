import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
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

/// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param {string} username
 */
export async function getUserWithUsername(username) {
  const q = query(
    collection(db, 'users'),
    where('username', '==', username),
    limit(1)
  )
  const userDocSnap = await getDocs(q)
  const userDoc = userDocSnap.docs[0]
  return userDoc
}

/**`
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data()
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.createdAt.toMillis(),
  }
}

export const fromMillis = Timestamp.fromMillis
