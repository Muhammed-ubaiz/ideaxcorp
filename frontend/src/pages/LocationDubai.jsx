import Meta from '../components/Meta'
import PageHero from '../components/PageHero'
import Button from '../components/Button'
import ContactForm from '../components/ContactForm'
import FaqAccordion from '../components/FaqAccordion'
import Marquee from '../components/Marquee'
import { Reveal, RevealLines } from '../components/Reveal'
import { useSettings } from '../hooks/useContent'
import { dubai as d } from '../data/locations'
import { whatsappHref } from '../utils/format'

const pad = (n) => String(n).padStart(2, '0')

/** Card grid used by the local-SEO and industry blocks. */
function CardGrid({ items, dark = false }) {
  return (
    <ul className={`mt-14 grid gap-px overflow-hidden rounded-[1.25rem] sm:grid-cols-2 lg:grid-cols-3 ${dark ? 'bg-white/15' : 'bg-ink/15'}`}>
      {items.map((it, i) => (
        <Reveal as="li" key={it.title} delay={(i % 3) * 0.06} y={20} className={`p-8 sm:p-10 ${dark ? 'bg-ink' : 'bg-paper'}`}>
          <span className="text-sm font-semibold tabular-nums text-violet">{pad(i + 1)}</span>
          <h3 className="display-md mt-6 text-2xl">{it.title}</h3>
          <p className={`mt-4 leading-relaxed ${dark ? 'text-white/65' : 'text-graphite'}`}>{it.description}</p>
        </Reveal>
      ))}
    </ul>
  )
}

/** SEO landing page for Dubai — kept at the original /dubai URL. */
export default function LocationDubai() {
  const settings = useSettings()
  return (
    <>
      <Meta title="SEO Services in Dubai" description={d.intro} />
      <PageHero eyebrow={d.eyebrow} title={d.title} intro={d.intro}>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Button href="#audit">{d.actions.audit}</Button>
          <Button to="/portfolio" variant="outline">
            {d.actions.work}
          </Button>
          <Button href={whatsappHref(settings.whatsapp, 'Hello Ideaxcorp, I would like to book an SEO consultation for my Dubai business.')} variant="outline">
            {d.actions.book}
          </Button>
        </div>
      </PageHero>

      <section className="border-t border-ink/15 py-24 md:py-32">
        <div className="site-container grid gap-12 lg:grid-cols-12">
          <RevealLines lines={d.competitive.title} className="display text-[2.4rem] sm:text-5xl lg:col-span-6 lg:text-[3.8rem]" />
          <div className="space-y-6 text-lg leading-relaxed text-ink/80 lg:col-span-6">
            {d.competitive.body.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 0.08} y={20}>
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-white md:py-32">
        <div className="site-container">
          <RevealLines lines={[d.why.title]} className="display-lg text-balance" />
          <Reveal as="p" delay={0.1} className="mt-8 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
            {d.why.intro}
          </Reveal>
          <ul className="mt-16 grid gap-10 border-t border-white/15 pt-10 md:grid-cols-3">
            {d.why.points.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} y={20}>
                <h3 className="display-md text-2xl text-violet">{p.title}</h3>
                <p className="mt-3 text-white/70">{p.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="site-container">
          <Reveal as="p" y={12} className="section-label text-graphite">
            {d.stories.eyebrow}
          </Reveal>
          <RevealLines lines={[d.stories.title]} className="display-lg mt-8 text-balance" />
          <Reveal as="p" delay={0.1} className="lead mt-6 max-w-2xl">
            {d.stories.intro}
          </Reveal>
          <ul className="mt-16 grid gap-6 lg:grid-cols-3">
            {d.stories.items.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08} className="flex flex-col rounded-[1.25rem] bg-paper-light p-8 ring-1 ring-ink/10 sm:p-10">
                <p className="eyebrow text-graphite">{s.industry}</p>
                <h3 className="display-md mt-5 text-2xl sm:text-3xl">{s.title}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-graphite">{s.description}</p>
                <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-ink/15 pt-6">
                  {s.stats.map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-sm text-graphite">{k}</dt>
                      <dd className="display mt-1 text-4xl text-violet">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-24 text-white md:py-32">
        <div className="site-container">
          <RevealLines lines={[d.local.title]} className="display-lg text-balance" />
          <Reveal as="p" delay={0.1} className="mt-6 max-w-2xl text-lg text-white/70">
            {d.local.intro}
          </Reveal>
          <CardGrid items={d.local.items} dark />
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="site-container">
          <RevealLines lines={[d.industries.title]} className="display-lg text-balance" />
          <Reveal as="p" delay={0.1} className="lead mt-6 max-w-2xl">
            {d.industries.intro}
          </Reveal>
          <CardGrid items={d.industries.items} />
        </div>
      </section>

      <section aria-labelledby="areas-title" className="border-y border-ink/15 py-16">
        <h2 id="areas-title" className="site-container section-label text-graphite">
          {d.areas.title}
        </h2>
        <Marquee duration={45} className="mt-10">
          {d.areas.items.map((a) => (
            <span key={a} className="display-md flex items-center gap-10 pr-10 text-4xl whitespace-nowrap sm:text-6xl">
              {a}
              <span className="size-2.5 rounded-full bg-violet" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </section>

      <section className="py-24 md:py-32">
        <div className="site-container">
          <RevealLines lines={[d.process.title]} className="display-lg text-balance" />
          <ol className="mt-16 border-t border-ink">
            {d.process.items.map((p, i) => (
              <Reveal as="li" key={p.title} y={20} className="grid gap-4 border-b border-ink/20 py-8 md:grid-cols-12 md:items-baseline">
                <span className="text-sm font-semibold tabular-nums text-violet md:col-span-1">{pad(i + 1)}</span>
                <h3 className="display text-3xl sm:text-4xl md:col-span-5">{p.title}</h3>
                <p className="text-lg text-graphite md:col-span-6">{p.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-ink/15 py-24 md:py-32">
        <div className="site-container grid gap-12 lg:grid-cols-12">
          <RevealLines lines={[d.faqs.title]} className="display text-[2.4rem] sm:text-5xl lg:col-span-5 lg:text-[3.8rem]" />
          <Reveal className="lg:col-span-7">
            <FaqAccordion items={d.faqs.items} />
          </Reveal>
        </div>
      </section>

      <section id="audit" className="scroll-mt-24 bg-paper-light py-24 md:py-32">
        <div className="site-container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <RevealLines lines={[d.audit.title]} className="display-lg text-balance" />
            <Reveal as="p" delay={0.1} className="lead mt-6">
              {d.audit.intro}
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7">
            <ContactForm defaultSubject="SEO" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
