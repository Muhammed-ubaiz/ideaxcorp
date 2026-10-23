import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore/lite'
import { db, isFirebaseConfigured } from '../firebase/firebase'
import { auth } from '../firebase/admin'

const AuthContext = createContext(null)

/**
 * Tracks the signed-in user and whether they are an admin.
 * An account is an admin when a document exists at admins/{uid} — the same check the
 * Firestore and Storage security rules use, so the UI and the backend always agree.
 */
export function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, isAdmin: false, loading: isFirebaseConfigured })

  useEffect(() => {
    if (!auth) return
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return setState({ user: null, isAdmin: false, loading: false })
      setState((s) => ({ ...s, loading: true }))
      let isAdmin = false
      try {
        isAdmin = (await getDoc(doc(db, 'admins', user.uid))).exists()
      } catch {
        isAdmin = false
      }
      setState({ user, isAdmin, loading: false })
    })
  }, [])

  const value = {
    ...state,
    signIn: (email, password) => signInWithEmailAndPassword(auth, email, password),
    signOut: () => signOut(auth),
    resetPassword: (email) => sendPasswordResetEmail(auth, email),
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
