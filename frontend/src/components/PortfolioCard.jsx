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

/**
 * Compact portfolio card: a 3:4 image (posters and wide shots share one crop), then a small title,
 * category and two-line description. Hovering eases the image in and reveals the arrow chip.
 * Clicking opens the project viewer (handled by the parent via onOpen). `dark` is for ink sections.
 */
export default function PortfolioCard({ project, onOpen, dark = false }) {
  return (
    <button type="button" onClick={() => onOpen?.(project)} className="group block w-full text-left">
      <div className={`relative aspect-[3/4] overflow-hidden rounded-xl ${dark ? 'bg-ink-2' : 'bg-mist'}`}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="size-full object-cover transition-[scale,filter] duration-[1.2s] ease-cinema group-hover:scale-[1.04]"
          />
        ) : (
          <ProjectPlaceholder project={project} />
        )}
        <span className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/10" aria-hidden="true" />
        <span className="absolute right-3 bottom-3 grid size-10 translate-y-2 place-items-center rounded-full bg-white text-ink opacity-0 transition-[opacity,translate] duration-500 ease-cinema group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className={`mt-4 flex items-baseline justify-between gap-4 border-b pb-3 ${dark ? 'border-white/15' : 'border-ink/15'}`}>
        <h3 className="truncate text-base font-semibold tracking-tight transition-colors duration-500 group-hover:text-violet sm:text-lg">{project.title}</h3>
        {project.category && <span className={`shrink-0 text-xs ${dark ? 'text-white/50' : 'text-smoke'}`}>{project.category}</span>}
      </div>
      {project.description && <p className={`mt-3 line-clamp-2 text-sm leading-relaxed ${dark ? 'text-white/60' : 'text-graphite'}`}>{project.description}</p>}
    </button>
  )
}
