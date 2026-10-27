import { Link } from 'react-router'
import { ArrowUpRight } from '../../components/Icons'
import { Reveal, RevealLines } from '../../components/Reveal'
import { contact } from '../../data/home'
import { telHref } from '../../utils/format'

/** Brand-violet band: the invitation, then the three ways to reach the team as large tiles. */
export default function ContactSection({ settings }) {
  const routes = [
    { label: contact.email, value: settings.email, href: `mailto:${settings.email}` },
    { label: contact.call, value: settings.phone, href: telHref(settings.phone) },
    { label: contact.cta, value: contact.build, to: '/contact' },
  ]

  return (
    <section aria-labelledby="contact-title" className="bg-violet py-24 text-white md:py-36">
      <div className="site-container">
        <Reveal as="p" y={12} className="section-label text-white/70">
          {contact.label}
        </Reveal>
        <RevealLines id="contact-title" lines={contact.lines} className="display-lg mt-8 text-balance" />
        <Reveal as="p" delay={0.15} className="mt-8 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
          {contact.intro}
        </Reveal>

        <ul className="mt-16 grid gap-4 md:grid-cols-3">
          {routes.map((r, i) => {
            const inner = (
              <>
                <span className="eyebrow text-white/70">{r.label}</span>
                <span className="mt-10 flex items-end justify-between gap-4">
                  <span className="break-all text-xl font-semibold sm:text-2xl">{r.value}</span>
                  <ArrowUpRight className="size-6 shrink-0 transition-transform duration-700 ease-cinema group-hover:rotate-45" />
                </span>
              </>
            )
            const cls = 'group flex h-full flex-col justify-between rounded-[1.25rem] bg-white/10 p-7 transition-colors duration-500 hover:bg-white hover:text-ink sm:p-8'
            return (
              <Reveal as="li" key={r.label} delay={i * 0.08} y={24}>
                {r.to ? (
                  <Link to={r.to} className={cls}>
                    {inner}
                  </Link>
                ) : (
                  <a href={r.href} className={cls}>
                    {inner}
                  </a>
                )}
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
