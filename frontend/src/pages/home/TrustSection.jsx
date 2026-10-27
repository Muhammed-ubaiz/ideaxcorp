import Button from '../../components/Button'
import Marquee from '../../components/Marquee'
import ScrollWords from '../../components/motion/ScrollWords'
import { Reveal, RevealLines } from '../../components/Reveal'
import { trust } from '../../data/home'
import { clients } from '../../data/site'
import { whatsappHref } from '../../utils/format'

/** Trust statement: a two-line headline beside the action, a scroll-lit statement, and the client names drifting past. */
export default function TrustSection({ settings }) {
  return (
    <section id="trust" aria-labelledby="trust-title" className="border-t border-ink/15 py-24 md:py-36">
      <div className="site-container">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <RevealLines id="trust-title" lines={trust.lines} className="display-lg" />
          {settings.whatsapp && (
            <Reveal delay={0.2} className="shrink-0">
              <Button href={whatsappHref(settings.whatsapp, settings.whatsappMessage)}>{trust.cta}</Button>
            </Reveal>
          )}
        </div>
        <ScrollWords
          as="p"
          text={trust.statement}
          highlight={['Real', 'Results']}
          className="display mt-20 max-w-5xl text-balance text-[2.2rem] leading-[1.02] sm:text-6xl md:mt-28 lg:text-[5rem]"
        />
      </div>

      <Marquee duration={40} className="mt-20 border-y border-ink/15 py-8 md:mt-28">
        {clients.map((name) => (
          <span key={name} className="display-md flex items-center gap-10 pr-10 text-3xl whitespace-nowrap text-ink/70 sm:text-5xl">
            {name}
            <span className="size-2.5 rounded-full bg-violet" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </section>
  )
}
