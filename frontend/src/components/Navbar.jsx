import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import Logo from './Logo'
import { Close, Menu } from './Icons'
import { EASE } from './Reveal'
import { useCollection, useSettings } from '../hooks/useContent'
import { telHref } from '../utils/format'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

const pad = (n) => String(n).padStart(2, '0')
const PROBE_Y = 44 // vertical centre of the floating bar

/** Walks up from the element under the bar to the first opaque background and reports whether it is dark. */
function surfaceIsDark() {
  const els = document.elementsFromPoint(window.innerWidth / 2, PROBE_Y)
  for (const start of els) {
    if (start.closest('[data-navbar]')) continue
    for (let el = start; el; el = el.parentElement) {
      const m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g)
      if (!m) continue
      const [r, g, b, a = 1] = m.map(Number)
      if (a < 0.5) continue
      return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128
    }
    return false
  }
  return false
}

/**
 * Floating pill bar: MENU on the left, the logo in the centre and the call to action on the right.
 * It inverts against whatever is scrolling beneath it — white over dark sections, ink over light ones.
 */
export default function Navbar() {
  const { pathname } = useLocation()
  const { data: services } = useCollection('services')
  const settings = useSettings()
  const [dark, setDark] = useState(false)
  const [open, setOpen] = useState(false)
  const closeBtn = useRef(null)
  const menuBtn = useRef(null)

  useEffect(() => {
    let raf = 0
    const check = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setDark(surfaceIsDark()))
    }
    check()
    const late = setTimeout(check, 400) // after the page transition settles
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(late)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [pathname])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (open) closeBtn.current?.focus()
    const onKey = (e) => {
      if (e.key !== 'Escape' || !open) return
      setOpen(false)
      menuBtn.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Over a dark section the pill is white with ink type; over a light one it is ink with white type.
  const pill = dark ? 'bg-white text-ink' : 'bg-ink text-white'
  const cta = dark ? 'bg-ink text-white hover:bg-violet' : 'bg-white text-ink hover:bg-violet hover:text-white'

  return (
    <>
      <header data-navbar data-chrome className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:pt-4">
        <a
          href="#main"
          className="pointer-events-auto sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <motion.nav
          aria-label="Main"
          className={`pointer-events-auto mx-auto grid h-14 max-w-[40rem] grid-cols-[1fr_auto_1fr] items-center rounded-full pl-5 pr-2 shadow-[0_18px_40px_-22px_rgba(14,11,18,0.45)] transition-colors duration-500 ease-cinema sm:h-16 sm:pl-7 ${pill}`}
          initial={{ y: -90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        >
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen(true)}
            className="group flex items-center gap-2.5 justify-self-start text-sm font-semibold tracking-wide"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="size-5 transition-transform duration-500 ease-cinema group-hover:scale-x-125" />
            <span className="hidden sm:inline">MENU</span>
          </button>

          <Logo light={!dark} className="h-8 w-auto sm:h-9" />

          <Link
            to="/contact"
            className={`justify-self-end rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-500 ease-cinema sm:px-6 sm:py-3 ${cta}`}
          >
            Let’s talk
          </Link>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] overflow-y-auto px-3 pt-3 pb-6 sm:px-4 sm:pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.15 } }}
            transition={{ duration: 0.4 }}
          >
            {/* the page stays visible, dimmed and blurred, behind the panel; clicking it closes the menu */}
            <div aria-hidden="true" className="fixed inset-0 bg-black/45 backdrop-blur-md" onClick={() => setOpen(false)} />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="relative mx-auto max-w-[110rem] rounded-[2rem] bg-[#141414] px-6 pb-8 text-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] sm:px-12 sm:pb-10"
              initial={{ clipPath: 'inset(0% 32% 88% 32% round 2rem)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0% round 2rem)' }}
              exit={{ clipPath: 'inset(0% 32% 88% 32% round 2rem)' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center sm:h-20">
                <button
                  ref={closeBtn}
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    menuBtn.current?.focus()
                  }}
                  className="group flex items-center gap-3 justify-self-start text-sm font-semibold tracking-wide"
                  aria-label="Close menu"
                >
                  <Close className="size-5 transition-transform duration-500 ease-cinema group-hover:rotate-90" />
                  <span className="hidden sm:inline">MENU</span>
                </button>
                <Logo light className="h-8 w-auto sm:h-9" onClick={() => setOpen(false)} />
                <Link
                  to="/contact"
                  className="justify-self-end rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors duration-500 hover:bg-violet hover:text-white sm:px-6 sm:py-3"
                >
                  Let’s talk
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              >
                {services.length > 0 && (
                  <section className="mt-8 sm:mt-10">
                    <h2 className="kicker text-white/50">Services</h2>
                    <ul className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
                      {services.map((s, i) => (
                        <li key={s.id}>
                          <Link to={`/services/${s.slug}`} onClick={() => setOpen(false)} className="group flex items-baseline gap-4">
                            <span className="w-5 shrink-0 text-sm tabular-nums text-white/45">{pad(i + 1)}</span>
                            <span>
                              <span className="block text-xl font-bold leading-snug tracking-tight transition-colors duration-500 group-hover:text-violet sm:text-2xl">
                                {s.title}
                              </span>
                              {s.tagline && <span className="mt-1.5 block text-sm text-white/50">{s.tagline}</span>}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <nav aria-label="Site" className="mt-12 sm:mt-14">
                  <h2 className="kicker text-white/50">Explore</h2>
                  <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                    {LINKS.map((l) => (
                      <li key={l.to}>
                        <NavLink
                          to={l.to}
                          end={l.end}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            `link-underline text-xl font-semibold transition-colors duration-500 sm:text-2xl ${isActive ? 'text-white' : 'text-white/75 hover:text-white'}`
                          }
                        >
                          {l.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/55 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex flex-wrap gap-x-2">
                    <a href={telHref(settings.phone)} className="transition-colors hover:text-white">
                      {settings.phone}
                    </a>
                    <span aria-hidden="true">·</span>
                    <a href={`mailto:${settings.email}`} className="transition-colors hover:text-white">
                      {settings.email}
                    </a>
                  </p>
                  <p className="flex gap-6">
                    <Link to="/faq" onClick={() => setOpen(false)} className="transition-colors hover:text-white">
                      FAQ
                    </Link>
                    <Link to="/privacy-policy" onClick={() => setOpen(false)} className="transition-colors hover:text-white">
                      Privacy policy
                    </Link>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
