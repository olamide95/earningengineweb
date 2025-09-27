// Firebase configuration based on your google-services.json
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC4F1JOYlo8lB6i_OJ1sJ2S8AjphPX9P4E",
  authDomain: "learnem-d29e9.firebaseapp.com",
  projectId: "learnem-d29e9",
  storageBucket: "learnem-d29e9.firebasestorage.app",
  messagingSenderId: "73611710526",
  appId: "1:73611710526:web:aa388391ed5c3264b6016f",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
