import { initializeApp } from 'firebase/app'
// Firestore Lite keeps the public bundle small; the site never needs realtime listeners.
import { getFirestore } from 'firebase/firestore/lite'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// The public site still renders from bundled default content when Firebase isn't configured,
// so a missing .env never produces a blank page.
export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId)

export const app = isFirebaseConfigured ? initializeApp(config) : null
export const db = app ? getFirestore(app) : null
export const hasStorageBucket = Boolean(config.storageBucket)
