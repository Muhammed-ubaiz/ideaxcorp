import { motion } from 'motion/react'
import { heroData } from '../../data/kotaData'

export default function KotaHero() {
  const scrollToApproach = () => {
    const el = document.getElementById('approach-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-32 sm:pt-40 pb-12 sm:pb-16 overflow-hidden bg-[#ecebe6]">
      {/* Ambient background glow / fluid gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[36rem] h-[36rem] rounded-full bg-gradient-to-br from-pink-200/40 via-purple-200/20 to-transparent blur-3xl animate-pulse-subtle" />
        <div className="absolute top-1/2 -left-28 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-amber-100/50 via-rose-100/30 to-transparent blur-3xl animate-pulse-subtle" />
      </div>

      <div className="site-container relative z-10 my-auto">
        <div className="max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="font-syne text-[2.2rem] sm:text-[3.4rem] md:text-[4.2rem] lg:text-[5.2rem] font-bold leading-[1.06] tracking-[-0.035em] text-black"
          >
            {heroData.h1}
          </motion.h1>
        </div>
      </div>

      {/* Bottom Bar: Scroll Arrow + Recognition Badges */}
      <div className="site-container relative z-10 pt-10 sm:pt-14 flex flex-col sm:flex-row sm:items-end justify-between gap-8 border-t border-black/10">
        {/* Scroll Cue Arrow */}
        <button
          type="button"
          onClick={scrollToApproach}
          aria-label="Scroll to approach section"
          className="group inline-flex items-center gap-3 text-sm font-semibold text-black/70 hover:text-black transition-colors"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-black/25 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-1 group-hover:border-black">
            <svg
              className="w-4 h-4 text-black transform group-hover:translate-y-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
          <span className="hidden md:inline uppercase text-xs tracking-widest text-black/50">
            Scroll to explore
          </span>
        </button>

        {/* Badges / Accolades */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-10">
          {heroData.badges.map((badge) => (
            <div
              key={badge.name}
              className="grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              title={badge.name}
            >
              <img
                src={badge.src}
                alt={badge.name}
                className="h-6 sm:h-7 w-auto object-contain"
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
