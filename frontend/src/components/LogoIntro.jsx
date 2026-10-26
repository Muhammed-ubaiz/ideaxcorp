import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import { EASE } from './Reveal'
import { useMediaQuery, useRichMotion } from '../hooks/useMedia'

const LOGO = '/images/logo-light.webp'
const SEEN_KEY = 'ideaxcorp:intro-seen'
const DEPTH = 10 // extrusion layers behind the face of the logo
const STEP = 1.6 // px between layers
const CHROME_AT = 0.5 // scroll progress at which the navbar returns

/** The full film plays once per browser session; later visits get a shorter version of the same reveal. */
function firstVisit() {
  try {
    if (sessionStorage.getItem(SEEN_KEY)) return false
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    // Storage blocked: just play the full intro.
  }
  return true
}

/**
 * Full-screen brand opener shown before a section (its children): only the logo, revealed as a
 * dimensional object turning to face the viewer. The stage stays pinned while the children scroll
 * up over it like a curtain, and the logo recedes, lifts and fades as they rise. Plain document
 * scroll throughout: no timers, no scroll-jacking.
 */
export default function LogoIntro({ children }) {
  const ref = useRef(null)
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const rich = useRichMotion()
  const full = useRef(null)
  if (full.current === null) full.current = firstVisit()
  const at = (t) => t * (full.current ? 1 : 0.4) // timeline compression on repeat visits

  // 0 → 1 while the next section's top edge travels from the bottom of the viewport to the top.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const logoScale = useTransform(scrollYProgress, [0, 0.7], [1, reduced ? 1 : 0.8])
  const logoY = useTransform(scrollYProgress, [0, 0.7], [0, reduced ? 0 : -80])
  const logoOpacity = useTransform(scrollYProgress, [0.05, 0.55], [1, 0])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // The logo tips back as it recedes, and follows the pointer slightly on desktop.
  const px = useSpring(useMotionValue(0), { stiffness: 40, damping: 16 })
  const py = useSpring(useMotionValue(0), { stiffness: 40, damping: 16 })
  const scrollTilt = useTransform(scrollYProgress, [0, 0.7], [0, reduced ? 0 : 18])
  const tiltX = useTransform([scrollTilt, py], ([s, p]) => s - p * 8)
  const tiltY = useTransform(px, (p) => p * 12)

  // The intro screen holds only the logo: the site chrome (navbar, floating buttons) is hidden via
  // <html data-intro> until the hero is half way up the screen, and returns if the visitor scrolls back.
  const setIntro = (p) => document.documentElement.toggleAttribute('data-intro', p < CHROME_AT)
  useMotionValueEvent(scrollYProgress, 'change', setIntro)
  useEffect(() => {
    setIntro(scrollYProgress.get())
    return () => document.documentElement.removeAttribute('data-intro')
  }, [scrollYProgress])

  return (
    <div className="relative bg-black">
      <section
        aria-label="Ideaxcorp"
        className="sticky top-0 flex h-svh items-center justify-center overflow-hidden"
        onPointerMove={(e) => {
          if (!rich) return
          px.set(e.clientX / window.innerWidth - 0.5)
          py.set(e.clientY / window.innerHeight - 0.5)
        }}
        onPointerLeave={() => {
          px.set(0)
          py.set(0)
        }}
      >
        {/* Ambient light: the hero's violet, cooled toward blue at the edges. Radial gradients, no blur filters. */}
        <motion.div aria-hidden="true" className="absolute inset-0" style={{ opacity: glowOpacity }}>
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_50%,rgba(151,0,255,0.22),rgba(80,90,255,0.08)_55%,transparent_75%)]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: at(2.6), ease: EASE, delay: at(0.6) }}
          />
        </motion.div>

        <motion.div className="relative px-4" style={{ scale: logoScale, y: logoY, opacity: logoOpacity }}>
          {/* Fade and blur live out here: opacity or filter inside the 3D context would flatten it. */}
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)' }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: reduced ? 0.6 : at(1.2), ease: EASE, delay: at(0.2) }}
            style={{ perspective: 1200 }}
          >
            <motion.div className="relative w-[min(76vw,32rem)]" style={{ transformStyle: 'preserve-3d', rotateX: tiltX, rotateY: tiltY }}>
              <motion.div
                className="relative"
                style={{ transformStyle: 'preserve-3d' }}
                initial={reduced ? false : { rotateY: -34, rotateX: 12, z: -220, scale: 0.94 }}
                animate={{ rotateY: 0, rotateX: 0, z: 0, scale: 1 }}
                // A slow in-out turn, so the rotation reads while the logo is fully visible.
                transition={{ duration: at(2.8), ease: [0.45, 0, 0.15, 1], delay: at(0.2) }}
              >
                {/* Extrusion: darkened copies of the logo stepped back in depth give it real thickness. */}
                {!reduced &&
                  Array.from({ length: DEPTH }, (_, i) => (
                    <img
                      key={i}
                      src={LOGO}
                      alt=""
                      aria-hidden="true"
                      width="798"
                      height="374"
                      className="absolute inset-0 h-auto w-full"
                      style={{ transform: `translateZ(${-(i + 1) * STEP}px)`, filter: `brightness(${0.45 - i * 0.03}) saturate(1.2)` }}
                    />
                  ))}
                <img
                  src={LOGO}
                  alt="Ideaxcorp"
                  width="798"
                  height="374"
                  fetchPriority="high"
                  className="relative block h-auto w-full drop-shadow-[0_0_28px_rgba(120,80,255,0.28)]"
                />
                {/* Light sweep, masked to the logo's own shape so it only catches the mark and letters. */}
                {!reduced && (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage: 'linear-gradient(105deg, transparent 36%, rgba(150,170,255,0.6) 46%, rgba(240,235,255,0.95) 50%, transparent 62%)',
                      backgroundSize: '250% 100%',
                      mixBlendMode: 'overlay',
                      WebkitMaskImage: `url(${LOGO})`,
                      maskImage: `url(${LOGO})`,
                      WebkitMaskSize: '100% 100%',
                      maskSize: '100% 100%',
                    }}
                    initial={{ backgroundPosition: '150% 0%', opacity: 1 }}
                    animate={{ backgroundPosition: '-50% 0%', opacity: [1, 1, 0] }}
                    transition={{ duration: at(1.8), ease: [0.65, 0, 0.35, 1], delay: at(2.1) }}
                  />
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* The next section rises over the pinned stage; a soft edge melts it into the same black. */}
      <div ref={ref} className="relative z-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 h-40 bg-linear-to-b from-transparent to-black" />
        {children}
      </div>
    </div>
  )
}
