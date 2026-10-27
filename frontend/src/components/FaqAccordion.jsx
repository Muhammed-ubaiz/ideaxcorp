import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from './Icons'
import { EASE } from './Reveal'

export default function FaqAccordion({ items, dark = false }) {
  const [open, setOpen] = useState(0)
  const uid = useId()
  return (
    <ul className={`border-t ${dark ? 'border-white/40' : 'border-ink'}`}>
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <li key={f.id || i} className={`border-b ${dark ? 'border-white/15' : 'border-ink/20'}`}>
            <h3>
              <button
                type="button"
                id={`${uid}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-a${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-start justify-between gap-6 py-7 text-left md:py-8"
              >
                <span className={`display-md text-xl transition-[color,translate] duration-500 ease-cinema group-hover:translate-x-1.5 group-hover:text-violet sm:text-[1.7rem] ${dark ? 'text-white' : 'text-ink'}`}>{f.question}</span>
                <span
                  className={`mt-0.5 grid size-10 shrink-0 place-items-center rounded-full transition-[background-color,transform] duration-500 ease-cinema ${
                    isOpen ? 'rotate-45 bg-ink text-white' : dark ? 'bg-white/10 text-white' : 'border border-ink/15 text-ink group-hover:border-ink'
                  }`}
                >
                  <Plus />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${uid}-a${i}`}
                  role="region"
                  aria-labelledby={`${uid}-q${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className={`max-w-3xl pb-9 pr-14 text-lg leading-relaxed ${dark ? 'text-white/65' : 'text-graphite'}`}>{f.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
