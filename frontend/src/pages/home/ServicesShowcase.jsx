import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { EASE, Reveal, RevealLines } from '../../components/Reveal'
import ArrowTile from '../../components/ArrowTile'
import Button from '../../components/Button'
import { useRichMotion } from '../../hooks/useMedia'

const pad = (n) => String(n).padStart(2, '0')
// same trigger line as <Reveal>, so the header pieces fire together
const VIEW = { once: true, margin: '0px 0px -12% 0px' }

/*
  Row choreography: the row is the trigger and its parts follow in order —
  divider draws, number and connector, title out of its mask, copy, then the image opens.
*/
const row = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }
const fadeUp = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }
const maskUp = { hidden: { y: '106%' }, show: { y: '0%', transition: { duration: 1.1, ease: EASE } } }
const draw = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.4, ease: EASE } } }
const frame = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.3, ease: EASE, delay: 0.1 } },
}
const settle = { hidden: { scale: 1.1 }, show: { scale: 1, transition: { duration: 1.6, ease: EASE, delay: 0.1 } } }

/** Counts up to `to` alongside its label's reveal. Writes to the DOM directly, so it never re-renders. */
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

/** Drifts its child a few percent with scroll. Only mounted where rich motion is wanted. */
function Drift({ children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])
  return (
    <motion.div ref={ref} style={{ y }} className="absolute inset-x-0 inset-y-[-4%]">
      {children}
    </motion.div>
  )
}

/**
 * Service image in a fixed 3:2 frame (the source ratio). The frame opens with a mask while the photo
 * settles from a slight zoom; on desktop it then drifts gently with scroll inside the frame.
 */
function Visual({ service, rich }) {
  const [failed, setFailed] = useState(false)
  const Layer = rich ? Drift : 'div'
  return (
    <motion.div variants={frame} className="relative aspect-[3/2] overflow-hidden rounded-xl bg-ink">
      {service.image && !failed ? (
        <Layer {...(rich ? {} : { className: 'absolute inset-0' })}>
          <motion.img
            variants={settle}
            src={service.image}
            alt=""
            loading="lazy"
            width="450"
            height="300"
            onError={() => setFailed(true)}
            className="size-full object-cover object-center transition-[scale] duration-900 ease-cinema group-hover:scale-[1.05]"
          />
        </Layer>
      ) : (
        <div className="grid size-full place-items-center bg-[linear-gradient(140deg,#9700ff,#5b00a6)]">
          <img src="/images/mark.webp" alt="" className="size-10 rounded-[3px] opacity-90" />
        </div>
      )}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
    </motion.div>
  )
}

/**
 * One editorial row. Mobile stacks head → image → copy; tablet puts the image beside the text;
 * desktop runs head | copy | image across the row on a shared 12-column grid.
 */
function ServiceRow({ service, index, rich }) {
  const reduced = useReducedMotion()
  return (
    <motion.li
      className="relative"
      variants={row}
      initial={reduced ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* while the list is hovered (mouse only), every other row recedes so the active one leads */}
      <Link
        to={`/services/${service.slug}`}
        className="group relative block py-10 transition-opacity duration-400 ease-cinema md:py-12 lg:-mx-6 lg:px-6 lg:[@media(hover:hover)]:group-hover/list:not-[&:hover]:opacity-45"
      >
        {/* tint sweeps in from the left and retracts the same way, so leaving mid-sweep never jumps */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 inset-y-3 hidden origin-left scale-x-0 rounded-2xl bg-mist transition-transform duration-500 ease-cinema group-hover:scale-x-100 lg:block"
        />
        <div className="relative grid grid-cols-1 items-start gap-y-6 md:grid-cols-12 md:gap-x-8 lg:gap-x-10">
          <div className="md:col-span-7 lg:col-span-5">
            <motion.p variants={fadeUp} className="eyebrow flex items-center gap-3 text-[0.75rem]">
              <span className="tabular-nums text-violet">{pad(index + 1)}</span>
              <motion.span
                variants={draw}
                className="h-px w-8 origin-left bg-line transition-[width,background-color] duration-500 ease-cinema group-hover:w-12 group-hover:bg-violet"
                aria-hidden="true"
              />
              <span className="min-w-0 text-smoke">{service.tagline}</span>
            </motion.p>
            <h3 className="display-md mt-5 text-balance text-[1.9rem] leading-[1.04] text-ink transition-transform duration-500 ease-cinema sm:text-[2.4rem] lg:text-[2.5rem] lg:group-hover:translate-x-2 xl:text-[2.85rem]">
              <span className="mb-[-0.12em] block overflow-hidden pb-[0.12em]">
                <motion.span variants={maskUp} className="block">
                  {service.title}
                </motion.span>
              </span>
            </h3>
          </div>

          <div className="md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1 lg:col-span-3 lg:col-start-10 lg:row-span-1">
            <Visual service={service} rich={rich} />
          </div>

          <div className="md:col-span-7 md:row-start-2 lg:col-span-4 lg:col-start-6 lg:row-start-1 lg:pt-[2.05rem]">
            <motion.p variants={fadeUp} className="max-w-md text-pretty leading-relaxed text-graphite">
              {service.shortDescription}
            </motion.p>
            <motion.span variants={fadeUp} className="mt-6 inline-flex items-center gap-4 text-sm font-semibold text-ink">
              <span className="link-underline">Explore service</span>
              <ArrowTile size="sm" />
            </motion.span>
          </div>
        </div>
      </Link>
      {/* divider draws across once the row arrives */}
      <motion.span variants={draw} aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left bg-line" />
    </motion.li>
  )
}

export default function ServicesShowcase({ services }) {
  const reduced = useReducedMotion()
  // one media query for the whole list rather than one per row
  const rich = useRichMotion()
  return (
    <section className="bg-paper py-28 md:py-40">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal as="p" y={12} className="eyebrow mb-8 flex items-center gap-3 text-graphite">
              <motion.span
                className="inline-block size-2 bg-violet"
                aria-hidden="true"
                initial={reduced ? false : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={VIEW}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              />
              Services · <CountUp to={services.length} />
            </Reveal>
            <RevealLines
              lines={['What we', 'can do.']}
              stagger={0.12}
              delay={0.1}
              className="display text-[3.6rem] leading-[0.88] text-ink sm:text-8xl lg:text-[7.5rem] xl:text-[8.5rem]"
            />
          </div>
          <div className="lg:col-span-5 lg:pb-3">
            <Reveal as="p" delay={0.3} className="display-md text-balance text-2xl leading-[1.2] text-ink sm:text-[1.75rem]">
              We build, support and scale your digital journey.
            </Reveal>
            <Reveal as="p" delay={0.4} className="mt-5 max-w-md text-pretty leading-relaxed text-graphite">
              Strategy, design, technology and marketing working together under one roof, so your brand launches faster and grows stronger.
            </Reveal>
            <Reveal delay={0.5} className="mt-8">
              <Button to="/services" variant="outline">
                All services
              </Button>
            </Reveal>
          </div>
        </div>

        {/* the list's top rule draws in before the rows arrive */}
        <motion.div
          aria-hidden="true"
          className="mt-20 h-px origin-left bg-ink md:mt-24"
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEW}
          transition={{ duration: 1.3, ease: EASE }}
        />
        <ul className="group/list">
          {services.map((s, i) => (
            <ServiceRow key={s.id ?? s.slug} service={s} index={i} rich={rich} />
          ))}
        </ul>

        <Reveal y={16} className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-lg text-graphite text-pretty">
            <span className="font-semibold text-ink">Not sure where to start?</span> Tell us about your goals and we’ll recommend the right mix.
          </p>
          <Button to="/contact" className="shrink-0">
            Let’s talk
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
