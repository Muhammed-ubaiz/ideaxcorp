import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { frameworkData } from '../../data/kotaData'

export default function KotaFramework() {
  const [current, setCurrent] = useState(0)

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? frameworkData.stages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrent((prev) => (prev === frameworkData.stages.length - 1 ? 0 : prev + 1))
  }

  const currentStage = frameworkData.stages[current]

  return (
    <section id="framework-section" className="py-24 sm:py-36 bg-[#ecebe6] border-t border-black/10 overflow-hidden">
      <div className="site-container">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl mx-auto mb-14 sm:mb-20"
        >
          <span className="text-xs uppercase tracking-widest text-black/45 block mb-3 font-semibold">
            How we work
          </span>
          <h2 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black">
            {frameworkData.heading}
          </h2>
        </motion.div>

        {/* 5 Stage Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          {frameworkData.stages.map((stage, idx) => (
            <button
              key={stage.tab}
              type="button"
              onClick={() => setCurrent(idx)}
              className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                current === idx
                  ? 'bg-black text-white shadow-md'
                  : 'bg-white/60 text-black/70 hover:bg-white hover:text-black'
              }`}
            >
              <span className="opacity-50 mr-2">0{idx + 1}</span>
              {stage.tab}
            </button>
          ))}
        </div>

        {/* Stage Content Card with Video & Description */}
        <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-10 lg:p-14 border border-white shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* Media Preview */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/5 shadow-inner">
                  <video
                    key={currentStage.video}
                    src={currentStage.video}
                    poster={currentStage.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text Description & Navigation Arrows */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs uppercase tracking-widest text-black/40 block mb-3 font-semibold">
                    Stage 0{current + 1} of 05
                  </span>
                  <h3 className="font-syne text-3xl sm:text-4xl lg:text-4xl font-bold text-black tracking-tight mb-6">
                    {currentStage.title}
                  </h3>
                  <p className="text-base sm:text-lg text-black/75 leading-relaxed">
                    {currentStage.description}
                  </p>
                </div>

                {/* Arrow Controls */}
                <div className="pt-8 sm:pt-12 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous stage"
                    className="w-12 h-12 rounded-full border border-black/25 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next stage"
                    className="w-12 h-12 rounded-full border border-black/25 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
                  >
                    →
                  </button>
                  <span className="text-xs font-semibold text-black/45 tracking-widest uppercase ml-2">
                    0{current + 1} / 05
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
