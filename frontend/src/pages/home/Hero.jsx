import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import Button from '../../components/Button'
import Magnetic from '../../components/motion/Magnetic'
import { Play } from '../../components/Icons'
import { EASE } from '../../components/Reveal'
import { useMediaQuery, useRichMotion } from '../../hooks/useMedia'
import Monolith from './Monolith'

const T = { bg: 0, mark: 0.35, words: 0.6, visual: 0.9, copy: 1.45, details: 1.8 }

function Headline({ text }) {
  const lines = text.split('\n')
  let n = 0
  return (
    <h1 className="display text-[clamp(2.5rem,10.6vw,5.75rem)] lg:text-[clamp(4.5rem,6.3vw,8rem)] leading-[0.86] tracking-[-0.045em]" aria-label={lines.join(' ')}>
      {lines.map((line, li) => {
        const words = line.split(' ')
        return (
          <span key={li} className="block whitespace-nowrap" aria-hidden="true">
            {words.map((w, wi) => {
              const i = n++
              const last = li === lines.length - 1 && wi === words.length - 1
              return (
                <span key={wi} className="mr-[0.2em] inline-block overflow-hidden pb-[0.06em] align-top last:mr-0">
                  <motion.span
                    className={`inline-block ${last ? 'text-violet' : ''}`}
                    initial={{ y: '110%', rotate: 4 }}
                    animate={{ y: '0%', rotate: 0 }}
                    transition={{ duration: 1.3, ease: EASE, delay: T.words + i * 0.13 }}
                  >
                    {w}
                  </motion.span>
                </span>
              )
            })}
          </span>
        )
      })}
    </h1>
  )
}

/** A real work image floating at a given depth around the mark. */
function FloatCard({ src, label, className, depth, sx, sy, delay }) {
  const x = useTransform(sx, [-0.5, 0.5], [depth, -depth])
  const y = useTransform(sy, [-0.5, 0.5], [depth * 0.6, -depth * 0.6])
  return (
    <motion.figure
      className={`absolute overflow-hidden rounded-md border border-white/10 bg-ink-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ${className}`}
      style={{ x, y }}
      initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
      transition={{ duration: 1.5, ease: EASE, delay }}
    >
      <img src={src} alt="" className="size-full object-cover" />
      {label && (
        <figcaption className="eyebrow absolute bottom-2 left-2 rounded-sm bg-ink/75 px-2 py-1 text-[0.62rem] text-white/80 backdrop-blur">{label}</figcaption>
      )}
    </motion.figure>
  )
}

export default function Hero({ settings, work, onShowreel }) {
  const ref = useRef(null)
  const rich = useRichMotion()
  const large = useMediaQuery('(min-width: 1024px)')

  // Pointer parallax (desktop only) — normalised to -0.5…0.5.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 18 })
  const sy = useSpring(my, { stiffness: 50, damping: 18 })
  const rotY = useTransform(sx, [-0.5, 0.5], [-34, -10])
  const rotX = useTransform(sy, [-0.5, 0.5], [20, 4])
  const bgX = useTransform(sx, [-0.5, 0.5], [24, -24])

  // As the hero scrolls away, copy lifts and the visual sinks for depth.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const cards = work.filter((w) => w.image).slice(0, 3)

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white"
      onPointerMove={(e) => {
        if (!rich) return
        mx.set(e.clientX / window.innerWidth - 0.5)
        my.set(e.clientY / window.innerHeight - 0.5)
      }}
    >
      {/* Background: purple glass render, fine grid and drawn guide lines */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.4, ease: 'easeOut', delay: T.bg }}
      >
        <motion.img
          src="/images/glow-wave.webp"
          alt=""
          className="absolute right-[-10%] top-0 h-full w-[85%] object-cover opacity-60 [mask-image:linear-gradient(to_left,black_35%,transparent_95%)] lg:w-[70%]"
          style={{ x: rich ? bgX : 0 }}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3.2, ease: EASE }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(ellipse_at_30%_40%,black_20%,transparent_75%)]" />
        <div className="absolute -left-40 top-1/3 size-[36rem] rounded-full bg-violet/20 blur-[140px]" />
        <motion.span
          className="absolute left-0 top-[22%] h-px w-full origin-left bg-gradient-to-r from-violet/70 via-white/15 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.2, ease: EASE, delay: T.details }}
        />
        <motion.span
          className="absolute bottom-[18%] right-0 h-px w-2/3 origin-right bg-gradient-to-l from-violet/60 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.2, ease: EASE, delay: T.details + 0.2 }}
        />
      </motion.div>

      <div className="site-container relative flex flex-1 flex-col pt-28 pb-8 md:pt-32">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-12">
          {/* Copy */}
          <motion.div className="relative z-10 lg:col-span-7" style={{ y: copyY, opacity: fade }}>
            <motion.div
              className="mb-8 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: T.mark }}
            >
              <img src="/images/mark.webp" alt="" className="size-7 rounded-[3px]" />
              <span className="eyebrow text-white/60">{settings.heroEyebrow}</span>
            </motion.div>

            <Headline text={settings.heroTitle} />

            <motion.p
              className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-white/65 md:text-xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: T.copy }}
            >
              {settings.heroSubtitle}
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: T.copy + 0.15 }}
            >
              <Magnetic>
                <Button to="/portfolio" variant="violet">
                  Explore our work
                </Button>
              </Magnetic>
              <Magnetic>
                <Button to="/contact" variant="outline-light">
                  Let’s talk
                </Button>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Visual: the mark, orbit and real work */}
          <motion.div className="relative mx-auto h-[19rem] w-full max-w-md sm:h-[24rem] lg:col-span-5 lg:h-[34rem] lg:max-w-none" style={{ y: visualY }}>
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 400 400"
              className="animate-spin-slower absolute left-1/2 top-1/2 size-[115%] -translate-x-1/2 -translate-y-1/2 text-white/15"
              fill="none"
            >
              <motion.ellipse
                cx="200"
                cy="200"
                rx="190"
                ry="120"
                stroke="currentColor"
                strokeDasharray="2 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.4, ease: EASE, delay: T.visual }}
              />
            </motion.svg>
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <Monolith size={large ? 300 : 170} rotateX={rich ? rotX : 14} rotateY={rich ? rotY : -24} delay={T.visual} />
            </div>
            {cards[0] && (
              <FloatCard src={cards[0].image} label={cards[0].category} depth={36} sx={sx} sy={sy} delay={T.visual + 0.5} className="left-0 top-0 z-0 h-36 w-28 sm:h-44 sm:w-36 lg:-left-20 lg:top-[-4%] lg:h-56 lg:w-44" />
            )}
            {cards[1] && (
              <FloatCard src={cards[1].image} label={cards[1].category} depth={58} sx={sx} sy={sy} delay={T.visual + 0.7} className="bottom-0 right-0 z-20 h-32 w-28 sm:h-40 sm:w-32 lg:h-48 lg:w-40" />
            )}
            {cards[2] && (
              <FloatCard src={cards[2].image} depth={22} sx={sx} sy={sy} delay={T.visual + 0.9} className="right-[4%] top-[2%] z-0 hidden h-28 w-24 opacity-70 lg:block" />
            )}
          </motion.div>
        </div>

        {/* Bottom rail: scroll cue, markets, showreel */}
        <motion.div
          className="mt-10 flex items-end justify-between gap-6 border-t border-white/10 pt-6 pr-16 sm:pr-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: T.details }}
        >
          <a href="#intro" className="group flex items-center gap-3 text-sm text-white/60 hover:text-white">
            <span className="relative h-10 w-px overflow-hidden bg-white/15">
              <span className="animate-scroll-cue absolute left-0 top-0 h-3 w-px bg-violet" />
            </span>
            Scroll to explore
          </a>
          <p className="eyebrow hidden text-white/45 md:block">{settings.markets.join(' · ')}</p>
          {onShowreel && (
            <button type="button" onClick={onShowreel} className="group flex items-center gap-3 text-sm font-semibold">
              <span className="grid size-10 place-items-center rounded-[4px] bg-white/10 transition-colors group-hover:bg-violet">
                <Play className="size-4" />
              </span>
              <span className="hidden sm:inline">Watch showreel</span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  )
}
