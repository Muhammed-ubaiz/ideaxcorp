import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

function Word({ children, progress, range, highlight }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className={`mr-[0.22em] inline-block ${highlight ? 'text-violet' : ''}`}>
      {children}
    </motion.span>
  )
}

/**
 * Statement whose words light up one after another as the section scrolls through the viewport.
 * Words listed in `highlight` are set in the brand violet.
 */
export default function ScrollWords({ text, highlight = [], className = '', as: Tag = 'p' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.6'] })
  const words = text.split(' ')
  const marks = new Set(highlight.map((w) => w.toLowerCase()))
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            highlight={marks.has(w.toLowerCase().replace(/[^a-z’']/g, ''))}
          >
            {w}
          </Word>
        ))}
      </span>
    </Tag>
  )
}
