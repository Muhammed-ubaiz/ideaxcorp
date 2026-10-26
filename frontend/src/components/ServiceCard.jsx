import { Link } from 'react-router'
import { ArrowRight } from './Icons'

const pad = (n) => String(n).padStart(2, '0')

/**
 * One numbered row on the Services page: number and title lead, the description follows, and the
 * image sits at the end. On hover the title slides and turns violet while the image settles in.
 */
export default function ServiceCard({ service, index = 0 }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group grid gap-6 border-b border-line py-10 md:grid-cols-12 md:items-center md:gap-8 md:py-12"
    >
      <div className="flex gap-5 md:col-span-6 lg:col-span-5">
        <span className="pt-2 text-sm font-semibold tabular-nums text-violet">{pad(index + 1)}</span>
        <div>
          <p className="eyebrow text-smoke">{service.tagline}</p>
          <h3 className="display mt-3 text-balance text-[2.1rem] leading-[1.02] text-ink transition-[color,transform] duration-500 ease-cinema group-hover:translate-x-2 group-hover:text-violet sm:text-5xl">
            {service.title}
          </h3>
        </div>
      </div>
      <div className="md:col-span-6 lg:col-span-4">
        <p className="max-w-md text-pretty leading-relaxed text-graphite">{service.shortDescription}</p>
        <span className="mt-6 inline-flex items-center gap-3 rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-white">
          Explore service
          <ArrowRight className="size-4 transition-transform duration-500 ease-cinema group-hover:translate-x-1" />
        </span>
      </div>
      <div className="hidden overflow-hidden rounded-3xl bg-ink lg:col-span-3 lg:block">
        {service.image && (
          <img
            src={service.image}
            alt=""
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-[1.4s] ease-cinema group-hover:scale-[1.06]"
          />
        )}
      </div>
    </Link>
  )
}
