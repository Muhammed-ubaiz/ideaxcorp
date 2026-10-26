import { useRef } from 'react'
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import Button from '../../components/Button'
import { EASE } from '../../components/Reveal'
import { useMediaQuery, useRichMotion } from '../../hooks/useMedia'

const T = { eyebrow: 0.3, words: 0.45, chip: 1.05, cards: 1.15, copy: 1.7, rail: 2 }

/**
 * Centred headline. Every line rises out of a mask; the last line sits inside a white
 * rounded box — the inverted highlight that anchors the reference composition.
 */
function Headline({ text, shown }) {
  const lines = text.split('\n')
  return (
    <h1 className="display text-center text-[clamp(2.6rem,11vw,5rem)] leading-[1.02] lg:text-[clamp(5rem,7vw,8.25rem)]" aria-label={lines.join(' ')}>
      {lines.map((line, i) => {
        const last = i === lines.length - 1 && lines.length > 1
        return (
          <span key={i} className="block overflow-hidden pb-[0.12em]" aria-hidden="true">
            <motion.span
              className="relative inline-block"
              initial={{ y: '110%' }}
              animate={shown ? { y: '0%' } : undefined}
              transition={{ duration: 1.2, ease: EASE, delay: T.words + i * 0.14 }}
            >
              {last ? (
                <span className="relative inline-block px-[0.2em]">
                  <motion.span
                    className="absolute inset-0 origin-left rounded-[0.2em] bg-white"
                    initial={{ scaleX: 0 }}
                    animate={shown ? { scaleX: 1 } : undefined}
                    transition={{ duration: 0.9, ease: EASE, delay: T.chip }}
                  />
                  <motion.span
                    className="relative"
                    initial={{ color: '#ffffff' }}
                    animate={shown ? { color: '#0e0b12' } : undefined}
                    transition={{ duration: 0.5, delay: T.chip + 0.35 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ) : (
                line
              )}
            </motion.span>
          </span>
        )
      })}
    </h1>
  )
}

/** A speech-bubble tag that pins a work category to a card. */
function Tag({ children, className = '' }) {
  return (
    <span
      className={`absolute z-10 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-[7px] after:border-transparent after:border-t-white ${className}`}
    >
      @{children}
    </span>
  )
}

/**
 * Real portfolio images fanned out in an arc of tilted, rounded cards. They deal in from below,
 * follow the pointer slightly at different depths, and straighten and lift on hover.
 */
function CardFan({ cards, sx, sy, rich, compact, shown }) {
  const n = cards.length
  const mid = (n - 1) / 2
  const spread = compact ? 21 : 15 // % of the row between card centres
  const tagged = new Set([0, Math.floor(mid), n - 1])

  return (
    <div className="relative mx-auto h-[14rem] w-full max-w-[96rem] sm:h-[19rem] lg:h-[22rem]">
      {cards.map((c, i) => {
        const o = i - mid
        const rot = o * (compact ? 7 : 5.5)
        const lift = Math.abs(o) * Math.abs(o) * (compact ? 10 : 12)
        return (
          <FanCard
            key={c.id ?? i}
            card={c}
            left={50 + o * spread}
            rot={rot}
            lift={lift}
            depth={14 + Math.abs(o) * 10}
            sx={sx}
            sy={sy}
            rich={rich}
            shown={shown}
            z={n - Math.abs(Math.round(o))}
            delay={T.cards + Math.abs(o) * 0.08}
            tag={tagged.has(i) && c.category ? c.category : null}
            tagBelow={i === Math.floor(mid)}
          />
        )
      })}
    </div>
  )
}

function FanCard({ card, left, rot, lift, depth, sx, sy, rich, shown, z, delay, tag, tagBelow }) {
  const x = useTransform(sx, [-0.5, 0.5], [depth, -depth])
  const y = useTransform(sy, [-0.5, 0.5], [depth * 0.5, -depth * 0.5])
  return (
    <motion.div
      className="absolute top-0 w-[38%] -translate-x-1/2 sm:w-[30%] lg:w-[22%]"
      style={{ left: `${left}%`, zIndex: z, x: rich ? x : 0, y: rich ? y : 0 }}
    >
      <motion.figure
        className="group relative"
        initial={{ opacity: 0, y: 260, rotate: 0 }}
        animate={shown ? { opacity: 1, y: lift, rotate: rot } : undefined}
        whileHover={rich ? { rotate: 0, y: lift - 24, scale: 1.04, zIndex: 30 } : undefined}
        transition={{ duration: 1.4, ease: EASE, delay }}
      >
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-ink-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10 sm:rounded-3xl">
          <img src={card.image} alt="" className="size-full object-cover object-top transition-transform duration-[1.2s] ease-cinema group-hover:scale-105" />
        </div>
        {tag && (
          <motion.span
            className="contents"
            initial={{ opacity: 0 }}
            animate={shown ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: delay + 0.9 }}
          >
            <Tag className={tagBelow ? '-bottom-12 left-1/2 hidden -translate-x-1/2 rotate-[-4deg] after:bottom-full after:top-auto after:border-b-white after:border-t-transparent sm:block' : '-top-10 left-1/2 hidden -translate-x-1/2 rotate-[-6deg] sm:block'}>
              {tag}
            </Tag>
          </motion.span>
        )}
      </motion.figure>
    </motion.div>
  )
}

/** Endless strip of the markets the agency serves. */
function Ticker({ items }) {
  const row = [...items, ...items, ...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-white/10 py-4 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="animate-marquee flex w-max" style={{ '--marquee-duration': '40s' }}>
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {row.map((m, i) => (
              <li key={i} className="flex items-center gap-8 pr-8 text-lg font-semibold text-white/55 sm:text-xl">
                {m}
                <span className="size-1.5 rounded-full bg-violet" aria-hidden="true" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default function Hero({ settings, work }) {
  const ref = useRef(null)
  const rich = useRichMotion()
  const compact = !useMediaQuery('(min-width: 1024px)')

  // Pointer parallax for the cards (desktop only), normalised to -0.5…0.5.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 18 })
  const sy = useSpring(my, { stiffness: 50, damping: 18 })

  // As the hero scrolls away the headline lifts and the cards sink, for depth.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const headY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const fanY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // The hero rises over the logo intro, so its entrance plays as it scrolls into view, not on load.
  const shown = useInView(ref, { once: true, margin: '0px 0px -30% 0px' })

  const cards = work.filter((w) => w.image).slice(0, compact ? 5 : 6)

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-black pt-32 text-white sm:pt-40"
      onPointerMove={(e) => {
        if (!rich) return
        mx.set(e.clientX / window.innerWidth - 0.5)
        my.set(e.clientY / window.innerHeight - 0.5)
      }}
    >
      <div aria-hidden="true" className="absolute left-1/2 top-[28%] -z-10 h-[30rem] w-[60rem] max-w-full -translate-x-1/2 rounded-full bg-violet/25 blur-[140px]" />

      <motion.div className="site-container relative z-10" style={{ y: rich ? headY : 0, opacity: fade }}>
        <motion.p
          className="eyebrow mb-8 flex items-center justify-center gap-3 text-center text-white/55"
          initial={{ opacity: 0, y: 14 }}
          animate={shown ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease: EASE, delay: T.eyebrow }}
        >
          <img src="/images/mark.webp" alt="" className="size-5 rounded-[3px]" />
          {settings.heroEyebrow}
        </motion.p>
        <Headline text={settings.heroTitle} shown={shown} />
      </motion.div>

      {cards.length > 0 && (
        <motion.div className="relative mt-14 overflow-x-clip px-3 sm:mt-16" style={{ y: rich ? fanY : 0 }}>
          <CardFan cards={cards} sx={sx} sy={sy} rich={rich} compact={compact} shown={shown} />
        </motion.div>
      )}

      <div className="site-container relative z-10 mt-14 flex flex-col items-center text-center sm:mt-16">
        <motion.p
          className="max-w-2xl text-pretty text-lg leading-relaxed text-white/70 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={shown ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.1, ease: EASE, delay: T.copy }}
        >
          {settings.heroSubtitle}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={shown ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.1, ease: EASE, delay: T.copy + 0.12 }}
        >
          <Button to="/portfolio" variant="light">
            Explore our work
          </Button>
          <Button to="/contact" variant="outline-light">
            Let’s talk
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="mt-20 sm:mt-24"
        initial={{ opacity: 0 }}
        animate={shown ? { opacity: 1 } : undefined}
        transition={{ duration: 1.2, delay: T.rail }}
      >
        <Ticker items={settings.markets} />
        <div className="site-container flex items-center justify-between gap-6 py-6 pr-20">
          <a href="#intro" className="group flex items-center gap-3 text-sm text-white/55 hover:text-white">
            <span className="relative h-10 w-px overflow-hidden bg-white/15">
              <span className="animate-scroll-cue absolute left-0 top-0 h-3 w-px bg-violet" />
            </span>
            Scroll to explore
          </a>
        </div>
      </motion.div>
    </section>
  )
}
