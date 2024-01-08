import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBZa3IPh_Oh-wEwZJDz5C5tX8dOCVdQ-R0',
  authDomain: 'curso-firebase-a7dbf.firebaseapp.com',
  projectId: 'curso-firebase-a7dbf',
  storageBucket: 'curso-firebase-a7dbf.appspot.com',
  messagingSenderId: '158942398766',
  appId: '1:158942398766:web:3bca15a9aab7576d32d2bf',
  measurementId: 'G-5Y8R778G10',
}

const fireBaseApp = initializeApp(firebaseConfig)
const db = getFirestore(fireBaseApp)

const auth = getAuth(fireBaseApp)

export { db, auth }
