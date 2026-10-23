import ArrowTile from './ArrowTile'

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
export default function PortfolioCard({ project, onOpen, aspect = 'aspect-[4/5]' }) {
  return (
    <button type="button" onClick={() => onOpen?.(project)} className="group block w-full text-left">
      <div className={`relative overflow-hidden rounded-lg bg-mist ${aspect}`}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-[1.6s] ease-cinema group-hover:scale-[1.05]"
          />
        ) : (
          <div className="size-full transition-transform duration-[1.6s] ease-cinema group-hover:scale-[1.03]">
            <ProjectPlaceholder project={project} />
          </div>
        )}
        <span className="absolute right-4 top-4 translate-y-2 opacity-0 transition-all duration-500 ease-cinema group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowTile tone="white" />
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="display-md text-xl text-ink sm:text-2xl">{project.title}</h3>
        <span className="eyebrow shrink-0 text-graphite">{project.category}</span>
      </div>
      {project.description && <p className="mt-2 line-clamp-2 max-w-xl text-graphite">{project.description}</p>}
    </button>
  )
}
