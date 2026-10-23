import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import Logo from './Logo'
import Button from './Button'
import ArrowTile from './ArrowTile'
import { ChevronDown, Close, Menu } from './Icons'
import { EASE } from './Reveal'
import { useCollection, useSettings } from '../hooks/useContent'
import { telHref } from '../utils/format'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services', menu: true },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const { data: services } = useCollection('services')
  const settings = useSettings()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setMenu(false)
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Over the homepage's dark hero the bar is transparent with light type until the page scrolls.
  const onDark = pathname === '/' && !scrolled
  const closeMenus = () => {
    setOpen(false)
    setMenu(false)
  }

  const linkCls = ({ isActive }) =>
    `relative py-2 text-[0.95rem] font-medium transition-colors duration-500 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-violet after:transition-transform after:duration-500 after:ease-cinema ${
      isActive
        ? `${onDark ? 'text-white' : 'text-ink'} after:scale-x-100`
        : `${onDark ? 'text-white/65 hover:text-white' : 'text-ink/70 hover:text-ink'} after:scale-x-0 hover:after:scale-x-100`
    }`

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-700 ease-cinema ${scrolled ? 'border-b border-line bg-white/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'}`}
      >
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <nav className="site-container flex h-20 items-center justify-between gap-6" aria-label="Main">
          <Logo light={onDark} onClick={closeMenus} className="h-9 w-auto sm:h-10" />

          <ul className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) =>
              l.menu ? (
                <li key={l.to} className="relative" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
                  <div className="flex items-center gap-1">
                    <NavLink to={l.to} className={linkCls} onClick={closeMenus}>
                      {l.label}
                    </NavLink>
                    <button
                      type="button"
                      aria-label="Show services"
                      aria-expanded={menu}
                      onClick={() => setMenu((m) => !m)}
                      className={onDark ? 'text-white/60 hover:text-white' : 'text-ink/60 hover:text-ink'}
                    >
                      <ChevronDown className={`size-4 transition-transform duration-500 ${menu ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  <AnimatePresence>
                    {menu && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-5"
                      >
                        <div className="grid grid-cols-2 gap-1 rounded-lg border border-line bg-white p-3 shadow-[0_30px_60px_-20px_rgba(14,11,18,0.25)]">
                          {services.map((s) => (
                            <Link
                              key={s.id}
                              to={`/services/${s.slug}`}
                              onClick={closeMenus}
                              className="group flex items-start justify-between gap-3 rounded-md p-3 transition-colors hover:bg-mist"
                            >
                              <span>
                                <span className="block text-[0.95rem] font-semibold leading-snug text-ink">{s.title}</span>
                                <span className="mt-0.5 block text-xs text-graphite">{s.tagline}</span>
                              </span>
                              <ArrowTile size="sm" tone="white" className="opacity-0 transition-opacity group-hover:opacity-100" />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.end} className={linkCls} onClick={closeMenus}>
                    {l.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-3">
            <Button to="/contact" size="sm" variant={onDark ? 'violet' : 'primary'} className="hidden sm:inline-flex">
              Let’s talk
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={`grid size-11 place-items-center rounded-md text-white transition-colors duration-500 lg:hidden ${onDark ? 'bg-white/10' : 'bg-ink'}`}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-white lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="site-container flex h-20 shrink-0 items-center justify-between">
              <Logo light onClick={closeMenus} className="h-9 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-11 place-items-center rounded-md bg-white/10"
                aria-label="Close menu"
              >
                <Close className="size-6" />
              </button>
            </div>
            <nav className="site-container flex flex-1 flex-col justify-center py-10" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <div key={l.to} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.06 }}
                  >
                    <NavLink
                      to={l.to}
                      end={l.end}
                      onClick={closeMenus}
                      className={({ isActive }) =>
                        `display block py-1.5 text-[2.6rem] transition-[color,transform] duration-500 ease-cinema hover:translate-x-2 sm:text-6xl ${
                          isActive ? 'text-violet' : 'text-white hover:text-lilac'
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              className="site-container shrink-0 border-t border-white/10 py-8 text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <a href={`mailto:${settings.email}`} className="block text-lg text-white">
                {settings.email}
              </a>
              <a href={telHref(settings.phone)} className="mt-1 block">
                {settings.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
