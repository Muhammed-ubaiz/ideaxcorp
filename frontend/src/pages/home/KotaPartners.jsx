import { motion } from 'motion/react'
import { partnersData } from '../../data/kotaData'

export default function KotaPartners() {
  return (
    <section
      id="partners-section"
      data-theme="dark"
      className="py-24 sm:py-36 bg-black text-white relative z-10 border-t border-white/10 overflow-hidden"
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
            Trusted by the best
          </span>
          <h2 className="font-syne text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-white">
            {partnersData.heading}
          </h2>
        </motion.div>
      </div>

      {/* Infinite Scrolling Logo Marquee Track 1 (Left) */}
      <div className="mt-16 sm:mt-20 overflow-hidden py-4 border-b border-white/10">
        <div className="animate-marquee-left flex items-center gap-12 sm:gap-20">
          {[...partnersData.logos, ...partnersData.logos].map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="flex-shrink-0 w-32 sm:w-44 h-16 sm:h-20 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
              title={logo.name}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-10 sm:max-h-12 w-auto object-contain filter invert brightness-200"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Grid of Partners for Mobile / Tablet / Desktop fallback */}
      <div className="site-container mt-16 sm:mt-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8">
          {partnersData.logos.map((logo) => (
            <div
              key={logo.name}
              className="h-28 rounded-2xl border border-white/10 bg-neutral-900/30 flex items-center justify-center p-6 group hover:border-white/30 hover:bg-neutral-900 transition-all duration-300"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-10 max-w-full object-contain filter invert brightness-200 opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
