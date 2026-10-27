import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Reveal } from '../../components/Reveal'

// Phrases picked out in violet, echoing the violet accents in the black logo wordmark.
const HIGHLIGHTS = /(data-driven|smart strategies|modern technology|practical digital solutions|strong online foundations|data and smart tools)/i

/**
 * Vision & Mission as pure typography in the logo's palette: black statements with
 * key phrases in violet, each in an editorial row beside its label. Words fill in one by
 * one as the row scrolls through the viewport.
 */
export default function VisionMission({ vision, mission }) {
  const rows = [
    vision && { index: '01', label: 'Vision', text: vision },
    mission && { index: '02', label: 'Mission', text: mission },
  ].filter(Boolean)

  if (!rows.length) return null

  return (
    <section aria-label="Vision and mission" className="bg-ink py-24 text-white md:py-36">
      <div className="site-container">
        <Reveal className="flex items-end justify-between gap-6">
          <p className="eyebrow flex items-center gap-2.5 text-violet">
            <span className="size-1.5 bg-violet" aria-hidden="true" />
            What drives us
          </p>
          <p className="eyebrow text-white/55">Data · Strategy · Technology</p>
        </Reveal>

        <div className="mt-12 md:mt-16">
          {rows.map((row) => (
            <Statement key={row.label} {...row} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Statement({ index, label, text }) {
  const ref = useRef(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })

  // Flatten into words, remembering which ones belong to a violet phrase.
  const words = text
    .split(HIGHLIGHTS)
    .flatMap((part, i) => part.split(/\s+/).filter(Boolean).map((word) => ({ word, accent: i % 2 === 1 })))

  return (
    <article ref={ref} className="grid gap-8 border-t border-white/15 py-14 md:py-20 lg:grid-cols-12 lg:gap-12">
      <Reveal className="lg:col-span-4">
        <span className="font-mono text-sm text-violet">{index}</span>
        <h2 className="display mt-4 text-6xl text-white sm:text-7xl lg:text-8xl">
          {label}
          <span className="text-violet">.</span>
        </h2>
      </Reveal>

      <p className="display-md text-2xl leading-snug text-white sm:text-3xl lg:col-span-8 lg:pt-10 lg:text-4xl lg:leading-[1.2]">
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {words.map(({ word, accent }, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
              still={still}
              className={accent ? 'text-violet' : undefined}
            >
              {word}
            </Word>
          ))}
        </span>
      </p>
    </article>
  )
}

/** One word that fills in from a faint ghost to its full colour across its slice of the scroll range. */
function Word({ progress, range, still, className, children }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <>
      <motion.span className={className} style={still ? undefined : { opacity }}>
        {children}
      </motion.span>{' '}
    </>
  )
}
