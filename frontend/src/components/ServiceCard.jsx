import { Link } from 'react-router'
import ArrowTile from './ArrowTile'

/**
 * Card used on the Services page grid.
 * `wide` ({ sm, lg }) switches to a side-by-side layout at the breakpoints where the card spans a full row.
 */
export default function ServiceCard({ service, wide = {} }) {
  const row = `${wide.sm ? 'sm:flex-row' : ''} ${wide.sm && !wide.lg ? 'lg:flex-col' : ''} ${wide.lg && !wide.sm ? 'lg:flex-row' : ''}`
  const media = `${wide.sm ? 'sm:aspect-auto sm:w-1/2' : ''} ${wide.sm && !wide.lg ? 'lg:aspect-[3/2] lg:w-auto' : ''} ${wide.lg ? 'lg:aspect-auto lg:w-1/3' : ''}`
  const isWide = wide.sm || wide.lg
  return (
    <Link
      to={`/services/${service.slug}`}
      className={`group flex h-full flex-col bg-white transition-colors duration-500 hover:bg-ink ${row}`}
    >
      <div className={`aspect-[3/2] shrink-0 overflow-hidden bg-ink ${media}`}>
        {service.image && (
          <img
            src={service.image}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-[1.4s] ease-cinema group-hover:scale-[1.06]"
          />
        )}
      </div>
      <div className={`flex flex-1 flex-col p-7 sm:p-8 ${wide.lg ? 'lg:justify-center lg:px-12' : ''}`}>
        <p className="eyebrow text-violet">{service.tagline}</p>
        <h3
          className={`display-md mt-3 text-2xl leading-[1.1] text-ink transition-colors duration-500 group-hover:text-white sm:text-[1.7rem] ${isWide ? '' : 'sm:min-h-[2.2em]'}`}
        >
          {service.title}
        </h3>
        <p className={`mt-4 text-graphite transition-colors duration-500 group-hover:text-white/65 ${isWide ? 'max-w-2xl' : 'flex-1'}`}>{service.shortDescription}</p>
        <span
          className={`mt-8 flex items-center justify-between border-t border-line pt-5 text-sm font-semibold text-ink transition-colors duration-500 group-hover:border-white/15 group-hover:text-white ${
            wide.lg ? 'lg:max-w-md' : ''
          }`}
        >
          Explore service
          <ArrowTile size="sm" />
        </span>
      </div>
    </Link>
  )
}
