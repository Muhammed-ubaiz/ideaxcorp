import { Link } from 'react-router'
import Magnetic from '../../components/motion/Magnetic'
import { ArrowUpRight } from '../../components/Icons'
import { Reveal, RevealLines } from '../../components/Reveal'
import { telHref, whatsappHref } from '../../utils/format'

export default function FinalCta({ settings }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-28 text-white md:py-40">
      {/* slow rotating aurora in brand violet */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="animate-spin-slower absolute left-1/2 top-1/2 size-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(151,0,255,0.45)_70deg,transparent_160deg,rgba(192,101,255,0.25)_250deg,transparent_330deg)] blur-[90px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
      </div>

      <div className="site-container">
        <Reveal as="p" y={12} className="eyebrow mb-10 text-white/55">
          Questions, ideas, or partnership opportunities?
        </Reveal>
        <div className="flex flex-col gap-14 lg:flex-row lg:items-end lg:justify-between">
          <RevealLines lines={['Let’s build', 'something', 'meaningful.']} className="display text-[3.2rem] leading-[0.88] sm:text-8xl lg:text-[8.5rem]" />
          <Reveal delay={0.3} className="shrink-0">
            <Magnetic strength={0.4}>
              <Link
                to="/contact"
                className="group relative grid size-44 place-items-center overflow-hidden rounded-[6px] bg-violet text-white shadow-[0_0_80px_-10px_rgba(151,0,255,0.8)] transition-transform duration-700 ease-cinema hover:scale-105 md:size-56"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-700 ease-cinema group-hover:scale-y-100" />
                <span className="relative flex flex-col items-center gap-3 font-semibold transition-colors duration-500 group-hover:text-violet">
                  <ArrowUpRight className="size-10 md:size-12" />
                  Let’s talk
                </span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal className="mt-20 grid gap-8 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-4" y={16}>
          <a href={`mailto:${settings.email}`} className="group">
            <span className="eyebrow block text-white/45">Email us</span>
            <span className="link-underline mt-2 inline-block text-lg">{settings.email}</span>
          </a>
          <a href={telHref(settings.phone)} className="group">
            <span className="eyebrow block text-white/45">Call us</span>
            <span className="link-underline mt-2 inline-block text-lg">{settings.phone}</span>
          </a>
          <a href={whatsappHref(settings.whatsapp, settings.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="group">
            <span className="eyebrow block text-white/45">WhatsApp</span>
            <span className="link-underline mt-2 inline-block text-lg">Chat with our team</span>
          </a>
          <div>
            <span className="eyebrow block text-white/45">Offices</span>
            <span className="mt-2 block text-lg">Dubai, UAE · Thrissur, Kerala</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
