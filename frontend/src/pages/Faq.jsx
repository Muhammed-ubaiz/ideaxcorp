import Meta from '../components/Meta'
import PageHero from '../components/PageHero'
import FaqAccordion from '../components/FaqAccordion'
import Button from '../components/Button'
import { Reveal } from '../components/Reveal'
import { Skeleton } from '../components/Skeleton'
import { useCollection } from '../hooks/useContent'

export default function Faq() {
  const { data, loading } = useCollection('faqs')
  return (
    <>
      <Meta title="FAQ" description="Answers to common questions about Ideaxcorp’s services and how we work." />
      <PageHero
        eyebrow="FAQs"
        title={['Frequently asked', 'questions.']}
        intro="Got questions? Explore our FAQs to learn more about our services and how we work."
      />
      <section className="site-container grid gap-14 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {loading ? <Skeleton className="h-96" /> : <FaqAccordion items={data} />}
        </div>
        <Reveal delay={0.15} className="lg:col-span-4">
          <div className="rounded-[1.25rem] bg-violet p-8 text-white sm:p-10 lg:sticky lg:top-28">
            <h2 className="display text-4xl sm:text-5xl">Still have a question?</h2>
            <p className="mt-5 text-white/80">Tell us about your business and we’ll recommend a strategy tailored to your needs.</p>
            <Button to="/contact" variant="light" className="mt-8">
              Contact us
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
