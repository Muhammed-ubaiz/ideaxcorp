import { Link } from 'react-router'
import Button from '../../components/Button'
import FaqAccordion from '../../components/FaqAccordion'
import { Reveal, RevealLines } from '../../components/Reveal'
import { faqs as copy } from '../../data/home'

/** Heading pinned on the left, the accordion on the right. Shows the FAQs marked as featured. */
export default function FaqSection({ items }) {
  const featured = items.filter((f) => f.featured)
  const list = featured.length ? featured : items
  if (!list.length) return null

  return (
    <section aria-labelledby="faq-title" className="border-t border-ink/15 py-24 md:py-36">
      <div className="site-container grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal as="p" y={12} className="section-label text-graphite">
              {copy.label}
            </Reveal>
            <RevealLines id="faq-title" lines={copy.lines} className="display mt-8 text-[2.6rem] sm:text-6xl lg:text-[4.2rem]" />
            <Reveal as="p" delay={0.15} className="mt-8 max-w-md text-lg leading-relaxed text-graphite">
              {copy.intro}
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-5">
              <Button to="/contact">{copy.cta}</Button>
              <Link to="/faq" className="link-underline font-semibold">
                All FAQs
              </Link>
            </Reveal>
          </div>
        </div>
        <Reveal className="lg:col-span-7">
          <FaqAccordion items={list} />
        </Reveal>
      </div>
    </section>
  )
}
