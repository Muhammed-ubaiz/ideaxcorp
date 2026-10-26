import { ArrowUpRight } from './Icons'

/** Typographic stand-in for projects that don't have imagery yet. */
export function ProjectPlaceholder({ project }) {
  const host = project.url ? project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : ''
  return (
    <div className="flex size-full flex-col justify-between bg-violet p-7 text-white sm:p-9">
      <span className="eyebrow text-white/70">{project.category}</span>
      <div>
        <p className="display text-4xl sm:text-5xl">{project.title}</p>
        {host && <p className="mt-3 font-medium text-white/75">{host}</p>}
      </div>
    </div>
  )
}

/** Portfolio tile. Clicking opens the project viewer (handled by the parent via onOpen). */
export default function PortfolioCard({ project, onOpen, aspect = 'aspect-[5/4]' }) {
  return (
    <button type="button" onClick={() => onOpen?.(project)} className="group block w-full text-left">
      <div className={`relative overflow-hidden rounded-3xl bg-mist ring-1 ring-ink/10 ${aspect}`}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="size-full object-cover object-top transition-transform duration-[1.6s] ease-cinema group-hover:scale-[1.05]"
          />
        ) : (
          <div className="size-full transition-transform duration-[1.6s] ease-cinema group-hover:scale-[1.03]">
            <ProjectPlaceholder project={project} />
          </div>
        )}
        {project.category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-ink backdrop-blur sm:left-5 sm:top-5">
            @{project.category}
          </span>
        )}
      </div>
      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <h3 className="display-md text-2xl text-ink transition-colors duration-500 group-hover:text-violet sm:text-[1.9rem]">{project.title}</h3>
          {project.description && <p className="mt-2 line-clamp-2 max-w-xl text-graphite">{project.description}</p>}
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
          <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  )
}
