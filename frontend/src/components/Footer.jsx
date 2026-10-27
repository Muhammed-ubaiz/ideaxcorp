import { useState } from 'react'
import { Link } from 'react-router'
import Logo from './Logo'
import { ArrowUpRight, Facebook, Instagram, LinkedIn, WhatsApp, YouTube } from './Icons'
import { Reveal } from './Reveal'
import { useSettings } from '../hooks/useContent'
import { telHref, whatsappHref } from '../utils/format'

// Column contents follow the live site's footer.
const QUICK_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/about#team', label: 'Our Team' },
  { to: '/blog', label: 'Blogs' },
  { to: '/faq', label: 'FAQs' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
]

const SERVICE_LINKS = [
  { to: '/services/creative-branding', label: 'Logo & Branding' },
  { to: '/services/web-development', label: 'Web Development' },
  { to: '/services/social-media-management', label: 'Social Media Management' },
  { to: '/services/search-engine-optimization', label: 'SEO' },
  { to: '/dubai', label: 'SEO in Dubai' },
  { to: '/services/performance-marketing', label: 'Performance Marketing' },
  { to: '/services/ecommerce-solutions', label: 'E-commerce Solutions' },
]

const SOCIALS = [
  ['instagram', 'Instagram', Instagram],
  ['facebook', 'Facebook', Facebook],
  ['linkedin', 'LinkedIn', LinkedIn],
  ['youtube', 'YouTube', YouTube],
]

function Column({ title, children }) {
  return (
    <div>
      <h2 className="eyebrow text-white/40">{title}</h2>
      <div className="mt-6">{children}</div>
    </div>
  )
}

export default function Footer() {
  const settings = useSettings()
  const [copied, setCopied] = useState(false)
  const socials = SOCIALS.filter(([key]) => settings.socials?.[key])
  const [head, ...branches] = settings.offices || []

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(settings.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: the address is still a visible mailto link.
    }
  }

  return (
    <footer className="overflow-hidden bg-ink text-white">
      <div className="site-container pt-24 md:pt-32">
        <div className="flex flex-col gap-10 border-b border-white/15 pb-16 md:pb-24 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label text-white/50">Let’s Build Together</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={`mailto:${settings.email}`} className="display-md link-underline text-[1.9rem] break-all sm:text-6xl lg:text-7xl">
                {settings.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="rounded-full border border-white/25 px-4 py-2 text-sm text-white/75 transition-colors duration-500 hover:border-white hover:bg-white hover:text-ink"
              >
                <span aria-live="polite">{copied ? 'Copied' : 'Copy email address'}</span>
              </button>
            </div>
          </div>
          <Reveal y={20}>
            <Link
              to="/contact"
              className="group grid size-36 place-items-center rounded-full bg-violet text-center text-lg font-semibold transition-transform duration-700 ease-cinema hover:scale-105 sm:size-44"
            >
              <span className="flex flex-col items-center gap-2">
                Contact us
                <ArrowUpRight className="size-7 transition-transform duration-700 ease-cinema group-hover:rotate-45" />
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Column title="Explore">
              <a href={telHref(settings.phone)} className="link-underline block w-fit text-lg">
                {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} className="link-underline mt-1 block w-fit text-lg">
                {settings.email}
              </a>
              <dl className="mt-8 space-y-5 text-white/65">
                {head && (
                  <div>
                    <dt className="text-white">Head Office:</dt>
                    <dd>{head.address}</dd>
                  </div>
                )}
                {branches.map((b, i) => (
                  <div key={b.label}>
                    <dt className="text-white">Branch {i + 1}:</dt>
                    <dd>{b.address}</dd>
                  </div>
                ))}
              </dl>
            </Column>
          </div>
          <div className="lg:col-span-3">
            <Column title="Quick Links">
              <ul className="space-y-3">
                {QUICK_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="link-underline text-white/75 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          </div>
          <div className="lg:col-span-3">
            <Column title="Services">
              <ul className="space-y-3">
                {SERVICE_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="link-underline text-white/75 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          </div>
          <div className="lg:col-span-2">
            <Column title="Follow">
              <ul className="flex flex-wrap gap-2">
                {socials.map(([key, label, Icon]) => (
                  <li key={key}>
                    <a
                      href={settings.socials[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid size-11 place-items-center rounded-full border border-white/20 transition-colors duration-500 hover:border-white hover:bg-white hover:text-ink"
                    >
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
              {settings.whatsapp && (
                <a
                  href={whatsappHref(settings.whatsapp, settings.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-6 inline-flex items-center gap-2 text-white/75 hover:text-white"
                >
                  <WhatsApp className="size-4" /> WhatsApp us
                </a>
              )}
            </Column>
          </div>
        </div>
      </div>

      <div className="site-container">
        <Logo light className="h-auto w-full opacity-95" />
      </div>
      <div className="site-container flex flex-col gap-2 py-8 text-sm text-white/45 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} ideaxcorp Inc. All rights reserved.</p>
        <p>{settings.markets?.join(' · ')}</p>
      </div>
    </footer>
  )
}
