import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import Logo from './Logo'
import { ArrowRight, Close, Facebook, Instagram, LinkedIn, Plus, WhatsApp, YouTube } from './Icons'
import { EASE } from './Reveal'
import { useCollection, useSettings } from '../hooks/useContent'
import { telHref, whatsappHref } from '../utils/format'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services', services: true },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/blog', label: 'Blogs' },
  { to: '/contact', label: 'Contact Us' },
]

const SOCIALS = [
  ['instagram', 'Instagram', Instagram],
  ['facebook', 'Facebook', Facebook],
  ['linkedin', 'LinkedIn', LinkedIn],
  ['youtube', 'YouTube', YouTube],
]

const pad = (n) => String(n).padStart(2, '0')
const PROBE_Y = 40 // vertical centre of the bar

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
 * Open header: the logo on the left, the call to action and a round menu button on the right.
 * It slips away while scrolling down, returns on the way up, and inverts over dark sections.
 * The menu is a full-screen ink panel with oversized numbered links.
 */
export default function Navbar() {
  const { pathname } = useLocation()
  const { data: services } = useCollection('services')
  const settings = useSettings()
  const [dark, setDark] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const closeBtn = useRef(null)
  const menuBtn = useRef(null)

  useEffect(() => {
    let raf = 0
    let lastY = window.scrollY
    const check = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        setHidden(y > 160 && y > lastY)
        lastY = y
        setDark(surfaceIsDark())
      })
    }
    check()
    const late = setTimeout(check, 450) // after the page transition settles
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(late)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [pathname])

  useEffect(() => {
    setOpen(false)
    setHidden(false)
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (open) closeBtn.current?.focus()
    else setServicesOpen(false)
    const onKey = (e) => {
      if (e.key !== 'Escape' || !open) return
      setOpen(false)
      menuBtn.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)
  const socials = SOCIALS.filter(([key]) => settings.socials?.[key])

  return (
    <>
      <header
        data-navbar
        data-chrome
        className={`fixed inset-x-0 top-0 z-50 transition-[translate,color] duration-700 ease-cinema ${hidden ? '-translate-y-full' : 'translate-y-0'} ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <motion.nav
          aria-label="Main"
          className="site-container flex h-20 items-center justify-between sm:h-24"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        >
          <Logo light={dark} className="h-9 w-auto sm:h-11" />

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              to="/contact"
              className={`group hidden items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-500 ease-cinema sm:inline-flex ${
                dark ? 'bg-white text-ink hover:bg-violet hover:text-white' : 'bg-ink text-white hover:bg-violet'
              }`}
            >
              Get In Touch
              <ArrowRight className="size-4 transition-transform duration-500 ease-cinema group-hover:translate-x-1" />
            </Link>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={`group grid size-12 place-items-center rounded-full border transition-colors duration-500 ${
                dark ? 'border-white/35 hover:border-white hover:bg-white hover:text-ink' : 'border-ink/30 hover:border-ink hover:bg-ink hover:text-white'
              }`}
            >
              <span className="flex w-5 flex-col items-end gap-1.5" aria-hidden="true">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-3.5 bg-current transition-[width] duration-500 ease-cinema group-hover:w-5" />
              </span>
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] overflow-y-auto bg-ink text-white"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.6, ease: EASE, delay: 0.1 } }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="site-container flex min-h-full flex-col">
              <div className="flex h-20 items-center justify-between sm:h-24">
                <Logo light className="h-9 w-auto sm:h-11" onClick={close} />
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <Link
                    to="/contact"
                    onClick={close}
                    className="hidden rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors duration-500 hover:bg-violet hover:text-white sm:inline-flex"
                  >
                    Get In Touch
                  </Link>
                  <button
                    ref={closeBtn}
                    type="button"
                    onClick={() => {
                      close()
                      menuBtn.current?.focus()
                    }}
                    aria-label="Close menu"
                    className="group grid size-12 place-items-center rounded-full border border-white/35 transition-colors duration-500 hover:border-white hover:bg-white hover:text-ink"
                  >
                    <Close className="size-5 transition-transform duration-500 ease-cinema group-hover:rotate-90" />
                  </button>
                </div>
              </div>

              <nav aria-label="Site" className="my-auto py-12">
                <ul className="flex flex-col">
                  {LINKS.map((l, i) => (
                    <li key={l.to} className="overflow-hidden border-b border-white/10">
                      <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.06 }}
                      >
                        <div className="flex items-center justify-between gap-6">
                          <NavLink
                            to={l.to}
                            end={l.end}
                            onClick={close}
                            className={({ isActive }) =>
                              `group flex items-baseline gap-4 py-3 sm:gap-6 sm:py-4 ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`
                            }
                          >
                            <span className="w-7 text-xs tabular-nums text-white/40 sm:text-sm">{pad(i + 1)}</span>
                            <span className="display text-[2.6rem] transition-transform duration-700 ease-cinema group-hover:translate-x-3 sm:text-7xl lg:text-[5.5rem]">
                              {l.label}
                            </span>
                          </NavLink>
                          {l.services && services.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setServicesOpen((v) => !v)}
                              aria-expanded={servicesOpen}
                              aria-controls="menu-services"
                              aria-label={servicesOpen ? 'Hide services' : 'Show services'}
                              className={`grid size-11 shrink-0 place-items-center rounded-full border border-white/25 transition-transform duration-500 ease-cinema hover:border-white ${
                                servicesOpen ? 'rotate-45' : ''
                              }`}
                            >
                              <Plus />
                            </button>
                          )}
                        </div>
                        {l.services && (
                          <AnimatePresence initial={false}>
                            {servicesOpen && (
                              <motion.ul
                                id="menu-services"
                                className="grid gap-x-10 overflow-hidden pl-11 sm:grid-cols-2 sm:pl-[3.25rem]"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.6, ease: EASE }}
                              >
                                {services.map((s) => (
                                  <li key={s.id}>
                                    <Link
                                      to={`/services/${s.slug}`}
                                      onClick={close}
                                      className="link-underline inline-block py-2 text-lg text-white/70 transition-colors hover:text-white sm:text-xl"
                                    >
                                      {s.title}
                                    </Link>
                                  </li>
                                ))}
                                <li>
                                  <Link
                                    to="/dubai"
                                    onClick={close}
                                    className="link-underline inline-block py-2 text-lg text-white/70 transition-colors hover:text-white sm:text-xl"
                                  >
                                    SEO Services in Dubai
                                  </Link>
                                </li>
                                <li className="pb-5 sm:col-span-2" aria-hidden="true" />
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        )}
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>

              <motion.div
                className="flex flex-col gap-6 border-t border-white/10 py-8 text-sm text-white/60 lg:flex-row lg:items-center lg:justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <p className="flex flex-wrap gap-x-6 gap-y-2">
                  <a href={telHref(settings.phone)} className="link-underline hover:text-white">
                    {settings.phone}
                  </a>
                  <a href={`mailto:${settings.email}`} className="link-underline hover:text-white">
                    {settings.email}
                  </a>
                  {settings.whatsapp && (
                    <a
                      href={whatsappHref(settings.whatsapp, settings.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline inline-flex items-center gap-2 hover:text-white"
                    >
                      <WhatsApp className="size-4" /> WhatsApp us
                    </a>
                  )}
                </p>
                <ul className="flex gap-2">
                  {socials.map(([key, label, Icon]) => (
                    <li key={key}>
                      <a
                        href={settings.socials[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="grid size-11 place-items-center rounded-full border border-white/15 transition-colors duration-500 hover:border-white hover:bg-white hover:text-ink"
                      >
                        <Icon />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
