import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useRichMotion } from '../../hooks/useMedia'

/** Pulls its child gently toward the pointer. Inactive on touch and reduced-motion. */
export default function Magnetic({ children, strength = 0.3, className = 'inline-block' }) {
  const ref = useRef(null)
  const rich = useRichMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 16, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 16, mass: 0.4 })

  if (!rich) return <span className={className}>{children}</span>

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}
