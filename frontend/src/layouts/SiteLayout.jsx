import { useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { motion } from 'motion/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ContactCta from '../components/ContactCta'
import WhatsAppButton from '../components/WhatsAppButton'
import ScrollManager from '../components/ScrollManager'
import { EASE } from '../components/Reveal'

/**
 * Public site shell. Each navigation lifts a violet curtain off the incoming page;
 * the very first load skips it so the hero's own entrance plays uninterrupted.
 */
export default function SiteLayout() {
  const { pathname } = useLocation()
  const prev = useRef(pathname)
  const navigated = useRef(false)
  if (prev.current !== pathname) {
    navigated.current = true
    prev.current = pathname
  }
  const showCurtain = navigated.current

  return (
    <>
      <ScrollManager />
      <Navbar />
      {showCurtain && (
        <motion.div
          key={`curtain-${pathname}`}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[80] origin-top bg-violet"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
        />
      )}
      <motion.main
        id="main"
        key={pathname}
        initial={{ opacity: showCurtain ? 0 : 1, y: showCurtain ? 30 : 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: showCurtain ? 0.35 : 0 }}
      >
        <Outlet />
      </motion.main>
      {/* The homepage and contact page have their own closing call to action. */}
      {pathname !== '/contact' && pathname !== '/' && <ContactCta />}
      <Footer />
      <WhatsAppButton />
    </>
  )
}
