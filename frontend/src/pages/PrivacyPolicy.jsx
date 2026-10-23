import { useMemo } from 'react'
import Meta from '../components/Meta'
import PageHero from '../components/PageHero'
import { useSettings } from '../hooks/useContent'
import { formatDate } from '../utils/format'
import { sanitizeHtml } from '../utils/sanitize'

export default function PrivacyPolicy() {
  const settings = useSettings()
  const html = useMemo(() => sanitizeHtml(settings.privacyPolicy), [settings.privacyPolicy])
  return (
    <>
      <Meta title="Privacy policy" description="How Ideaxcorp collects, uses and protects your personal information." />
      <PageHero
        eyebrow={`Last updated ${formatDate(settings.privacyUpdated, { day: 'numeric', month: 'long', year: 'numeric' })}`}
        title="Privacy policy."
      />
      <section className="mx-auto max-w-3xl px-5 pb-24 sm:px-8 md:pb-36">
        <div className="prose-ix" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </>
  )
}
