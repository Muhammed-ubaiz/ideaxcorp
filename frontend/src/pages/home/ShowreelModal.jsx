import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Close } from '../../components/Icons'
import { EASE } from '../../components/Reveal'
import { youtubeId } from '../../utils/format'

/** Loads YouTube (privacy-enhanced mode) only once the visitor opens it. */
export default function ShowreelModal({ url, open, onClose }) {
  const id = youtubeId(url)
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && id && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-ink/90 p-4 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Ideaxcorp showreel"
        >
          <button type="button" onClick={onClose} autoFocus aria-label="Close showreel" className="absolute right-4 top-4 grid size-11 place-items-center rounded-md bg-white/10 text-white hover:bg-white/20">
            <Close className="size-6" />
          </button>
          <motion.div
            className="aspect-video w-full max-w-5xl overflow-hidden rounded-lg bg-black"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="size-full"
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              title="Ideaxcorp showreel"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
