import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, Quote } from '../../components/Icons'
import { EASE, Reveal } from '../../components/Reveal'
import { initials } from '../../utils/format'

const INTERVAL = 4500 // ms between slides
const pad = (n) => String(n).padStart(2, '0')

function Avatar({ person }) {
  return person.image ? (
    <img src={person.image} alt="" width="48" height="48" className="size-12 rounded-[4px] object-cover" />
  ) : (
    <span className="grid size-12 place-items-center rounded-[4px] bg-lilac text-sm font-semibold text-violet-deep">{initials(person.name)}</span>
  )
}

function Carousel({ items }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const visible = useInView(ref, { margin: '-20% 0px -20% 0px' })
  const [[i, dir], setSlide] = useState([0, 1])
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [paused, setPaused] = useState(false) // explicit user choice
  const [tabHidden, setTabHidden] = useState(false)
  const count = items.length

  const go = useCallback((d) => setSlide(([n]) => [(n + d + count) % count, d]), [count])

  useEffect(() => {
    const on = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', on)
    return () => document.removeEventListener('visibilitychange', on)
  }, [])

  const running = count > 1 && !reduced && !paused && !hovered && !focused && visible && !tabHidden
  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => go(1), INTERVAL)
    return () => clearTimeout(t)
  }, [running, i, go])

  const t = items[Math.min(i, count - 1)]

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-mist py-20 md:py-24"
      aria-roledescription="carousel"
      aria-label="Client success stories"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
    >
      <Quote className="animate-float-slow pointer-events-none absolute -right-6 -top-4 size-56 text-violet/[0.07] md:size-72" />
      <div className="site-container relative">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal as="h2" y={14} className="display-md text-3xl sm:text-4xl">
            Success stories
          </Reveal>
          <Reveal as="p" y={12} delay={0.1} className="eyebrow text-graphite">
            From businesses like yours
          </Reveal>
        </div>

        <div className="mt-10 grid min-h-[17rem] items-start sm:min-h-[13rem] md:min-h-[11rem]" aria-live={running ? 'off' : 'polite'}>
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.figure
              key={i}
              custom={dir}
              variants={{
                enter: (d) => ({ opacity: 0, x: d * 40 }),
                center: { opacity: 1, x: 0 },
                exit: (d) => ({ opacity: 0, x: d * -40 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: EASE }}
              className="col-start-1 row-start-1 grid gap-8 md:grid-cols-[1fr_auto] md:items-end"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
            >
              <blockquote className="display-md max-w-4xl text-pretty text-xl leading-snug sm:text-2xl lg:text-[1.85rem] lg:leading-[1.3]">“{t.quote}”</blockquote>
              <figcaption className="flex items-center gap-4 md:min-w-[16rem] md:justify-end">
                <Avatar person={t} />
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-sm text-graphite">{t.company}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center gap-4 border-t border-line pt-5">
          <p className="eyebrow shrink-0 text-graphite">
            <span className="text-ink">{pad(i + 1)}</span> / {pad(count)}
          </p>
          {/* Fills over the slide's lifetime while autoplay is running. */}
          <div className="h-px flex-1 overflow-hidden bg-line" aria-hidden="true">
            <motion.div
              key={`${i}-${running}`}
              className="h-px origin-left bg-violet"
              initial={{ scaleX: running ? 0 : 1 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: running ? INTERVAL / 1000 : 0, ease: 'linear' }}
            />
          </div>
          {count > 1 && (
            <div className="flex shrink-0 gap-2">
              {!reduced && (
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? 'Play success stories' : 'Pause success stories'}
                  className="grid size-11 place-items-center rounded-md border border-ink/15 text-xs font-semibold transition-colors hover:border-ink"
                >
                  {paused ? '▶' : '❚❚'}
                </button>
              )}
              <button type="button" onClick={() => go(-1)} aria-label="Previous story" className="grid size-11 place-items-center rounded-md border border-ink/15 transition-colors hover:border-ink hover:bg-ink hover:text-white">
                <ArrowLeft />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next story" className="grid size-11 place-items-center rounded-md bg-ink text-white transition-colors hover:bg-violet">
                <ArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * Stories arrive asynchronously; the carousel mounts only once they exist so its
 * visibility observer attaches to a real element.
 */
export default function TestimonialsShowcase({ items }) {
  return items.length ? <Carousel items={items} /> : null
}
