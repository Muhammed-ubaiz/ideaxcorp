import { Link } from 'react-router'
import { ArrowUpRight } from '../../components/Icons'
import { Reveal, RevealLines } from '../../components/Reveal'
import { telHref, whatsappHref } from '../../utils/format'

/**
 * Closing call to action: one large rounded block that is itself the link. On hover a violet
 * fill rises through it and the arrow disc swells; contact routes sit underneath.
 */
export default function FinalCta({ settings }) {
  return (
    <section className="relative bg-black py-20 text-white md:py-28">
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

            <p className="kicker text-white/55 transition-colors duration-500 group-hover:text-white/80">Questions, ideas, or partnership opportunities?</p>
            <div className="mt-10 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
              <RevealLines as="p" lines={['Let’s build', 'something', 'meaningful.']} className="display text-[3.2rem] leading-[0.95] sm:text-8xl lg:text-[8rem]" />
              <span className="flex shrink-0 items-center gap-5">
                <span className="text-lg font-semibold">Let’s talk</span>
                <span className="grid size-20 place-items-center rounded-full bg-white text-ink transition-transform duration-700 ease-cinema group-hover:rotate-45 group-hover:scale-110 sm:size-28">
                  <ArrowUpRight className="size-8 sm:size-10" />
                </span>
              </span>
            </div>
          </Link>
        </Reveal>

        <Reveal className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" y={16}>
          <a href={`mailto:${settings.email}`} className="group">
            <span className="kicker block text-[0.72rem] text-white/45">Email us</span>
            <span className="link-underline mt-3 inline-block text-lg">{settings.email}</span>
          </a>
          <a href={telHref(settings.phone)} className="group">
            <span className="kicker block text-[0.72rem] text-white/45">Call us</span>
            <span className="link-underline mt-3 inline-block text-lg">{settings.phone}</span>
          </a>
          <a href={whatsappHref(settings.whatsapp, settings.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="group">
            <span className="kicker block text-[0.72rem] text-white/45">WhatsApp</span>
            <span className="link-underline mt-3 inline-block text-lg">Chat with our team</span>
          </a>
          <div>
            <span className="kicker block text-[0.72rem] text-white/45">Offices</span>
            <span className="mt-3 block text-lg">Dubai, UAE · Thrissur, Kerala</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
