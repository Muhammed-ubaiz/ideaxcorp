import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

/**
 * Counts from 0 to `to` once, the first time it scrolls into view, then stays on the final value.
 * Reduced-motion users see the final value immediately.
 */
export default function CountUp({ to, suffix = '', duration = 1.8, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(reduced ? to : 0)

  useEffect(() => {
    if (reduced) return setValue(to)
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
      onComplete: () => setValue(to),
    })
    // If the effect is torn down mid-count, land on the real figure rather than a partial one.
    return () => {
      controls.stop()
      setValue(to)
    }
  }, [inView, to, duration, delay, reduced])

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">
        {to}
        {suffix}
      </span>
      <span aria-hidden="true">
        {value}
        {suffix}
      </span>
    </span>
  )
}
