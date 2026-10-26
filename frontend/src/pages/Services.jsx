import Meta from '../components/Meta'
import PageHero from '../components/PageHero'
import ServiceCard from '../components/ServiceCard'
import { Skeleton } from '../components/Skeleton'
import { Reveal } from '../components/Reveal'
import { useCollection } from '../hooks/useContent'

const INTRO =
  'At Ideaxcorp, we provide comprehensive digital solutions designed to help businesses grow and succeed in the online world — website development, digital marketing, SEO, branding, and marketplace management, all tailored to the unique needs of each client.'

export default function Services() {
  const { data, loading } = useCollection('services')
  return (
    <>
      <Meta title="Services" description={INTRO} />
      <PageHero eyebrow="Core services" title={['Less talk,', 'more build.']} intro={INTRO} />
      <section className="site-container py-20 md:py-28">
        {loading ? (
          <div className="border-t border-ink" aria-busy="true">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="my-10 h-24" />
            ))}
          </div>
        ) : (
          <ul className="border-t border-ink">
            {data.map((s, i) => (
              <Reveal as="li" key={s.id} y={24}>
                <ServiceCard service={s} index={i} />
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
