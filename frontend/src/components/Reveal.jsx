import { motion } from 'motion/react'

export const EASE = [0.22, 1, 0.36, 1]
const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' }

/** Slow fade-and-rise as an element scrolls into view. */
export function Reveal({ as = 'div', delay = 0, y = 36, duration = 1.1, className, children, ...props }) {
  const M = motion[as]
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, ease: EASE, delay }}
      className={className}
      {...props}
    >
      {children}
    </M>
  )
}

/**
 * Heading whose lines rise out of a mask one after another.
 * `lines` is an array of strings or nodes; each becomes one masked line.
 */
export function RevealLines({ as = 'h2', lines, className = '', lineClassName = '', delay = 0, stagger = 0.1, animateOnMount = false }) {
  // The observer sits on the heading itself: the line spans start clipped by their masks,
  // so they would never register as "in view" on their own.
  const Tag = motion[as]
  const trigger = animateOnMount ? { animate: 'show' } : { whileInView: 'show', viewport: VIEWPORT }
  return (
    <Tag className={className} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden pb-[0.08em] ${lineClassName}`}>
          <motion.span
            className="block"
            variants={{ hidden: { y: '108%' }, show: { y: '0%' } }}
            transition={{ duration: 1.25, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Image that settles from a slight zoom as its mask opens — used for large photography. */
export function RevealImage({ src, alt, className = '', imgClassName = '', delay = 0 }) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(12% 0% 12% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={VIEWPORT}
      transition={{ duration: 1.4, ease: EASE, delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`size-full object-cover ${imgClassName}`}
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.8, ease: EASE, delay }}
      />
    </motion.div>
  )
}
