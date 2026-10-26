import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from 'motion/react'
import { EASE, Reveal, RevealLines } from '../../components/Reveal'
import Button from '../../components/Button'
import { ArrowRight } from '../../components/Icons'

const pad = (n) => String(n).padStart(2, '0')
const VIEW = { once: true, margin: '0px 0px -12% 0px' }
const INTERVAL = 5000 // ms before the panel moves on to the next service

/** Counts up to `to` once in view. Writes to the DOM directly, so it never re-renders. */
function CountUp({ to }) {
  const ref = useRef(null)
  const seen = useInView(ref, VIEW)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (!seen) return
    if (reduced) {
      ref.current.textContent = pad(to)
      return
    }
    const controls = animate(0, to, {
      duration: 1.2,
      ease: EASE,
      delay: 0.25,
      onUpdate: (v) => ref.current && (ref.current.textContent = pad(Math.round(v))),
    })
    return () => controls.stop()
  }, [seen, to, reduced])
  return (
    <span ref={ref} className="tabular-nums">
      {pad(reduced ? to : 0)}
    </span>
  )
}

/** Service image, or the branded fallback when it is missing or fails to load. */
function Visual({ service }) {
  const [failed, setFailed] = useState(false)
  return service.image && !failed ? (
    <img src={service.image} alt="" onError={() => setFailed(true)} className="size-full object-cover" />
  ) : (
    <div className="grid size-full place-items-center bg-[linear-gradient(140deg,#9700ff,#5b00a6)]">
      <img src="/images/mark.webp" alt="" className="size-12 rounded-[3px] opacity-90" />
    </div>
  )
}

/**
 * The reference's service switcher: the active service leads in large type with its description and
 * link; a numbered list below picks the active one (hover, focus or autoplay), and its image sits on the right.
 */
function Switcher({ services }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const visible = useInView(ref, { margin: '-25% 0px -25% 0px' })
  const [active, setActive] = useState(0)
  const [held, setHeld] = useState(false)
  const s = services[active]

  const running = services.length > 1 && !reduced && !held && visible
  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => setActive((a) => (a + 1) % services.length), INTERVAL)
    return () => clearTimeout(t)
  }, [running, active, services.length])

  return (
    <div
      ref={ref}
      className="mt-20 grid gap-12 border-t border-white/15 pt-14 md:mt-24 lg:grid-cols-12 lg:gap-10 lg:pt-20"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHeld(false)}
    >
      <div className="lg:col-span-6">
        <div className="min-h-[15rem] sm:min-h-[13rem]" aria-live={running ? 'off' : 'polite'}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="kicker text-[0.72rem] text-violet">{s.tagline}</p>
              <h3 className="display mt-4 text-balance text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem]">{s.title}</h3>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/65">{s.shortDescription}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8">
          <Button to={`/services/${s.slug}`} variant="outline-light">
            Explore service
          </Button>
        </div>

        <ol className="mt-14 border-t border-white/15">
          {services.map((item, i) => {
            const on = i === active
            return (
              <li key={item.id ?? item.slug} className="relative border-b border-white/15">
                <Link
                  to={`/services/${item.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-current={on ? 'true' : undefined}
                  className={`group flex items-center gap-5 py-5 transition-colors duration-500 ${on ? 'text-white' : 'text-white/35 hover:text-white/70'}`}
                >
                  <span className="w-6 text-xs font-semibold tabular-nums">{pad(i + 1)}</span>
                  <span className="display-md text-xl sm:text-2xl">{item.title}</span>
                  <ArrowRight className={`ml-auto size-5 transition-all duration-500 ease-cinema ${on ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'}`} />
                </Link>
                {/* autoplay progress for the active row */}
                {on && (
                  <motion.span
                    key={`${active}-${running}`}
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-px origin-left bg-violet"
                    initial={{ scaleX: running ? 0 : 1 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: running ? INTERVAL / 1000 : 0, ease: 'linear' }}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink-2 lg:sticky lg:top-28">
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <motion.div className="size-full" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: EASE }}>
                <Visual service={s} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <span className="absolute left-5 top-5 z-10 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">
            {pad(active + 1)} / {pad(services.length)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function ServicesShowcase({ services }) {
  return (
    <section className="bg-black py-28 text-white md:py-40">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal as="p" y={12} className="kicker mb-8 flex items-center gap-3 text-white/50">
              <span className="inline-block size-1.5 rounded-full bg-violet" aria-hidden="true" />
              Services · <CountUp to={services.length} />
            </Reveal>
            <RevealLines lines={['What we', 'can do.']} stagger={0.12} delay={0.1} className="display text-[3.6rem] leading-[0.95] sm:text-8xl lg:text-[8rem]" />
          </div>
          <div className="lg:col-span-5 lg:pb-3">
            <Reveal as="p" delay={0.3} className="display-md text-balance text-2xl leading-[1.25] sm:text-[1.75rem]">
              We build, support and scale your digital journey.
            </Reveal>
            <Reveal as="p" delay={0.4} className="mt-5 max-w-md text-pretty leading-relaxed text-white/60">
              Strategy, design, technology and marketing working together under one roof, so your brand launches faster and grows stronger.
            </Reveal>
            <Reveal delay={0.5} className="mt-8">
              <Button to="/services" variant="light">
                All services
              </Button>
            </Reveal>
          </div>
        </div>

        <Switcher services={services} />

        <Reveal y={16} className="mt-20 flex flex-col gap-6 rounded-3xl bg-white/[0.06] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <p className="max-w-lg text-pretty text-lg text-white/65">
            <span className="font-semibold text-white">Not sure where to start?</span> Tell us about your goals and we’ll recommend the right mix.
          </p>
          <Button to="/contact" variant="violet" className="shrink-0">
            Let’s talk
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
