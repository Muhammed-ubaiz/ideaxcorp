import { motion } from 'motion/react'
import { EASE } from './Reveal'

/**
 * Opening block for inner pages, in the homepage hero's language: a black band with a centred
 * label, an oversized title whose lines rise out of masks — the last one set in a white box —
 * and an intro line. `children` (e.g. a search field) sits underneath, on the dark band.
 */
export default function PageHero({ eyebrow, title, intro, children }) {
  const lines = Array.isArray(title) ? title : [title]
  return (
    <section className="relative isolate overflow-hidden bg-black pt-36 pb-20 text-white md:pt-44 md:pb-28">
      <div aria-hidden="true" className="absolute left-1/2 top-1/3 -z-10 h-80 w-[56rem] max-w-full -translate-x-1/2 rounded-full bg-violet/20 blur-[130px]" />
      <div className="site-container flex flex-col items-center text-center">
        {eyebrow && (
          <motion.p
            className="eyebrow mb-8 flex items-center gap-3 text-white/55"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            <span className="inline-block size-1.5 rounded-full bg-violet" aria-hidden="true" />
            {eyebrow}
          </motion.p>
        )}
        <h1 className="display max-w-6xl text-balance text-[2.7rem] leading-[1.04] sm:text-7xl lg:text-[6.5rem]">
          {lines.map((line, i) => {
            const boxed = i === lines.length - 1 && lines.length > 1
            return (
              <span key={i} className="block overflow-hidden pb-[0.1em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.15 + i * 0.12 }}
                >
                  {boxed ? <span className="chip bg-white text-ink">{line}</span> : line}
                </motion.span>
              </span>
            )
          })}
        </h1>
        {intro && (
          <motion.p
            className="mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-white/65 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.55 }}
          >
            {intro}
          </motion.p>
        )}
        {children && (
          <motion.div
            className="flex w-full flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.7 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
