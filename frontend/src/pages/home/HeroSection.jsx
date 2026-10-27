import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Button from '../../components/Button'
import { EASE, RevealLines } from '../../components/Reveal'
import { hero } from '../../data/home'

/**
 * Opening statement: the three-line headline set at poster size and staggered across the page,
 * rising out of masks on load. As the page scrolls the lines drift apart slightly.
 */
export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const driftBack = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  const [first, second, third] = hero.lines
  const lines = [
    <motion.span key="a" className="block" style={{ x: driftBack }}>
      {first}
    </motion.span>,
    <motion.span key="b" className="block md:pl-[12%]" style={{ x: drift }}>
      {second}
      <span className="text-violet">.</span>
    </motion.span>,
    <motion.span key="c" className="block md:pl-[30%]" style={{ x: driftBack }}>
      {third}
    </motion.span>,
  ]

  return (
    <section ref={ref} aria-label="Introduction" className="relative flex min-h-svh flex-col overflow-hidden pt-32 pb-10 sm:pt-40">
      <div className="site-container flex flex-1 flex-col justify-center">
        <RevealLines as="h1" lines={lines} animateOnMount delay={0.2} stagger={0.12} className="display-xl" />

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12">
          <motion.div
            className="md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.75 }}
          >
            <p className="text-pretty text-lg leading-relaxed text-ink/80 md:text-xl">{hero.intro}</p>
            <Button to="/services" className="mt-8">
              {hero.cta}
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="site-container mt-16 flex items-end justify-between gap-6 border-t border-ink/15 pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p className="eyebrow max-w-xs text-graphite">{hero.tagline}</p>
        <a href="#trust" aria-label="Scroll to the next section" className="group hidden size-12 shrink-0 place-items-center rounded-full border border-ink/25 sm:grid transition-colors duration-500 hover:bg-ink hover:text-white">
          <span className="relative block h-5 w-px overflow-hidden bg-ink/15 group-hover:bg-white/30">
            <span className="animate-scroll-cue absolute inset-x-0 top-0 h-2 bg-current" />
          </span>
        </a>
      </motion.div>
    </section>
  )
}
