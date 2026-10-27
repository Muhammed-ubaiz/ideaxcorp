import { motion } from 'motion/react'
import { EASE } from './Reveal'

/**
 * Opening block for inner pages, in the homepage hero's language: a section label, an oversized
 * left-aligned title whose lines rise out of masks (the last line set in violet), and an intro
 * offset to the right. `children` (e.g. a search field) sits underneath.
 */
export default function PageHero({ eyebrow, title, intro, children }) {
  const lines = Array.isArray(title) ? title : [title]
  return (
    <section className="relative overflow-hidden pt-36 pb-16 md:pt-48 md:pb-24">
      <div className="site-container">
        {eyebrow && (
          <motion.p
            className="section-label mb-10 text-graphite"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            {eyebrow}
          </motion.p>
        )}
        <h1 className="display-lg max-w-6xl text-balance">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.1em]">
              <motion.span
                className={`inline-block ${i === lines.length - 1 && lines.length > 1 ? 'text-violet' : ''}`}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.15 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        {(intro || children) && (
          <motion.div
            className="mt-12 grid gap-8 border-t border-ink/15 pt-8 md:grid-cols-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.55 }}
          >
            {intro && <p className="text-pretty text-lg leading-relaxed text-graphite md:col-span-7 md:col-start-6 md:text-xl">{intro}</p>}
            {children && <div className="md:col-span-12">{children}</div>}
          </motion.div>
        )}
      </div>
    </section>
  )
}
