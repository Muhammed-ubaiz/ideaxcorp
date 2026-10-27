import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { kotaverseData } from '../../data/kotaData'
import KotaLogo from '../../components/KotaLogo'

export default function KotaverseCta() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section
        id="kotaverse-section"
        data-theme="dark"
        className="relative py-32 sm:py-48 bg-black text-white overflow-hidden flex flex-col items-center justify-center border-t border-white/10"
      >
        {/* Background Video Preview with Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <video
            src={kotaverseData.previewVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        {/* Marquee Animation */}
        <div className="relative z-10 w-full overflow-hidden mb-12 sm:mb-16 select-none">
          <div className="animate-marquee-showreel flex items-center gap-8 sm:gap-14">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-8 sm:gap-14 flex-shrink-0">
                <span className="font-syne text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter text-white uppercase opacity-90">
                  {kotaverseData.marqueeText}
                </span>
                <KotaLogo className="h-14 w-14 sm:h-24 sm:w-24 text-white opacity-80" light={true} />
              </div>
            ))}
          </div>
        </div>

        {/* Watch Now Button */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="group inline-flex items-center gap-4 px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-white text-black font-semibold text-base sm:text-xl hover:bg-neutral-200 transition-all shadow-2xl hover:scale-105 transform duration-300"
          >
            <span>{kotaverseData.buttonText}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 17.1 15.17"
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
              fill="currentColor"
            >
              <path d="m17.1,7.58s-.01-.04-.01-.06c.01-.22-.06-.45-.24-.61L9.23.19c-.31-.27-.78-.24-1.06.07-.27.31-.24.78.07,1.06l6.26,5.52H.75c-.41,0-.75.34-.75.75s.34.75.75.75h13.74l-6.26,5.52c-.31.27-.34.75-.07,1.06.15.17.35.25.56.25.18,0,.35-.06.5-.19l7.62-6.72c.18-.16.25-.39.24-.61,0-.02.01-.04.01-.06Z" />
            </svg>
          </button>
          <span className="text-xs uppercase tracking-widest text-white/50 font-medium">
            Click to play full reel
          </span>
        </div>
      </section>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Close showreel"
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              ✕
            </button>

            <div className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
              <video
                src={kotaverseData.fullShowreelVideo}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
