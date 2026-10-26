import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EASE, Reveal } from '../../components/Reveal'

const VIEW = { once: true, margin: '0px 0px -15% 0px' }

/**
 * Brand statement on white: the first line stands huge above a horizon and is mirrored beneath it
 * as a rippling, fading reflection; the second line follows in a solid ink chip.
 */
export default function Statement() {
  const reduced = useReducedMotion()
  const filter = `ripple-${useId().replace(/:/g, '')}`
  const line = (
    <>
      Ideas into <span className="text-violet">impact.</span>
    </>
  )

  return (
    <section className="relative overflow-hidden bg-white py-28 text-ink md:py-40" aria-label="Ideas into impact. Vision into reality.">
      <svg className="absolute size-0" aria-hidden="true">
        <filter id={filter}>
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.09" numOctaves="2" seed="3">
            {!reduced && <animate attributeName="baseFrequency" dur="9s" values="0.006 0.09;0.009 0.12;0.006 0.09" repeatCount="indefinite" />}
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="22" />
        </filter>
      </svg>

      <div className="site-container flex flex-col items-center text-center" aria-hidden="true">
        <div className="relative w-full">
          <div className="overflow-hidden pb-[0.04em]">
            <motion.p
              className="display text-[12.5vw] leading-[0.9] lg:text-[9.5vw]"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={VIEW}
              transition={{ duration: 1.3, ease: EASE }}
            >
              {line}
            </motion.p>
          </div>

          {/* horizon + reflection */}
          <div className="relative">
            <motion.div
              className="absolute inset-x-[-50vw] top-0 h-full bg-gradient-to-b from-neutral-200/80 via-neutral-100/60 to-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEW}
              transition={{ duration: 1.2, delay: 0.4 }}
            />
            <motion.p
              className="display relative -scale-y-100 text-[12.5vw] leading-[0.9] text-neutral-400 [mask-image:linear-gradient(to_top,rgba(0,0,0,0.75),transparent_85%)] lg:text-[9.5vw]"
              style={{ filter: `url(#${filter}) blur(1px)` }}
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEW}
              transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
            >
              Ideas into impact.
            </motion.p>
          </div>
        </div>

        <Reveal y={20} delay={0.3} className="display-md mt-14 text-[2rem] sm:text-5xl lg:text-6xl">
          Vision into <span className="chip bg-ink text-white">reality.</span>
        </Reveal>
      </div>
    </section>
  )
}
