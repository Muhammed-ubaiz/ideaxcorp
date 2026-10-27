import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Meta from '../components/Meta'
import PageHero from '../components/PageHero'
import PortfolioCard from '../components/PortfolioCard'
import ProjectViewer from '../components/ProjectViewer'
import Button from '../components/Button'
import { GridSkeleton } from '../components/Skeleton'
import { EASE } from '../components/Reveal'
import { useCollection, useSettings } from '../hooks/useContent'

const ALL = 'All work'

export default function Portfolio() {
  const settings = useSettings()
  const { data, loading } = useCollection('portfolio')
  const [filter, setFilter] = useState(ALL)
  const [project, setProject] = useState(null)

  const categories = useMemo(() => [ALL, ...new Set(data.map((p) => p.category).filter(Boolean))], [data])
  const items = filter === ALL ? data : data.filter((p) => p.category === filter)

  return (
    <>
      <Meta title="Portfolio" description="We craft powerful websites and digital solutions that help brands grow, engage and convert." />
      <PageHero
        eyebrow="Our portfolio"
        title={['Exceptional', 'digital experiences.']}
        intro="We craft powerful websites and digital solutions that help brands grow, engage and convert."
      />

      <section className="site-container py-16 md:py-20">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                filter === c ? 'bg-ink text-white' : 'border border-ink/25 text-ink hover:border-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {loading ? (
            <GridSkeleton className="aspect-[3/4] rounded-xl" />
          ) : (
            <motion.div layout className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {items.map((p, i) => (
                  <motion.div
                    layout
                    key={p.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.08 }}
                  >
                    <PortfolioCard project={p} onOpen={setProject} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {settings.portfolioDriveUrl && (
          <div className="mt-16 flex flex-col items-start gap-6 rounded-xl bg-ink p-8 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <p className="display text-balance text-3xl sm:text-4xl">There’s more where this came from.</p>
            <Button href={settings.portfolioDriveUrl} variant="light" className="shrink-0">View more work on Drive</Button>
          </div>
        )}
      </section>

      <ProjectViewer project={project} projects={items} onNavigate={setProject} onClose={() => setProject(null)} />
    </>
  )
}
