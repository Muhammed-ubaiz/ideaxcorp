import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { faqsData } from '../../data/kotaData'

export default function KotaFaqs() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleIndex = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section
      id="faqs-section"
      data-theme="dark"
      className="py-24 sm:py-36 bg-black text-white relative z-10 border-t border-white/10"
    >
      <div className="site-container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="pb-16 sm:pb-24 border-b border-white/15"
        >
          <span className="text-xs uppercase tracking-widest text-white/45 block mb-3 font-semibold">
            Got questions?
          </span>
          <h2 className="font-syne text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-white">
            {faqsData.heading}
          </h2>
        </motion.div>

        {/* Accordion Questions List */}
        <div className="divide-y divide-white/15">
          {faqsData.items.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div key={faq.question} className="py-8 sm:py-12">
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full text-left flex items-start justify-between gap-6 group"
                  aria-expanded={isOpen}
                >
                  <span className="font-syne text-2xl sm:text-3xl lg:text-4xl font-semibold text-white/90 group-hover:text-white transition-colors leading-snug">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 group-hover:border-white group-hover:text-white transition-all text-xl font-light">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-6 sm:pt-8 text-base sm:text-xl text-white/70 leading-relaxed max-w-4xl font-sans">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
