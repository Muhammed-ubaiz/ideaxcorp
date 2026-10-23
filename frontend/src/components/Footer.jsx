import { Link } from 'react-router'
import Logo from './Logo'
import { Facebook, Instagram, LinkedIn, YouTube } from './Icons'
import { useCollection, useSettings } from '../hooks/useContent'
import { telHref } from '../utils/format'

const COMPANY = [
  { to: '/about', label: 'About us' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/blog', label: 'Blog' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy-policy', label: 'Privacy policy' },
]

export default function Footer() {
  const settings = useSettings()
  const { data: services } = useCollection('services')
  const socials = [
    ['instagram', 'Instagram', Instagram],
    ['facebook', 'Facebook', Facebook],
    ['linkedin', 'LinkedIn', LinkedIn],
    ['youtube', 'YouTube', YouTube],
  ].filter(([key]) => settings.socials?.[key])

  return (
    <footer className="bg-ink text-white">
      <div className="site-container grid gap-14 pt-20 pb-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo light className="h-11 w-auto" />
          <p className="mt-6 max-w-sm text-white/60">{settings.tagline}</p>
          <ul className="mt-8 flex gap-2">
            {socials.map(([key, label, Icon]) => (
              <li key={key}>
                <a
                  href={settings.socials[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-md bg-white/[0.06] text-white/80 transition-colors hover:bg-violet hover:text-white"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="eyebrow text-white/45">Services</h2>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`/services/${s.slug}`} className="link-underline text-white/80 transition-colors hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="eyebrow text-white/45">Company</h2>
          <ul className="mt-5 space-y-3">
            {COMPANY.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-underline text-white/80 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="eyebrow text-white/45">Get in touch</h2>
          <a href={`mailto:${settings.email}`} className="link-underline mt-5 block w-fit text-lg font-medium hover:text-lilac">
            {settings.email}
          </a>
          <a href={telHref(settings.phone)} className="link-underline mt-1 block w-fit text-lg font-medium hover:text-lilac">
            {settings.phone}
          </a>
          <div className="mt-6 space-y-4 text-sm text-white/60">
            {settings.offices?.map((o) => (
              <p key={o.label}>
                <span className="block text-white/85">{o.label}</span>
                {o.address}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="site-container flex flex-col gap-3 border-t border-white/10 py-7 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Ideaxcorp. All rights reserved.</p>
        <p>Serving {settings.markets?.join(' · ')}</p>
      </div>
    </footer>
  )
}
