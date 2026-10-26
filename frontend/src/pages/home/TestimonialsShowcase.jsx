import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, Quote } from '../../components/Icons'
import { EASE, Reveal } from '../../components/Reveal'
import { initials } from '../../utils/format'

const INTERVAL = 4500 // ms between slides
const pad = (n) => String(n).padStart(2, '0')

function Avatar({ person }) {
  return person.image ? (
    <img src={person.image} alt="" width="56" height="56" className="size-14 rounded-full object-cover" />
  ) : (
    <span className="grid size-14 place-items-center rounded-full bg-lilac text-sm font-semibold text-violet-deep">{initials(person.name)}</span>
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
      className="relative overflow-hidden bg-white py-28 md:py-36"
      aria-roledescription="carousel"
      aria-label="Client success stories"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
    >
      <div className="site-container relative">
        <div className="flex flex-col items-center text-center">
          <Reveal as="p" y={12} className="kicker flex items-center gap-3 text-graphite">
            <span className="inline-block size-1.5 rounded-full bg-violet" aria-hidden="true" />
            From businesses like yours
          </Reveal>
          <Reveal as="h2" y={14} delay={0.1} className="display mt-6 text-[2.8rem] sm:text-7xl lg:text-[6rem]">
            Success <span className="chip bg-ink text-white">stories</span>
          </Reveal>
        </div>

        <div className="relative mx-auto mt-14 max-w-5xl rounded-[2rem] bg-mist px-6 py-12 sm:px-12 sm:py-16 md:mt-20">
        <Quote className="pointer-events-none absolute right-6 top-6 size-16 text-violet/20 sm:right-10 sm:top-10 sm:size-24" />
        <div className="relative grid min-h-[19rem] items-start sm:min-h-[15rem] md:min-h-[13rem]" aria-live={running ? 'off' : 'polite'}>
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
              className="col-start-1 row-start-1 grid gap-10"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
            >
              <blockquote className="display-md max-w-4xl pr-10 text-pretty sm:pr-24 text-xl leading-snug sm:text-2xl lg:text-[2rem] lg:leading-[1.3]">“{t.quote}”</blockquote>
              <figcaption className="flex items-center gap-4">
                <Avatar person={t} />
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-sm text-graphite">{t.company}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center gap-4 border-t border-ink/10 pt-6">
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
                  className="grid size-12 place-items-center rounded-full border border-ink/15 text-xs font-semibold transition-colors hover:border-ink"
                >
                  {paused ? '▶' : '❚❚'}
                </button>
              )}
              <button type="button" onClick={() => go(-1)} aria-label="Previous story" className="grid size-12 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink hover:bg-ink hover:text-white">
                <ArrowLeft />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next story" className="grid size-12 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-violet">
                <ArrowRight />
              </button>
            </div>
          )}
        </div>
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
