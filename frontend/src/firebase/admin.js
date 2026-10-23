// Auth and Storage are only used by the admin dashboard, so they live in the admin bundle.
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { app, hasStorageBucket } from './firebase'

export const auth = app ? getAuth(app) : null
export const storage = app && hasStorageBucket ? getStorage(app) : null
