import { Link } from 'react-router'
import { motion, useReducedMotion } from 'motion/react'
import Button from '../../components/Button'
import { ArrowUpRight } from '../../components/Icons'
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

/** Large rounded project card: the frame opens upward, the image settles, and the category rides on a pill. */
function ProjectCard({ project, index, onOpen }) {
  const reduced = useReducedMotion()
  const delay = (index % 2) * 0.12
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <button type="button" onClick={() => onOpen(project)} className="group block w-full text-left" aria-label={`View ${project.title}`}>
        <motion.div
          className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-mist ring-1 ring-ink/10"
          initial={reduced ? false : { clipPath: 'inset(100% 0% 0% 0% round 1.5rem)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 1.5rem)' }}
          viewport={VIEW}
          transition={{ duration: 1.4, ease: EASE, delay }}
        >
          <motion.div
            className="size-full"
            initial={reduced ? false : { scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={VIEW}
            transition={{ duration: 1.8, ease: EASE, delay }}
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="size-full object-cover object-top transition-transform duration-[1.6s] ease-cinema group-hover:scale-[1.05]"
              />
            ) : (
              <ProjectPlaceholder project={project} />
            )}
          </motion.div>
          {project.category && (
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-ink backdrop-blur sm:left-5 sm:top-5">
              @{project.category}
            </span>
          )}
        </motion.div>
        <div className="mt-6 flex items-start justify-between gap-6">
          <h3 className="display-md text-2xl transition-colors duration-500 group-hover:text-violet sm:text-[1.9rem]">{project.title}</h3>
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </button>
    </motion.article>
  )
}

export default function PortfolioShowcase({ projects, loading, onOpen }) {
  const shown = pickHomeProjects(projects)

  return (
    <section className="relative bg-white py-28 md:py-40">
      <div className="site-container">
        <div className="flex flex-col items-center text-center">
          <Reveal as="p" y={12} className="kicker mb-8 flex items-center gap-3 text-graphite">
            <span className="inline-block size-1.5 rounded-full bg-violet" aria-hidden="true" />
            Our portfolio
          </Reveal>
          <RevealLines lines={['Selected work']} className="display text-[3.4rem] leading-[0.95] sm:text-8xl lg:text-[8rem]" />
          <Reveal delay={0.15} as="p" className="lead mt-8 max-w-xl">
            Where creativity, technology, and strategy come together to deliver impactful digital solutions for businesses.
          </Reveal>
        </div>

        <div className="mt-16 md:mt-24">
          {loading ? (
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2" aria-busy="true">
              {Array.from({ length: HOME_COUNT }, (_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-[5/4] rounded-3xl" />
                  <Skeleton className="mt-6 h-7 w-2/3" />
                </div>
              ))}
            </div>
          ) : shown.length === 0 ? (
            <div className="rounded-3xl border border-line px-6 py-14 text-center">
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
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-20">
              {shown.map((p, i) => (
                <div key={p.id} className={i % 2 === 1 ? 'md:mt-24' : ''}>
                  <ProjectCard project={p} index={i} onOpen={onOpen} />
                </div>
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
