import { useSearchParams } from 'react-router'
import Meta from '../components/Meta'
import PageHero from '../components/PageHero'
import ContactForm, { SUBJECTS } from '../components/ContactForm'
import { Clock, Mail, MapPin, Phone, WhatsApp } from '../components/Icons'
import { Reveal } from '../components/Reveal'
import { useSettings } from '../hooks/useContent'
import { telHref, whatsappHref } from '../utils/format'

// Map a service title passed as ?subject= to the closest dropdown option.
function matchSubject(raw = '') {
  const t = raw.toLowerCase()
  const keys = [
    ['brand', 'Logo & branding'],
    ['website', 'Website development'],
    ['social', 'Social media'],
    ['performance', 'Performance marketing'],
    ['seo', 'SEO'],
    ['google business', 'Google Business Profile'],
    ['commerce', 'E-commerce'],
  ]
  if (t.includes('google business')) return 'Google Business Profile'
  const hit = keys.find(([k]) => t.includes(k))
  return hit ? hit[1] : SUBJECTS.includes(raw) ? raw : undefined
}

function InfoRow({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-md bg-white/[0.07] text-lilac">
        <Icon />
      </span>
      <div>
        <p className="eyebrow text-white/50">{label}</p>
        <div className="mt-1.5 text-lg text-white">{children}</div>
      </div>
    </div>
  )
}

export default function Contact() {
  const settings = useSettings()
  const [params] = useSearchParams()
  const subject = matchSubject(params.get('subject') || '')

  return (
    <>
      <Meta title="Contact us" description="Questions, ideas, or partnership opportunities? Reach out — our team’s ready to help." />
      <PageHero
        eyebrow="Contact"
        title="Let’s talk."
        intro="Whether you’ve got a burning question, a big idea, or just want to say hi — we’re ready."
      />

      <section className="site-container grid gap-16 pb-24 md:pb-36 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <ContactForm key={subject} defaultSubject={subject} />
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-5">
          <div className="space-y-8 rounded-lg bg-ink p-8 sm:p-10">
            <InfoRow icon={Mail} label="Email us">
              <a href={`mailto:${settings.email}`} className="hover:text-lilac">
                {settings.email}
              </a>
              <p className="text-sm text-white/55">{settings.responseTime}</p>
            </InfoRow>
            <InfoRow icon={Phone} label="Give us a ring">
              <a href={telHref(settings.phone)} className="hover:text-lilac">
                {settings.phone}
              </a>
            </InfoRow>
            <InfoRow icon={WhatsApp} label="WhatsApp">
              <a href={whatsappHref(settings.whatsapp, settings.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="hover:text-lilac">
                Chat with our team
              </a>
            </InfoRow>
            <InfoRow icon={Clock} label="Working hours">
              {settings.workingHours}
            </InfoRow>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {settings.offices.map((o) => (
              <div key={o.label} className="flex gap-4 rounded-lg bg-mist p-6">
                <MapPin className="mt-0.5 size-5 shrink-0 text-violet" />
                <div>
                  <p className="font-semibold">{o.label}</p>
                  <p className="mt-1 text-graphite">{o.address}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-violet hover:underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  )
}
