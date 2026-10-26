import { Reveal, RevealImage, RevealLines } from './Reveal'
import { paragraphs } from '../utils/format'

export default function FounderNote({ settings }) {
  const paras = paragraphs(settings.founderNote)
  return (
    <section className="bg-black py-24 text-white md:py-36">
      <div className="site-container grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <RevealImage src={settings.founderImage} alt={settings.founderName} className="aspect-[5/7] max-w-md rounded-[2rem] bg-ink-2" />
            <p className="mt-6 font-semibold">{settings.founderName}</p>
            <p className="text-white/55">{settings.founderRole}</p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <p className="eyebrow mb-8 flex items-center gap-3 text-white/55">
            <span className="inline-block size-1.5 rounded-full bg-violet" aria-hidden="true" />
            Founder’s note
          </p>
          <RevealLines lines={['Marketing guided by', 'insight and real data,', 'not guesswork.']} className="display text-[2.3rem] sm:text-5xl lg:text-[4.1rem]" />
          <div className="mt-12 max-w-2xl space-y-6 text-lg leading-relaxed text-white/72">
            {paras.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 0.06} y={20}>
                {p}
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 border-t border-white/15 pt-8" y={16}>
            <p className="display text-4xl text-white sm:text-5xl">{settings.founderName}</p>
            <p className="mt-2 text-white/55">{settings.founderRole}, Ideaxcorp</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
