import { Reveal, RevealImage, RevealLines } from './Reveal'
import { founder } from '../data/home'
import { paragraphs } from '../utils/format'

/**
 * "Meet Our Founder": a tall portrait pinned on the left while the complete founder's note scrolls
 * past it on the right, ending in a large signature line.
 */
export default function FounderNote({ settings }) {
  const paras = paragraphs(settings.founderNote)
  return (
    <section aria-labelledby="founder-title" className="bg-ink py-24 text-white md:py-36">
      <div className="site-container">
        <p className="section-label text-white/50">{founder.label}</p>
        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <RevealImage src={settings.founderImage} alt={settings.founderName} className="aspect-[4/5] max-w-md rounded-[1.5rem] bg-ink-2" />
              <p className="mt-6 text-lg font-semibold">{settings.founderName}</p>
              <p className="text-white/55">{settings.founderRole}</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow text-violet">{founder.eyebrow}</p>
            <RevealLines as="h2" id="founder-title" lines={[founder.title]} className="display-lg mt-6" />
            <p className="mt-4 text-white/55">{founder.byline}</p>
            <div className="mt-12 max-w-2xl space-y-6 text-lg leading-relaxed text-white/75 md:text-xl">
              {paras.map((p, i) => (
                <Reveal as="p" key={i} delay={i * 0.05} y={20}>
                  {p}
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-14 border-t border-white/15 pt-8" y={16}>
              <p className="display text-5xl sm:text-6xl">— {settings.founderName}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
