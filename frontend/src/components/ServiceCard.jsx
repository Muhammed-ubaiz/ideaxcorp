import { Link } from 'react-router'
import { ArrowRight } from './Icons'

const pad = (n) => String(n).padStart(2, '0')

/**
 * One numbered row on the Services page: number, tagline and an oversized title lead, the
 * description follows, and the image opens out of a mask on hover. The title slides and turns violet.
 */
export default function ServiceCard({ service, index = 0 }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group grid gap-6 border-b border-ink/20 py-10 md:grid-cols-12 md:items-center md:gap-8 md:py-14"
    >
      <span className="text-sm font-semibold tabular-nums text-violet md:col-span-1 md:self-start md:pt-3">{pad(index + 1)}</span>
      <div className="md:col-span-11 lg:col-span-6">
        <p className="eyebrow text-smoke">{service.tagline}</p>
        <h3 className="display mt-4 text-balance text-[2.3rem] leading-[0.98] text-ink transition-[translate,color] duration-700 ease-cinema group-hover:translate-x-3 group-hover:text-violet sm:text-6xl lg:text-[4rem]">
          {service.title}
        </h3>
      </div>
      <div className="md:col-span-7 md:col-start-2 lg:col-span-3 lg:col-start-auto">
        <p className="max-w-md text-pretty leading-relaxed text-graphite">{service.shortDescription}</p>
        <span className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-ink">
          <span className="link-underline">Explore service</span>
          <span className="grid size-10 place-items-center rounded-full border border-ink/20 transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
            <ArrowRight className="size-4 transition-transform duration-500 ease-cinema group-hover:translate-x-0.5" />
          </span>
        </span>
      </div>
      <div className="hidden overflow-hidden rounded-[1.25rem] bg-ink [clip-path:inset(12%_8%_12%_8%_round_1.25rem)] transition-[clip-path] duration-1000 ease-cinema group-hover:[clip-path:inset(0%_0%_0%_0%_round_1.25rem)] md:col-span-4 lg:col-span-2 lg:block">
        {service.image && (
          <img
            src={service.image}
            alt=""
            loading="lazy"
            className="aspect-[4/5] w-full object-cover grayscale transition-[filter,scale] duration-1000 ease-cinema group-hover:scale-[1.06] group-hover:grayscale-0"
          />
        )}
      </div>
    </Link>
  )
}
