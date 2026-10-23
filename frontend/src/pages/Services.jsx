import Meta from '../components/Meta'
import PageHero from '../components/PageHero'
import ServiceCard from '../components/ServiceCard'
import { GridSkeleton } from '../components/Skeleton'
import { Reveal } from '../components/Reveal'
import { useCollection } from '../hooks/useContent'

const INTRO =
  'At Ideaxcorp, we provide comprehensive digital solutions designed to help businesses grow and succeed in the online world — website development, digital marketing, SEO, branding, and marketplace management, all tailored to the unique needs of each client.'

/**
 * A last card left alone on its row stretches across the row (2 columns on tablet, 3 on desktop)
 * instead of leaving empty grid cells.
 */
function orphanLayout(i, n) {
  if (i !== n - 1) return { span: '', wide: {} }
  const sm = n % 2 === 1 // alone on its row in the 2-column grid
  const lg = n % 3 === 1 // alone on its row in the 3-column grid
  const span = [sm && 'sm:col-span-2', lg ? 'lg:col-span-3' : sm && 'lg:col-span-1'].filter(Boolean).join(' ')
  return { span, wide: { sm, lg } }
}

export default function Services() {
  const { data, loading } = useCollection('services')
  return (
    <>
      <Meta title="Services" description={INTRO} />
      <PageHero eyebrow="Core services" title={['Less talk,', 'more build.']} intro={INTRO} />
      <section className="site-container pb-24 md:pb-36">
        {loading ? (
          <GridSkeleton count={6} className="aspect-[3/2]" />
        ) : (
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {data.map((s, i) => {
              const { span, wide } = orphanLayout(i, data.length)
              return (
                <Reveal key={s.id} delay={(i % 3) * 0.1} className={`h-full ${span}`}>
                  <ServiceCard service={s} wide={wide} />
                </Reveal>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}
