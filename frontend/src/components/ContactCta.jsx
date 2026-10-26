import { Link } from 'react-router'
import { ArrowUpRight } from './Icons'
import { RevealLines, Reveal } from './Reveal'
import { useSettings } from '../hooks/useContent'
import { telHref } from '../utils/format'

/**
 * Closing call to action shown above the footer on inner pages: one large rounded block that is
 * itself the link (a violet fill rises through it on hover), with contact routes underneath.
 */
export default function ContactCta() {
  const settings = useSettings()
  return (
    <section className="bg-black py-20 text-white md:py-28">
      <div className="site-container">
        <Reveal y={30}>
          <Link
            to="/contact"
            className="group relative isolate block overflow-hidden rounded-[2rem] bg-ink-2 px-7 py-14 sm:px-12 sm:py-20 lg:rounded-[2.5rem] lg:px-16 lg:py-24"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-violet transition-transform duration-700 ease-cinema group-hover:scale-y-100"
            />
            <span aria-hidden="true" className="absolute -right-24 -top-24 -z-10 size-96 rounded-full bg-violet/30 blur-[100px] transition-opacity duration-700 group-hover:opacity-0" />

            <p className="eyebrow text-white/55 transition-colors duration-500 group-hover:text-white/80">Questions, ideas, or partnership opportunities?</p>
            <div className="mt-10 flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
              <RevealLines as="p" lines={['Let’s build', 'together.']} className="display text-[3.4rem] leading-[0.95] sm:text-8xl lg:text-[8.5rem]" />
              <span className="flex shrink-0 items-center gap-5">
                <span className="text-lg font-semibold">Start a project</span>
                <span className="grid size-20 place-items-center rounded-full bg-white text-ink transition-transform duration-700 ease-cinema group-hover:rotate-45 group-hover:scale-110 sm:size-28">
                  <ArrowUpRight className="size-8 sm:size-10" />
                </span>
              </span>
            </div>
          </Link>
        </Reveal>

        <Reveal className="mt-14 grid gap-8 sm:grid-cols-3" y={16}>
          <a href={`mailto:${settings.email}`} className="group">
            <span className="eyebrow block text-white/45">Email us</span>
            <span className="link-underline mt-3 inline-block text-lg">{settings.email}</span>
          </a>
          <a href={telHref(settings.phone)} className="group">
            <span className="eyebrow block text-white/45">Call us</span>
            <span className="link-underline mt-3 inline-block text-lg">{settings.phone}</span>
          </a>
          <p>
            <span className="eyebrow block text-white/45">Offices</span>
            <span className="mt-3 block text-lg">Dubai, UAE · Thrissur, Kerala</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
