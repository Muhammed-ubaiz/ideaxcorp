import Meta from '../components/Meta'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import FounderNote from '../components/FounderNote'
import OurStory from './about/OurStory'
import VisionMission from './about/VisionMission'
import { Reveal, RevealImage } from '../components/Reveal'
import { useCollection, useSettings } from '../hooks/useContent'
import { initials, paragraphs } from '../utils/format'

export default function About() {
  const settings = useSettings()
  const { data: team } = useCollection('team')
  const story = paragraphs(settings.aboutStory)

  return (
    <>
      <Meta title="About us" description={story[0]} image="/images/team.webp" />
      <PageHero
        eyebrow="About Ideaxcorp"
        title={[
          <>
            A <span className="text-violet">data-focused</span>
          </>,
          <>
            digital marketing agency<span className="text-violet">.</span>
          </>,
        ]}
        intro={settings.tagline}
      />

      <div className="site-container">
        <RevealImage src="/images/team.webp" alt="The Ideaxcorp team" className="aspect-[16/10] rounded-lg md:aspect-[2/1]" />
      </div>

      <OurStory settings={settings} />

      <VisionMission vision={settings.vision} mission={settings.mission} />

      <section className="site-container py-24 md:py-36">
        <SectionHeading
          eyebrow="Where we work"
          title={['From the UAE', 'to Kerala.']}
          description="Ideaxcorp started in the UAE and has grown its presence across the GCC and Kerala."
        />
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <ul className="border-t border-line">
              {settings.markets.map((m) => (
                <li key={m} className="display-md flex items-center justify-between border-b border-line py-5 text-3xl sm:text-4xl">
                  {m}
                  <span className="size-2.5 bg-violet" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-6">
            {settings.offices.map((o, i) => (
              <Reveal key={o.label} delay={i * 0.1} className="rounded-lg bg-ink p-8 text-white">
                <p className="eyebrow text-white/55">{o.label}</p>
                <p className="mt-6 text-xl leading-snug">{o.address}</p>
                <p className="mt-6 text-sm text-white/55">{o.hours}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {team.length > 0 && (
        <section className="border-t border-line py-24 md:py-36">
          <div className="site-container">
            <SectionHeading eyebrow="Team" title={['Meet the minds', 'behind the mission']} />
            <ul className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
              {team.map((m, i) => (
                <Reveal as="li" key={m.id} delay={i * 0.08}>
                  <div className="aspect-[4/5] overflow-hidden rounded-lg bg-mist">
                    {m.image ? (
                      <img src={m.image} alt={m.name} loading="lazy" className="size-full object-cover object-top" />
                    ) : (
                      <div className="flex size-full items-end bg-lilac p-5">
                        <span className="display text-6xl text-violet">{initials(m.name)}</span>
                      </div>
                    )}
                  </div>
                  <p className="mt-5 text-lg font-semibold">{m.name}</p>
                  <p className="text-graphite">{m.role}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FounderNote settings={settings} />
    </>
  )
}
