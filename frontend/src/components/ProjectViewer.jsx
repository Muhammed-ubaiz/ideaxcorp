import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Close } from './Icons'
import Button from './Button'
import { ProjectPlaceholder } from './PortfolioCard'
import { EASE } from './Reveal'

/** Full-screen project view with all images, description, tags and a link to the live site. */
export default function ProjectViewer({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  const images = project ? [project.image, ...(project.gallery || [])].filter(Boolean) : []

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] overflow-y-auto bg-ink/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onClose}
          data-lenis-prevent
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="relative mx-auto my-6 w-[calc(100%-2rem)] max-w-5xl rounded-[2rem] bg-white sm:my-12"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="absolute right-4 top-4 z-10 grid size-12 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-violet sm:right-6 sm:top-6"
              aria-label="Close project"
            >
              <Close className="size-6" />
            </button>
            <div className="p-6 pt-20 sm:p-12">
              <p className="inline-flex rounded-full bg-mist px-4 py-2 text-sm font-semibold text-ink">@{project.category}</p>
              <h2 className="display mt-4 text-4xl sm:text-6xl">{project.title}</h2>
              {project.description && <p className="lead mt-6 max-w-2xl">{project.description}</p>}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {project.tags?.map((t) => (
                  <span key={t} className="rounded-full bg-mist px-4 py-1.5 text-sm font-medium text-ink">
                    {t}
                  </span>
                ))}
                {project.url && (
                  <Button href={project.url} size="sm" className="ml-auto">
                    Visit website
                  </Button>
                )}
              </div>
            </div>
            <div className="space-y-4 px-4 pb-4 sm:px-6 sm:pb-6">
              {images.length ? (
                images.map((src) => <img key={src} src={src} alt="" loading="lazy" className="w-full rounded-2xl" />)
              ) : (
                <div className="aspect-[16/9] overflow-hidden rounded-2xl">
                  <ProjectPlaceholder project={project} />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
