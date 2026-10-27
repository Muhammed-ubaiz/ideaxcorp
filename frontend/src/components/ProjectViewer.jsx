import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Close } from './Icons'
import { ProjectPlaceholder } from './PortfolioCard'
import { EASE } from './Reveal'

const pad = (n) => String(n).padStart(2, '0')

/**
 * Fullscreen project showcase on near-black: project details on the left, the preview filling the
 * right (stacked on phones, image first). When `projects` and `onNavigate` are given, Previous / Next
 * (and the arrow keys) step through the list. Escape or the close button exits.
 */
export default function ProjectViewer({ project, onClose, projects = [], onNavigate }) {
  const [shot, setShot] = useState(0)

  const index = project ? projects.findIndex((p) => p.id === project.id) : -1
  const canNavigate = Boolean(onNavigate) && index !== -1 && projects.length > 1
  const step = (d) => canNavigate && onNavigate(projects[(index + d + projects.length) % projects.length])

  useEffect(() => setShot(0), [project?.id])

  useEffect(() => {
    if (!project) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  })

  const images = project ? [project.image, ...(project.gallery || [])].filter(Boolean) : []
  const prev = canNavigate ? projects[(index - 1 + projects.length) % projects.length] : null
  const next = canNavigate ? projects[(index + 1) % projects.length] : null

  // Text lines rise in turn each time the project changes.
  const line = (i) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay: 0.15 + i * 0.07 },
  })

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          className="fixed inset-0 z-[70] overflow-y-auto bg-ink/95 text-white backdrop-blur-md md:overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          data-lenis-prevent
        >
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Close project"
            className="fixed right-4 top-4 z-20 grid size-11 place-items-center rounded-full border border-white/25 bg-ink/60 backdrop-blur transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink sm:right-6 sm:top-6"
          >
            <Close className="size-5" />
          </button>

          <div className="grid md:grid-cols-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            {/* ── Details ─────────────────────────────── */}
            <div className="order-2 flex flex-col justify-between gap-12 px-5 pt-8 pb-10 sm:px-8 md:order-1 md:h-svh md:overflow-y-auto md:py-10 lg:px-14 lg:py-12">
              <p className="text-xs tracking-[0.22em] text-white/45 uppercase tabular-nums">
                {canNavigate ? `${pad(index + 1)} / ${pad(projects.length)}` : 'Ideaxcorp'}
              </p>

              <AnimatePresence mode="wait">
                <motion.div key={project.id} exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}>
                  <motion.p {...line(0)} className="text-xs font-semibold tracking-[0.22em] text-violet uppercase">
                    @{project.category}
                  </motion.p>
                  <motion.h2 {...line(1)} className="display mt-5 text-balance text-[clamp(2.25rem,4.6vw,4.75rem)] leading-[0.95]">
                    {project.title}
                  </motion.h2>
                  {project.description && (
                    <motion.p {...line(2)} className="mt-6 max-w-md text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
                      {project.description}
                    </motion.p>
                  )}
                  <motion.div {...line(3)} className="mt-8 flex flex-wrap items-center gap-3">
                    {project.tags?.map((t) => (
                      <span key={t} className="rounded-full border border-white/20 px-3.5 py-1.5 text-xs text-white/75">
                        {t}
                      </span>
                    ))}
                  </motion.div>
                  {project.url && (
                    <motion.a
                      {...line(4)}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white py-2 pr-2 pl-6 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-violet hover:text-white"
                    >
                      Visit website
                      <span className="grid size-9 place-items-center rounded-full bg-ink text-white transition-transform duration-500 ease-cinema group-hover:rotate-45">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </motion.a>
                  )}
                </motion.div>
              </AnimatePresence>

              {canNavigate ? (
                <nav aria-label="Projects" className="grid grid-cols-2 gap-4 border-t border-white/15 pt-5">
                  <button type="button" onClick={() => step(-1)} className="group min-w-0 text-left">
                    <span className="flex items-center gap-2 text-xs tracking-[0.2em] text-white/45 uppercase">
                      <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" /> Previous
                    </span>
                    <span className="mt-1.5 block truncate text-sm font-medium text-white/80 transition-colors group-hover:text-white">{prev.title}</span>
                  </button>
                  <button type="button" onClick={() => step(1)} className="group min-w-0 text-right">
                    <span className="flex items-center justify-end gap-2 text-xs tracking-[0.2em] text-white/45 uppercase">
                      Next <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="mt-1.5 block truncate text-sm font-medium text-white/80 transition-colors group-hover:text-white">{next.title}</span>
                  </button>
                </nav>
              ) : (
                <span aria-hidden="true" />
              )}
            </div>

            {/* ── Preview ─────────────────────────────── */}
            <div className="relative order-1 flex h-[58svh] items-center justify-center bg-black/40 px-5 pt-20 pb-4 sm:px-8 md:order-2 md:h-svh md:py-10 lg:px-12 lg:py-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${project.id}-${shot}`}
                  className="flex size-full items-center justify-center"
                  initial={{ opacity: 0, scale: 0.97, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                >
                  {images.length ? (
                    <img src={images[shot]} alt={project.title} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <div className="aspect-[4/3] w-full max-w-xl">
                      <ProjectPlaceholder project={project} />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" role="group" aria-label="Project images">
                  {images.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setShot(i)}
                      aria-label={`Image ${i + 1} of ${images.length}`}
                      aria-pressed={shot === i}
                      className={`h-8 min-w-8 rounded-full px-2.5 text-xs tabular-nums transition-colors ${
                        shot === i ? 'bg-white text-ink' : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {pad(i + 1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
