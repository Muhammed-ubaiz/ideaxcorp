import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Quote } from '../../components/Icons'
import { EASE, Reveal, RevealLines } from '../../components/Reveal'
import { testimonials as copy } from '../../data/home'
import { initials } from '../../utils/format'

/** One quote at a time, set large; the clients' names double as tabs underneath. */
export default function TestimonialsSection({ items }) {
  const [i, setI] = useState(0)
  if (!items.length) return null
  const t = items[i]
  const go = (d) => setI((n) => (n + d + items.length) % items.length)

  return (
    <section aria-labelledby="testimonials-title" className="py-24 md:py-36">
      <div className="site-container">
        <Reveal as="p" y={12} className="section-label text-graphite">
          {copy.label}
        </Reveal>
        <RevealLines id="testimonials-title" lines={copy.lines} className="display-lg mt-8 text-balance" />

        <div className="mt-16 grid gap-10 border-t border-ink pt-12 md:mt-24 lg:grid-cols-12">
          <div className="flex items-start justify-between lg:col-span-2 lg:flex-col">
            <Quote className="size-14 text-violet" />
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid size-12 place-items-center rounded-full border border-ink/25 transition-colors duration-500 hover:bg-ink hover:text-white">
                <ArrowLeft className="size-5" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid size-12 place-items-center rounded-full border border-ink/25 transition-colors duration-500 hover:bg-ink hover:text-white">
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>

          <div className="min-h-[22rem] lg:col-span-10" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure
                key={t.id || t.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <blockquote className="display-md text-pretty text-[1.65rem] leading-[1.25] sm:text-4xl lg:text-[2.7rem]">{t.quote}</blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  {t.image ? (
                    <img src={t.image} alt="" className="size-14 rounded-full object-cover" />
                  ) : (
                    <span className="grid size-14 place-items-center rounded-full bg-violet font-semibold text-white">{initials(t.name)}</span>
                  )}
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="text-graphite">{t.company}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-ink/15 sm:grid-cols-3" role="tablist" aria-label="Testimonials">
          {items.map((x, n) => (
            <li key={x.id || x.name} className="bg-paper">
              <button
                type="button"
                role="tab"
                aria-selected={n === i}
                onClick={() => setI(n)}
                className={`w-full px-6 py-5 text-left transition-colors duration-500 ${n === i ? 'bg-ink text-white' : 'hover:bg-mist'}`}
              >
                <span className="block font-semibold">{x.name}</span>
                <span className={n === i ? 'text-white/60' : 'text-graphite'}>{x.company}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
