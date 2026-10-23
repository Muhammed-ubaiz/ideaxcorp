import { Navigate, Route, Routes, useLocation } from 'react-router'
import { AuthProvider, useAuth } from '../hooks/useAuth'
import { isFirebaseConfigured } from '../firebase/firebase'
import AdminLayout from './AdminLayout'
import Login from './Login'
import Dashboard from './Dashboard'
import CollectionManager from './CollectionManager'
import Messages from './Messages'
import Settings from './Settings'
import { Spinner } from './ui'

function FullScreen({ children }) {
  return <div className="grid min-h-screen place-items-center bg-mist p-6">{children}</div>
}

function SetupRequired() {
  return (
    <FullScreen>
      <div className="max-w-lg rounded-lg bg-white p-8">
        <h1 className="display-md text-2xl">Connect Firebase to use the admin</h1>
        <p className="mt-3 text-graphite">
          The admin needs a Firebase project. Copy <code className="rounded bg-mist px-1">frontend/.env.example</code> to{' '}
          <code className="rounded bg-mist px-1">frontend/.env.local</code>, fill in your web app’s config from the Firebase console, and restart the dev
          server. The README has step-by-step instructions.
        </p>
      </div>
    </FullScreen>
  )
}

function RequireAdmin({ children }) {
  const { user, isAdmin, loading } = useAuth()
  const location = useLocation()
  if (loading) {
    return (
      <FullScreen>
        <Spinner />
      </FullScreen>
    )
  }
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  return children
}

export default function AdminApp() {
  if (!isFirebaseConfigured) return <SetupRequired />
  return (
    <AuthProvider>
      <meta name="robots" content="noindex, nofollow" />
      <title>Admin — Ideaxcorp</title>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="services" element={<CollectionManager key="services" collection="services" />} />
          <Route path="portfolio" element={<CollectionManager key="portfolio" collection="portfolio" />} />
          <Route path="blogs" element={<CollectionManager key="blogs" collection="blogs" />} />
          <Route path="testimonials" element={<CollectionManager key="testimonials" collection="testimonials" />} />
          <Route path="faqs" element={<CollectionManager key="faqs" collection="faqs" />} />
          <Route path="team" element={<CollectionManager key="team" collection="team" />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
