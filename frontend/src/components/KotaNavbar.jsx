import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import KotaLogo from './KotaLogo'
import { footerData } from '../data/kotaData'

const NAV_LINKS = [
  { to: '/portfolio', label: 'Work' },
  { to: '/about', label: 'Agency' },
  {
    to: '/services',
    label: 'Services',
    subItems: [
      { to: '/services', label: 'Brand strategy & identity' },
      { to: '/services', label: 'Web design & development' },
      { to: '/services', label: 'Growth marketing' },
    ],
  },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'Culture' },
  { to: '/contact', label: 'Contact' },
]

export default function KotaNavbar() {
  const { pathname } = useLocation()
  const [dark, setDark] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesExpanded, setServicesExpanded] = useState(false)
  const closeBtn = useRef(null)
  const menuBtn = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      // Find what section is currently under the top navbar
      const probeY = 60
      const el = document.elementFromPoint(window.innerWidth / 2, probeY)
      if (!el) return
      const darkSection = el.closest('[data-theme="dark"]') || el.closest('#work-section') || el.closest('#results-section') || el.closest('#partners-section') || el.closest('#testimonials-section') || el.closest('#articles-section') || el.closest('#faqs-section') || el.closest('#kotaverse-section') || el.closest('footer')
      setDark(Boolean(darkSection))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [pathname])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (open) closeBtn.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-500 py-4 sm:py-6 px-5 sm:px-10 lg:px-16 flex items-center justify-between ${
          open ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
        }`}
      >
        {/* Left: KOTA Logo */}
        <div className="flex items-center">
          <KotaLogo className="h-9 w-9 sm:h-10 sm:w-10" light={dark} />
        </div>

        {/* Right: Hire Us Button + Menu Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/contact"
            className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium transition-all duration-400 ease-cinema ${
              dark
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            <span>Hire us</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 17.1 15.17"
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="currentColor"
            >
              <path d="m17.1,7.58s-.01-.04-.01-.06c.01-.22-.06-.45-.24-.61L9.23.19c-.31-.27-.78-.24-1.06.07-.27.31-.24.78.07,1.06l6.26,5.52H.75c-.41,0-.75.34-.75.75s.34.75.75.75h13.74l-6.26,5.52c-.31.27-.34.75-.07,1.06.15.17.35.25.56.25.18,0,.35-.06.5-.19l7.62-6.72c.18-.16.25-.39.24-.61,0-.02.01-.04.01-.06Z" />
            </svg>
          </Link>

          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className={`relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border transition-all duration-300 ${
              dark
                ? 'border-white/30 text-white hover:border-white hover:bg-white/10'
                : 'border-black/30 text-black hover:border-black hover:bg-black/5'
            }`}
          >
            <div className="flex flex-col gap-1.5 items-center justify-center w-5">
              <span className={`block w-5 h-[2px] transition-all duration-300 ${dark ? 'bg-white' : 'bg-black'}`} />
              <span className={`block w-5 h-[2px] transition-all duration-300 ${dark ? 'bg-white' : 'bg-black'}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Fullscreen Navigation Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black text-white flex flex-col justify-between p-6 sm:p-10 lg:p-16"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between w-full">
              <KotaLogo className="h-10 w-10" light={true} />

              <div className="flex items-center gap-4">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="hidden sm:inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium bg-white text-black hover:bg-neutral-200 transition-colors"
                >
                  <span>Hire us</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 17.1 15.17"
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                  >
                    <path d="m17.1,7.58s-.01-.04-.01-.06c.01-.22-.06-.45-.24-.61L9.23.19c-.31-.27-.78-.24-1.06.07-.27.31-.24.78.07,1.06l6.26,5.52H.75c-.41,0-.75.34-.75.75s.34.75.75.75h13.74l-6.26,5.52c-.31.27-.34.75-.07,1.06.15.17.35.25.56.25.18,0,.35-.06.5-.19l7.62-6.72c.18-.16.25-.39.24-.61,0-.02.01-.04.01-.06Z" />
                  </svg>
                </Link>

                <button
                  ref={closeBtn}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/30 text-white hover:border-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menu Links */}
            <div className="my-auto py-10 max-w-4xl">
              <nav className="flex flex-col gap-4 sm:gap-6">
                {NAV_LINKS.map((link, idx) => (
                  <div key={link.label} className="group">
                    {link.subItems ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => setServicesExpanded(!servicesExpanded)}
                          className="flex items-center gap-4 text-left font-syne text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white/80 hover:text-white transition-colors"
                        >
                          <span className="text-sm sm:text-base font-sans font-normal text-white/40">
                            0{idx + 1}
                          </span>
                          <span>{link.label}</span>
                          <span className="text-2xl transition-transform duration-300">
                            {servicesExpanded ? '−' : '+'}
                          </span>
                        </button>
                        {servicesExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-8 sm:pl-12 pt-3 flex flex-col gap-2.5"
                          >
                            {link.subItems.map((sub) => (
                              <Link
                                key={sub.label}
                                to={sub.to}
                                onClick={() => setOpen(false)}
                                className="text-xl sm:text-2xl text-white/60 hover:text-white transition-colors"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <NavLink
                        to={link.to}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `flex items-baseline gap-4 font-syne text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight transition-colors ${
                            isActive ? 'text-white' : 'text-white/70 hover:text-white'
                          }`
                        }
                      >
                        <span className="text-sm sm:text-base font-sans font-normal text-white/40">
                          0{idx + 1}
                        </span>
                        <span>{link.label}</span>
                      </NavLink>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Modal Footer Banner */}
            <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-sm text-white/60">
              <div className="flex items-center gap-3">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium text-white/90">Celebrating 13 years : 2013 - 2026</span>
              </div>

              <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                {footerData.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {s.name}
                  </a>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="font-medium text-white underline underline-offset-4 hover:text-white/80"
                >
                  Start your project
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
