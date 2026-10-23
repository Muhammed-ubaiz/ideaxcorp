import { Link } from 'react-router'
import { motion, useReducedMotion } from 'motion/react'
import Button from '../../components/Button'
import ArrowTile from '../../components/ArrowTile'
import { ProjectPlaceholder } from '../../components/PortfolioCard'
import { Skeleton } from '../../components/Skeleton'
import { EASE, Reveal, RevealLines } from '../../components/Reveal'

const HOME_COUNT = 4
const VIEW = { once: true, margin: '0px 0px -10% 0px' }

/** Featured projects first (in their set order), then the rest by order — capped at four, never padded. */
function pickHomeProjects(projects) {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)
  return [...featured, ...others].slice(0, HOME_COUNT)
}

function ProjectCard({ project, index, onOpen }) {
  const reduced = useReducedMotion()
  const delay = (index % HOME_COUNT) * 0.12
  return (
    <motion.article
      className={index % 2 === 1 ? 'lg:mt-20' : ''}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <button type="button" onClick={() => onOpen(project)} className="group block w-full text-left" aria-label={`View ${project.title}`}>
        <motion.div
          className="relative aspect-[4/5] overflow-hidden rounded-lg bg-mist shadow-[0_30px_60px_-36px_rgba(14,11,18,0.45)] ring-1 ring-line"
          initial={reduced ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={VIEW}
          transition={{ duration: 1.4, ease: EASE, delay }}
        >
          <motion.div
            className="size-full"
            initial={reduced ? false : { scale: 1.18 }}
            whileInView={{ scale: 1 }}
            viewport={VIEW}
            transition={{ duration: 1.8, ease: EASE, delay }}
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="size-full object-cover object-top transition-transform duration-[1.6s] ease-cinema group-hover:scale-[1.06]"
              />
            ) : (
              <ProjectPlaceholder project={project} />
            )}
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <span className="absolute bottom-4 right-4 translate-y-3 opacity-0 transition-all duration-500 ease-cinema group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowTile tone="white" />
          </span>
        </motion.div>
        <div className="mt-5">
          <p className="eyebrow text-violet">{project.category}</p>
          <h3 className="display-md mt-2 text-xl transition-colors duration-500 group-hover:text-violet sm:text-[1.45rem]">{project.title}</h3>
        </div>
      </button>
    </motion.article>
  )
}

export default function PortfolioShowcase({ projects, loading, onOpen }) {
  const shown = pickHomeProjects(projects)

  return (
    <section className="relative bg-paper py-28 md:py-40">
      <div className="site-container">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal as="p" y={12} className="eyebrow mb-8 flex items-center gap-3 text-graphite">
              <span className="inline-block size-2 bg-violet" aria-hidden="true" />
              Our portfolio
            </Reveal>
            <RevealLines lines={['Selected', 'work']} className="display text-[3.4rem] leading-[0.9] sm:text-8xl lg:text-[8rem]" />
          </div>
          <Reveal delay={0.15} as="p" className="lead max-w-md">
            Where creativity, technology, and strategy come together to deliver impactful digital solutions for businesses.
          </Reveal>
        </div>

        <div className="mt-16 md:mt-20">
          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true">
              {Array.from({ length: HOME_COUNT }, (_, i) => (
                <div key={i} className={i % 2 === 1 ? 'lg:mt-20' : ''}>
                  <Skeleton className="aspect-[4/5]" />
                  <Skeleton className="mt-5 h-3 w-24" />
                  <Skeleton className="mt-3 h-6 w-3/4" />
                </div>
              ))}
            </div>
          ) : shown.length === 0 ? (
            <div className="rounded-lg border border-line px-6 py-14 text-center">
              <p className="display-md text-2xl">New work is on its way.</p>
              <p className="mt-2 text-graphite">
                Meanwhile, see what we do on the{' '}
                <Link to="/services" className="font-semibold text-violet underline-offset-4 hover:underline">
                  services page
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {shown.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} onOpen={onOpen} />
              ))}
            </div>
          )}
        </div>

        <Reveal className="mt-20 flex flex-col items-center gap-4 text-center md:mt-24">
          <Button to="/portfolio">View more projects</Button>
          {projects.length > shown.length && <p className="text-sm text-graphite">{projects.length - shown.length} more on the portfolio page</p>}
        </Reveal>
      </div>
    </section>
  )
}
