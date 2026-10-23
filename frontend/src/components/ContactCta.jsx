import { Link } from 'react-router'
import ArrowTile from './ArrowTile'
import { RevealLines, Reveal } from './Reveal'
import { useSettings } from '../hooks/useContent'
import { telHref } from '../utils/format'

/** Closing call to action shown above the footer on most pages. */
export default function ContactCta() {
  const settings = useSettings()
  return (
    <section className="bg-violet text-white">
      <div className="site-container py-24 md:py-32">
        <p className="eyebrow mb-8 text-white/70">Questions, ideas, or partnership opportunities?</p>
        <Link to="/contact" className="group flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <RevealLines
            lines={['Let’s build', 'together.']}
            className="display text-[3.4rem] leading-[0.88] sm:text-8xl lg:text-[9.5rem]"
          />
          <span className="flex items-center gap-4 text-lg font-semibold">
            <span className="transition-transform duration-500 ease-cinema group-hover:-translate-x-2">Start a project</span>
            <ArrowTile size="lg" tone="ink" />
          </span>
        </Link>
        <Reveal className="mt-16 grid gap-6 border-t border-white/25 pt-8 text-lg sm:grid-cols-3" y={16}>
          <a href={`mailto:${settings.email}`} className="hover:underline">
            <span className="eyebrow block text-white/60">Email us</span>
            {settings.email}
          </a>
          <a href={telHref(settings.phone)} className="hover:underline">
            <span className="eyebrow block text-white/60">Call us</span>
            {settings.phone}
          </a>
          <p>
            <span className="eyebrow block text-white/60">Offices</span>
            Dubai, UAE · Thrissur, Kerala
          </p>
        </Reveal>
      </div>
    </section>
  )
}
