import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { AdminButton, Notice } from './ui'

const MESSAGES = {
  'auth/invalid-credential': 'That email and password don’t match an account.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/too-many-requests': 'Too many attempts. Wait a few minutes, or reset your password.',
  'auth/network-request-failed': 'Couldn’t reach Firebase. Check your connection and try again.',
  'auth/operation-not-allowed': 'Email/password sign-in isn’t enabled in Firebase Authentication yet.',
}

export default function Login() {
  const { user, isAdmin, loading, signIn, signOut, resetPassword } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  if (!loading && user && isAdmin) return <Navigate to={location.state?.from || '/admin/dashboard'} replace />

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setInfo('')
    setBusy(true)
    try {
      await signIn(email.trim(), password)
      navigate(location.state?.from || '/admin/dashboard', { replace: true })
    } catch (err) {
      setError(MESSAGES[err.code] || err.message)
    } finally {
      setBusy(false)
    }
  }

  async function onReset() {
    setError('')
    if (!email.trim()) return setError('Enter your email first, then choose “Forgot password”.')
    try {
      await resetPassword(email.trim())
      setInfo(`If an account exists for ${email.trim()}, a reset link is on its way.`)
    } catch (err) {
      setError(MESSAGES[err.code] || err.message)
    }
  }

  return (
    <div className="grid min-h-screen bg-ink lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img src="/images/glow-wave.webp" alt="" className="absolute inset-0 size-full object-cover opacity-80" />
        <div className="absolute bottom-12 left-12">
          <img src="/images/logo-light.webp" alt="Ideaxcorp" className="h-12 w-auto" />
        </div>
      </div>
      <div className="grid place-items-center bg-white p-6">
        <div className="w-full max-w-sm">
          <img src="/images/logo-dark.webp" alt="Ideaxcorp" className="h-10 w-auto lg:hidden" />
          <h1 className="display-md mt-8 text-3xl lg:mt-0">Sign in to admin</h1>
          <p className="mt-2 text-graphite">Manage services, portfolio, blog posts and messages.</p>

          {user && !isAdmin && !loading && (
            <div className="mt-6">
              <Notice tone="warn">
                <p>
                  <strong>{user.email}</strong> is signed in but isn’t an admin.
                </p>
                <p className="mt-1">
                  Add a document with ID <code className="break-all rounded bg-white px-1">{user.uid}</code> to the <code>admins</code> collection in
                  Firestore, then sign in again.
                </p>
                <button type="button" onClick={signOut} className="mt-2 font-semibold underline">
                  Sign out
                </button>
              </Notice>
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="field-label">
                Email
              </label>
              <input id="email" type="email" autoComplete="username" required className="field-input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="field-label">
                  Password
                </label>
                <button type="button" onClick={onReset} className="mb-1.5 text-sm font-medium text-violet hover:underline">
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="field-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <Notice tone="error">{error}</Notice>}
            {info && <Notice tone="success">{info}</Notice>}
            <AdminButton type="submit" className="h-11 w-full" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign in'}
            </AdminButton>
          </form>
          <Link to="/" className="mt-8 inline-block text-sm text-graphite hover:text-ink">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}
