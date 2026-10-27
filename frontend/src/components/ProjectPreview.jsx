import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from './Icons'
import { ProjectPlaceholder } from './PortfolioCard'
import { EASE } from './Reveal'

const VIEWPORT = { once: true, margin: '0px 0px -15% 0px' }
const pad = (n) => String(n).padStart(2, '0')

/** Image that opens upward out of a mask as it enters the viewport, then eases in on hover. */
function RevealCover({ project, className, delay }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={`relative overflow-hidden bg-ink-2 ${className}`}
      initial={reduced ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={VIEWPORT}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="size-full object-cover object-top transition-[scale] duration-[1.4s] ease-cinema group-hover:scale-[1.05]"
        />
      ) : (
        <ProjectPlaceholder project={project} />
      )}
    </motion.div>
  )
}

/** Index, category, title and description, each rising in turn. */
function Caption({ project, index, large, delay }) {
  const rise = (d) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: 0.9, ease: EASE, delay: delay + d },
  })
  return (
    <div className="flex min-w-0 flex-col">
      <motion.p {...rise(0)} className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/50 uppercase">
        <span className="tabular-nums text-violet">{pad(index + 1)}</span>
        <span className="h-px w-6 bg-white/25" aria-hidden="true" />
        {project.category}
      </motion.p>
      <motion.div {...rise(0.08)} className="mt-4 flex items-start justify-between gap-4">
        <h3 className={`display-md text-balance transition-colors duration-500 group-hover:text-violet ${large ? 'text-3xl sm:text-[2.6rem]' : 'text-2xl sm:text-[1.75rem]'}`}>
          {project.title}
        </h3>
        <span className="mt-1 grid size-10 shrink-0 place-items-center border border-white/20 transition-colors duration-500 group-hover:border-violet group-hover:bg-violet" aria-hidden="true">
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-cinema group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </motion.div>
      {project.description && (
        <motion.p {...rise(0.16)} className={`mt-3 leading-relaxed text-white/60 ${large ? 'max-w-lg' : 'line-clamp-3 text-sm sm:text-base'}`}>
          {project.description}
        </motion.p>
      )}
    </div>
  )
}

/**
 * Editorial project preview for dark sections. `featured` stacks a tall image over a large caption;
 * otherwise the image sits beside the caption (stacked on phones). Clicking opens the project viewer.
 */
export default function ProjectPreview({ project, index, featured = false, onOpen, delay = 0 }) {
  return (
    <button type="button" onClick={() => onOpen?.(project)} className="group block w-full text-left">
      {featured ? (
        <>
          <RevealCover project={project} delay={delay} className="aspect-[4/3] lg:aspect-[4/5]" />
          <div className="mt-6">
            <Caption project={project} index={index} large delay={delay + 0.2} />
          </div>
        </>
      ) : (
        <div className="grid gap-5 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] sm:gap-7">
          <RevealCover project={project} delay={delay} className="aspect-[4/3] sm:aspect-[4/5]" />
          <div className="sm:pt-1">
            <Caption project={project} index={index} delay={delay + 0.2} />
          </div>
        </div>
      )}
    </button>
  )
}
