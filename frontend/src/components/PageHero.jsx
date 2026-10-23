import { motion } from 'motion/react'
import { RevealLines, EASE } from './Reveal'

/** Opening block for inner pages: eyebrow, large masked title and an intro line. */
export default function PageHero({ eyebrow, title, intro, children }) {
  const lines = Array.isArray(title) ? title : [title]
  return (
    <section className="site-container pt-36 pb-16 md:pt-44 md:pb-24">
      {eyebrow && (
        <motion.p
          className="eyebrow mb-8 flex items-center gap-3 text-graphite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="inline-block size-2 bg-violet" aria-hidden="true" />
          {eyebrow}
        </motion.p>
      )}
      <RevealLines
        as="h1"
        lines={lines}
        animateOnMount
        delay={0.15}
        className="display max-w-6xl text-balance text-[2.9rem] sm:text-7xl lg:text-[7rem]"
      />
      {intro && (
        <motion.p
          className="lead mt-10 max-w-2xl text-pretty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.55 }}
        >
          {intro}
        </motion.p>
      )}
      {children && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.7 }}>
          {children}
        </motion.div>
      )}
    </section>
  )
}
