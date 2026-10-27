import { Link } from 'react-router'
import { motion } from 'motion/react'
import { resultsData } from '../../data/kotaData'

export default function KotaResults() {
  return (
    <section
      id="results-section"
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
            Proven impact
          </span>
          <h2 className="font-syne text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-white">
            {resultsData.heading}
          </h2>
        </motion.div>

        {/* 4 Stat Cards */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {resultsData.items.map((stat, idx) => (
            <motion.div
              key={stat.client}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.12 }}
              className="relative rounded-3xl p-8 sm:p-12 bg-neutral-900/60 border border-white/10 overflow-hidden flex flex-col justify-between min-h-[22rem] group hover:border-white/30 transition-all duration-500"
            >
              {/* Client background image watermark/preview */}
              <div className="absolute right-0 bottom-0 w-2/5 h-2/5 sm:w-1/2 sm:h-1/2 opacity-25 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
                <img
                  src={stat.image}
                  alt={stat.client}
                  className="w-full h-full object-contain object-bottom-right"
                />
              </div>

              <div>
                {/* Client Logo */}
                <div className="flex items-center justify-between mb-8">
                  <img
                    src={stat.logo}
                    alt={stat.client}
                    className="h-8 w-auto object-contain brightness-200"
                  />
                  <span className="text-xs uppercase tracking-widest text-white/40 font-semibold">
                    {stat.client}
                  </span>
                </div>

                {/* Big Stat Number */}
                <div className="font-syne text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4 group-hover:scale-105 transition-transform duration-500 origin-left">
                  {stat.value}
                </div>

                {/* Stat Label */}
                <p className="text-lg sm:text-xl text-white/70 max-w-sm leading-relaxed font-sans">
                  {stat.label}
                </p>
              </div>

              <div className="pt-8">
                <Link
                  to={stat.link}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 group-hover:text-white underline underline-offset-4 transition-colors"
                >
                  <span>View Project</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
