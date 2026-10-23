import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { Close, External, Menu } from '../components/Icons'

const NAV = [
  ['dashboard', 'Dashboard'],
  ['messages', 'Messages'],
  null,
  ['services', 'Services'],
  ['portfolio', 'Portfolio'],
  ['blogs', 'Blog posts'],
  ['testimonials', 'Testimonials'],
  ['faqs', 'FAQs'],
  ['team', 'Team'],
  null,
  ['settings', 'Site settings'],
]

function Sidebar({ onNavigate }) {
  const { user, signOut } = useAuth()
  return (
    <div className="flex h-full flex-col bg-ink text-white">
      <div className="flex h-16 items-center gap-3 px-5">
        <img src="/images/mark.webp" alt="" className="size-8 rounded" />
        <span className="font-semibold">Ideaxcorp admin</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Admin">
        {NAV.map((item, i) =>
          item ? (
            <NavLink
              key={item[0]}
              to={`/admin/${item[0]}`}
              onClick={onNavigate}
              className={({ isActive }) =>
                `mb-0.5 flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-violet text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {item[1]}
            </NavLink>
          ) : (
            <hr key={`d${i}`} className="my-3 border-white/10" />
          ),
        )}
      </nav>
      <div className="border-t border-white/10 p-4 text-sm">
        <a href="/" target="_blank" rel="noopener" className="mb-3 flex items-center gap-2 text-white/70 hover:text-white">
          <External className="size-4" /> View website
        </a>
        <p className="truncate text-white/50" title={user?.email}>
          {user?.email}
        </p>
        <button type="button" onClick={signOut} className="mt-2 font-semibold text-lilac hover:text-white">
          Sign out
        </button>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  return (
    <div className="min-h-screen bg-mist font-sans text-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-60 lg:block">
        <Sidebar />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-64">
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
          <button type="button" aria-label="Close menu" className="flex-1 bg-ink/50" onClick={() => setOpen(false)}>
            <Close className="ml-auto mr-4 size-6 text-white" />
          </button>
        </div>
      )}

      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur lg:hidden">
          <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="grid size-10 place-items-center rounded-md hover:bg-mist">
            <Menu />
          </button>
          <Link to="/admin/dashboard" className="font-semibold">
            Ideaxcorp admin
          </Link>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8 lg:py-12">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
