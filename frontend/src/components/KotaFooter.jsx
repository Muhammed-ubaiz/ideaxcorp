import { useState } from 'react'
import { Link } from 'react-router'
import KotaLogo from './KotaLogo'
import { footerData } from '../data/kotaData'

export default function KotaFooter() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(footerData.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer data-theme="dark" className="bg-black text-white pt-20 pb-12 sm:pt-28 sm:pb-16 border-t border-white/10">
      <div className="site-container">
        {/* Top: Large Email Link & Copy action */}
        <div className="pb-16 sm:pb-24 border-b border-white/15 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-white/40 block mb-3 font-semibold">
              Get in touch
            </span>
            <a
              href={`mailto:${footerData.email}`}
              className="font-syne text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white hover:text-white/80 transition-colors"
            >
              {footerData.email}
            </a>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="w-fit inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/25 text-sm font-medium text-white/80 hover:border-white hover:text-white hover:bg-white/10 transition-all"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span>{copied ? 'Copied to clipboard!' : 'Copy email address'}</span>
          </button>
        </div>

        {/* Middle Columns: Offices, Navigation, Sectors, Socials */}
        <div className="py-16 sm:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-14 border-b border-white/15">
          {/* Col 1: Offices */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-6">
              Our Offices
            </h4>
            <div className="space-y-6 text-sm text-white/70">
              {footerData.offices.map((office) => (
                <div key={office.city}>
                  <p className="font-semibold text-white text-base mb-1">{office.city}</p>
                  <p className="leading-relaxed mb-1">{office.address}</p>
                  <a
                    href={`tel:${office.phone.replace(/[^+\d]/g, '')}`}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    {office.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-6">
              Menu
            </h4>
            <ul className="space-y-3 text-base text-white/75">
              {footerData.navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block transform"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Sectors */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-6">
              Our Sectors
            </h4>
            <ul className="space-y-3 text-base text-white/75">
              {footerData.sectors.map((sec) => (
                <li key={sec} className="text-white/60">
                  {sec}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Socials & Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-6">
              Follow Us
            </h4>
            <ul className="space-y-3 text-base text-white/75 mb-8">
              {footerData.socials.map((soc) => (
                <li key={soc.name}>
                  <a
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block transform"
                  >
                    {soc.name}
                  </a>
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4 hover:text-white/70 transition-colors"
            >
              <span>Sign up to our newsletter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17.1 15.17"
                className="w-3 h-3"
                fill="currentColor"
              >
                <path d="m17.1,7.58s-.01-.04-.01-.06c.01-.22-.06-.45-.24-.61L9.23.19c-.31-.27-.78-.24-1.06.07-.27.31-.24.78.07,1.06l6.26,5.52H.75c-.41,0-.75.34-.75.75s.34.75.75.75h13.74l-6.26,5.52c-.31.27-.34.75-.07,1.06.15.17.35.25.56.25.18,0,.35-.06.5-.19l7.62-6.72c.18-.16.25-.39.24-.61,0-.02.01-.04.01-.06Z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Brand */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-white/40">
          <div className="flex items-center gap-4">
            <KotaLogo className="h-7 w-7" light={true} />
            <p>{footerData.copyright}</p>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link to="/faq" className="hover:text-white transition-colors">
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
