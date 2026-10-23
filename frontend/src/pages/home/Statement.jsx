import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRichMotion } from '../../hooks/useMedia'

/** Full-bleed brand statement: two lines drift in opposite directions as you scroll. */
export default function Statement() {
  const ref = useRef(null)
  const rich = useRichMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const a = useTransform(scrollYProgress, [0, 1], rich ? ['12%', '-12%'] : ['0%', '0%'])
  const b = useTransform(scrollYProgress, [0, 1], rich ? ['-10%', '14%'] : ['0%', '0%'])
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const draw = useTransform(scrollYProgress, [0.1, 0.6], [0, 1])

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink py-32 text-white md:py-48" aria-label="Ideas into impact. Vision into reality.">
      <motion.img
        aria-hidden="true"
        src="/images/glow-banner.webp"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 size-full scale-125 object-cover opacity-45"
        style={{ y: bgY }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/40 to-ink" />

      <svg aria-hidden="true" className="absolute inset-0 -z-10 size-full" viewBox="0 0 1440 700" preserveAspectRatio="none" fill="none">
        <motion.path d="M-20 520 C 300 420, 520 640, 860 470 S 1300 300, 1460 380" stroke="#9700ff" strokeWidth="1.5" style={{ pathLength: draw }} />
        <motion.path d="M-20 200 C 280 300, 600 120, 900 240 S 1280 380, 1460 220" stroke="rgba(255,255,255,0.18)" strokeWidth="1" style={{ pathLength: draw }} />
      </svg>

      <div aria-hidden="true" className="site-container display text-[12.5vw] leading-[0.95] lg:whitespace-nowrap lg:text-[7.6vw] lg:leading-[0.9]">
        <motion.p style={{ x: a }}>
          Ideas into <span className="text-violet">impact.</span>
        </motion.p>
        <motion.p style={{ x: b }} className="mt-2 text-transparent lg:text-right [-webkit-text-stroke:1.5px_rgba(255,255,255,0.75)]">
          Vision into reality.
        </motion.p>
      </div>
    </section>
  )
}
