import { motion } from 'motion/react'
import { EASE } from '../../components/Reveal'

/**
 * The Ideaxcorp mark — violet square + growth arrow — built as a solid CSS 3D slab.
 * Rotation comes in as motion values so pointer parallax never re-renders React.
 */
export default function Monolith({ size = 320, rotateX = 12, rotateY = -22, delay = 0 }) {
  const d = Math.round(size * 0.2) // slab depth
  const half = size / 2
  const face = 'absolute rounded-[3px] [backface-visibility:hidden]'

  return (
    <div style={{ perspective: size * 4.5, width: size, height: size }} className="relative">
      {/* light pooling on the "floor" */}
      <div
        aria-hidden="true"
        className="animate-shadow-breathe absolute left-1/2 top-[108%] h-[18%] w-[90%] -translate-x-1/2 rounded-[50%] bg-violet/60 blur-3xl"
      />
      <motion.div
        className="animate-float-slow relative size-full"
        style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}
        initial={{ opacity: 0, scale: 0.6, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.8, ease: EASE, delay }}
      >
        {/* front */}
        <div
          className={`${face} inset-0 overflow-hidden bg-[linear-gradient(150deg,#c065ff_0%,#9700ff_42%,#5b00a6_100%)] shadow-[0_0_140px_-10px_rgba(151,0,255,0.75)]`}
          style={{ transform: `translateZ(${d / 2}px)` }}
        >
          <div className="animate-sheen absolute inset-y-0 -left-full w-full bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.35)_50%,transparent_70%)]" />
          <svg viewBox="0 0 24 24" className="absolute inset-[17%] size-[66%] text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
            <motion.path d="M6.5 17.5 17 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: EASE, delay: delay + 0.9 }} />
            <motion.path d="M8.5 6.5H17.5V15.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: EASE, delay: delay + 1.25 }} />
          </svg>
        </div>
        {/* back */}
        <div className={`${face} inset-0 bg-[#3a0068]`} style={{ transform: `rotateY(180deg) translateZ(${d / 2}px)` }} />
        {/* right */}
        <div className={`${face} top-0 bg-[linear-gradient(180deg,#5d00a8,#2c004f)]`} style={{ width: d, height: size, left: half - d / 2, transform: `rotateY(90deg) translateZ(${half}px)` }} />
        {/* left */}
        <div className={`${face} top-0 bg-[#4a0087]`} style={{ width: d, height: size, left: half - d / 2, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
        {/* top */}
        <div className={`${face} left-0 bg-[linear-gradient(90deg,#d49bff,#a43dff)]`} style={{ width: size, height: d, top: half - d / 2, transform: `rotateX(90deg) translateZ(${half}px)` }} />
        {/* bottom */}
        <div className={`${face} left-0 bg-[#2a004b]`} style={{ width: size, height: d, top: half - d / 2, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
      </motion.div>
    </div>
  )
}
