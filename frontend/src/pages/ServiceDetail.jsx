import { Link, useParams } from 'react-router'
import { motion } from 'motion/react'
import Meta from '../components/Meta'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import ArrowTile from '../components/ArrowTile'
import { Check } from '../components/Icons'
import { EASE, Reveal, RevealLines } from '../components/Reveal'
import { Skeleton } from '../components/Skeleton'
import { useCollection, useSettings } from '../hooks/useContent'
import { whatsappHref } from '../utils/format'
import NotFound from './NotFound'

function Checklist({ items }) {
  return (
    <ul className="mt-8 space-y-3">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-lg">
          <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-[3px] bg-violet text-white">
            <Check className="size-3.5" />
          </span>
          {it}
        </li>
      ))}
    </ul>
  )
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const settings = useSettings()
  const { data, loading } = useCollection('services')
  const s = data.find((x) => x.slug === slug)

  if (loading) {
    return (
      <div className="site-container pt-44 pb-24">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-8 h-24 w-3/4" />
      </div>
    )
  }
  if (!s) return <NotFound />

  const others = data.filter((x) => x.slug !== slug)
  const hasBuild = s.buildItems?.length || s.rebuildItems?.length

  return (
    <>
      <Meta title={s.title} description={s.shortDescription} image={s.image} />

      <section className="site-container grid gap-12 pt-36 pb-20 md:pt-44 md:pb-28 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <motion.p className="eyebrow mb-8 flex items-center gap-3 text-graphite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Link to="/services" className="hover:text-ink">
              Services
            </Link>
            <span className="inline-block size-2 bg-violet" aria-hidden="true" />
            {s.tagline}
          </motion.p>
          <RevealLines as="h1" lines={[s.title]} animateOnMount delay={0.1} className="display text-balance text-[2.6rem] sm:text-6xl lg:text-[5.5rem]" />
          <motion.p
            className="lead mt-8 max-w-2xl text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
          >
            {s.intro || s.shortDescription}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.6 }}
          >
            <Button to={`/contact?subject=${encodeURIComponent(s.title)}`}>Book a free consultation</Button>
            <Button href={whatsappHref(settings.whatsapp, `Hello Ideaxcorp, I'd like to know more about ${s.title}.`)} variant="outline">
              WhatsApp us
            </Button>
          </motion.div>
        </div>
        {s.image && (
          <motion.div
            className="overflow-hidden rounded-lg bg-ink lg:col-span-5"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
          >
            <img src={s.image} alt="" className="aspect-[3/2] w-full object-cover" />
          </motion.div>
        )}
      </section>

      {hasBuild ? (
        <section className="bg-mist py-24 md:py-32">
          <div className="site-container grid gap-6 lg:grid-cols-2">
            {s.buildItems?.length > 0 && (
              <Reveal className="rounded-lg bg-white p-8 sm:p-12">
                <p className="eyebrow text-violet">For new businesses</p>
                <h2 className="display-md mt-4 text-3xl sm:text-4xl">Build from scratch</h2>
                <p className="mt-5 text-graphite">{s.buildLead}</p>
                <Checklist items={s.buildItems} />
                {s.buildNote && <p className="mt-8 border-t border-line pt-6 font-medium">{s.buildNote}</p>}
              </Reveal>
            )}
            {s.rebuildItems?.length > 0 && (
              <Reveal delay={0.12} className="rounded-lg bg-ink p-8 text-white sm:p-12">
                <p className="eyebrow text-lilac">For existing businesses</p>
                <h2 className="display-md mt-4 text-3xl sm:text-4xl">Revamp and redesign</h2>
                <p className="mt-5 text-white/65">{s.rebuildLead}</p>
                <Checklist items={s.rebuildItems} />
                {s.rebuildNote && <p className="mt-8 border-t border-white/15 pt-6 font-medium">{s.rebuildNote}</p>}
              </Reveal>
            )}
          </div>
        </section>
      ) : null}

      {s.offerings?.length > 0 && (
        <section className="site-container py-24 md:py-36">
          <SectionHeading eyebrow="What’s included" title={`${s.title.replace(/\s*\(.*\)/, '')} services`} size="md" />
          <div className="mt-16 grid border-t border-line md:grid-cols-2">
            {s.offerings.map((o, i) => (
              <Reveal
                key={o.title}
                delay={(i % 2) * 0.1}
                y={20}
                className={`border-b border-line py-9 md:py-10 ${i % 2 === 0 ? 'md:pr-12' : 'md:border-l md:pl-12'}`}
              >
                <h3 className="display-md text-2xl">{o.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-graphite">{o.description}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {s.highlights?.length > 0 && (
        <section className="bg-ink py-24 text-white md:py-36">
          <div className="site-container">
            <SectionHeading dark eyebrow={s.tagline} title={s.highlightsTitle || 'Why it matters'} description={s.highlightsIntro} size="md" />
            <div className={`mt-16 grid gap-6 ${s.highlights.length > 2 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2'}`}>
              {s.highlights.map((h, i) => (
                <Reveal key={h.title} delay={i * 0.08} className="rounded-lg bg-white/[0.05] p-8">
                  <span className="block size-3 bg-violet" aria-hidden="true" />
                  <h3 className="display-md mt-8 text-2xl">{h.title}</h3>
                  <p className="mt-4 text-white/65">{h.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {s.challenges?.length > 0 && (
        <section className="site-container py-24 md:py-36">
          <SectionHeading eyebrow="Challenges we solve" title={['Many businesses', 'struggle to scale.']} description="We identify growth bottlenecks and implement strategies focused on measurable business results." size="md" />
          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {s.challenges.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.08} className="bg-white p-8">
                <h3 className="text-xl font-semibold">{c.title}</h3>
                <p className="mt-3 text-graphite">{c.description}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {s.process?.length > 0 && (
        <section className="bg-mist py-24 md:py-32">
          <div className="site-container">
            <SectionHeading eyebrow="How we work" title="From audit to scale" size="md" />
            <ol className="mt-16 grid gap-8 md:grid-cols-5">
              {s.process.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 0.1} className="border-t-2 border-ink pt-6">
                  <span className="eyebrow text-violet">Step {i + 1}</span>
                  <h3 className="display-md mt-3 text-2xl">{p.title}</h3>
                  <p className="mt-3 text-graphite">{p.description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {s.platforms?.length > 0 && (
        <section className="site-container py-24 md:py-32">
          <p className="eyebrow text-graphite">Platforms we work with</p>
          <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {s.platforms.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 0.06} y={16} className="display-md text-3xl text-ink/80 sm:text-5xl">
                {p}
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {others.length > 0 && (
        <section className="border-t border-line py-24 md:py-32">
          <div className="site-container">
            <p className="eyebrow text-graphite">Explore other services</p>
            <ul className="mt-8 border-t border-line">
              {others.map((o) => (
                <li key={o.id} className="border-b border-line">
                  <Link to={`/services/${o.slug}`} className="group flex items-center justify-between gap-6 py-6">
                    <span className="display-md text-2xl transition-[color,transform] duration-700 ease-cinema group-hover:translate-x-2 group-hover:text-violet sm:text-3xl">
                      {o.title}
                    </span>
                    <ArrowTile tone="ink" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
