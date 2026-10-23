import { Component, lazy, Suspense, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import Button from '../../components/Button'
import { EASE } from '../../components/Reveal'
import { useCollection } from '../../hooks/useContent'
import { paragraphs } from '../../utils/format'

// three.js is large, so the scene is split into its own chunk and only fetched near the viewport.
const StoryScene = lazy(() => import('./StoryScene'))

const MILESTONES = [
  { place: 'UAE', title: 'Where it started', text: 'A focused digital marketing and e-commerce agency.' },
  { place: 'GCC', title: 'Across the region', text: 'Grew into Qatar, KSA and Oman.' },
  { place: 'Kerala', title: 'A complete system', text: 'Full digital marketing and e-commerce solutions at every stage.' },
]

// Shared stagger: children fade up one after another once the column scrolls into view.
const column = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

export default function OurStory({ settings }) {
  const { data: services } = useCollection('services')
  const [intro, offer, ...rest] = paragraphs(settings.aboutStory)

  const metrics = [
    { value: settings.markets.length, label: 'Markets' },
    { value: settings.offices.length, label: 'Offices' },
    { value: services.length, label: 'Core services' },
  ].filter((m) => m.value > 0)

  return (
    <section aria-labelledby="our-story-title" className="relative overflow-hidden bg-white py-24 text-ink md:py-36">
      <div className="site-container grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* ── Narrative ─────────────────────────────────────────── */}
        <motion.div
          className="lg:col-span-6"
          variants={column}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        >
          <motion.p
            variants={item}
            className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 px-4 py-2 text-graphite backdrop-blur-md"
          >
            <span className="size-1.5 rounded-full bg-violet shadow-[0_0_10px_1px] shadow-violet/50" aria-hidden="true" />
            Our story
          </motion.p>

          <motion.h2 id="our-story-title" variants={item} className="display mt-8 text-balance text-[2.6rem] sm:text-6xl lg:text-[4.2rem]">
            Built on data<span className="text-violet">,</span> grown across borders<span className="text-violet">.</span>
          </motion.h2>

          {intro && (
            <motion.p variants={item} className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-ink/80 md:text-xl">
              {intro}
            </motion.p>
          )}
          {offer && (
            <motion.p variants={item} className="mt-4 max-w-xl text-pretty leading-relaxed text-graphite">
              {offer}
            </motion.p>
          )}

          {/* Timeline */}
          <motion.ol variants={column} className="relative mt-12 space-y-7 border-l border-line pl-7">
            {MILESTONES.map((m) => (
              <motion.li key={m.place} variants={item} className="relative">
                <span
                  className="absolute -left-[calc(1.75rem+4.5px)] top-1.5 size-2 rounded-full bg-violet ring-4 ring-white"
                  aria-hidden="true"
                />
                <p className="eyebrow text-violet">{m.place}</p>
                <p className="mt-1.5 font-semibold">{m.title}</p>
                <p className="text-sm text-graphite">{m.text}</p>
              </motion.li>
            ))}
          </motion.ol>

          {/* Metrics */}
          {metrics.length > 0 && (
            <motion.dl variants={column} className="mt-12 grid grid-cols-3 gap-3">
              {metrics.map((m) => (
                <motion.div
                  key={m.label}
                  variants={item}
                  className="rounded-lg border border-line bg-white/70 p-4 shadow-[0_12px_30px_-18px_rgba(14,11,18,0.18)] backdrop-blur-md sm:p-5"
                >
                  <dt className="text-xs text-graphite sm:text-sm">{m.label}</dt>
                  <dd className="display mt-3 text-4xl sm:text-5xl">
                    {String(m.value).padStart(2, '0')}
                    <span className="text-violet">.</span>
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          )}

          {rest.length > 0 && (
            <motion.div variants={item} className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-graphite">{rest.join(' ')}</p>
              <Button to="/contact" variant="violet" className="shrink-0 self-start sm:self-auto">
                Let’s talk
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* ── 3D scene ──────────────────────────────────────────── */}
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
        >
          <SceneFrame />
        </motion.div>
      </div>
    </section>
  )
}

/** Borderless stage for the canvas. Mounts the scene only near the viewport and pauses it off-screen. */
function SceneFrame() {
  const ref = useRef(null)
  const near = useInView(ref, { once: true, margin: '400px 0px' })
  const visible = useInView(ref)
  const still = useReducedMotion()

  return (
    <div
      ref={ref}
      className="relative aspect-square w-full sm:aspect-[5/4] lg:aspect-[4/5]"
    >
      <SceneBoundary fallback={<SceneFallback />}>
        {near ? (
          <Suspense fallback={<SceneFallback loading />}>
            <StoryScene active={visible} still={!!still} />
          </Suspense>
        ) : (
          <SceneFallback loading />
        )}
      </SceneBoundary>
      <p className="eyebrow pointer-events-none absolute bottom-5 left-5 text-smoke">Ideas, shaped by data</p>
    </div>
  )
}

/** Shown while three.js downloads, and as a static stand-in if WebGL is unavailable. */
function SceneFallback({ loading = false }) {
  return (
    <div className="absolute inset-0 grid place-items-center" role={loading ? 'status' : undefined}>
      <div className={`size-40 rounded-full bg-violet/30 blur-2xl ${loading ? 'animate-pulse' : ''}`} />
      <div className="absolute size-56 rounded-full border border-violet/15" />
      <div className="absolute size-72 rounded-full border border-violet/10" />
      {loading && <span className="sr-only">Loading 3D scene</span>}
    </div>
  )
}

/** WebGL can fail on old devices or with GPU access blocked — keep the section intact if it does. */
class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
