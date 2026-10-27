import { useState } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { testimonialsData } from '../../data/kotaData'

export default function KotaTestimonials() {
  const [current, setCurrent] = useState(0)

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonialsData.items.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonialsData.items.length - 1 ? 0 : prev + 1))
  }

  const item = testimonialsData.items[current]

  return (
    <section
      id="testimonials-section"
      data-theme="dark"
      className="py-24 sm:py-36 bg-black text-white relative z-10 border-t border-white/10"
    >
      <div className="site-container">
        {/* Section Heading & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-16 sm:pb-24 border-b border-white/15">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs uppercase tracking-widest text-white/45 block mb-3 font-semibold">
              Testimonials
            </span>
            <h2 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              {testimonialsData.heading}
            </h2>
          </motion.div>

          {/* Slider Prev / Next Controls */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white hover:bg-white hover:text-black transition-all"
            >
              ←
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white hover:bg-white hover:text-black transition-all"
            >
              →
            </button>
            <span className="text-xs font-semibold text-white/40 tracking-widest uppercase ml-2">
              0{current + 1} / 0{testimonialsData.items.length}
            </span>
          </div>
        </div>

        {/* Big Testimonial Display */}
        <div className="py-14 sm:py-20 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="font-syne text-2xl sm:text-4xl lg:text-5xl font-medium leading-[1.25] tracking-tight text-white/95 mb-12 sm:mb-16">
                “{item.quote}”
              </blockquote>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-white/10">
                <div>
                  <h4 className="font-syne text-xl sm:text-2xl font-bold text-white mb-1">
                    {item.author}
                  </h4>
                  <p className="text-sm sm:text-base text-white/60">
                    {item.role} {item.company && `· ${item.company}`}
                  </p>
                </div>

                <Link
                  to={item.link}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4 hover:text-white/70 transition-colors w-fit"
                >
                  <span>View project</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
