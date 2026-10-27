import { motion } from 'motion/react'
import { approachData } from '../../data/kotaData'

export default function KotaApproach() {
  return (
    <section id="approach-section" className="py-24 sm:py-36 bg-[#ecebe6] border-t border-black/10">
      <div className="site-container">
        {/* Top Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-syne text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-[1.08]"
            >
              {approachData.heading}
            </motion.h2>
          </div>

          <div className="lg:col-span-5 lg:pt-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="text-lg sm:text-xl text-black/75 leading-relaxed font-sans"
            >
              {approachData.lead}
            </motion.p>
          </div>
        </div>

        {/* 3 Asymmetric Pillar Cards */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {approachData.pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.12 }}
              className="approach-card p-8 sm:p-10 flex flex-col justify-between min-h-[18rem]"
            >
              <div>
                <span className="block font-sans text-sm font-semibold tracking-widest text-black/45 mb-4">
                  {pillar.step} —
                </span>
                <h3 className="font-syne text-2xl sm:text-3xl font-bold text-black mb-4">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-black/75 text-base sm:text-lg leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
