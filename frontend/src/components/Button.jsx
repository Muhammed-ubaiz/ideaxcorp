import { Link } from 'react-router'
import { ArrowRight } from './Icons'

const VARIANTS = {
  // solid ink pill: the default call to action on light backgrounds
  primary: 'bg-ink text-white hover:bg-violet',
  violet: 'bg-violet text-white hover:bg-violet-deep',
  light: 'bg-white text-ink hover:bg-lilac',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-white',
  'outline-light': 'border border-white/70 text-white hover:border-white hover:bg-white hover:text-ink',
}

/**
 * Rounded pill button. Renders a router Link (`to`), an anchor (`href`) or a button.
 * The trailing arrow nudges forward on hover; set `arrow={false}` for a plain text button.
 */
export default function Button({ to, href, variant = 'primary', arrow = true, size = 'md', className = '', children, ...props }) {
  const h = size === 'sm' ? 'h-10 px-5 text-sm' : 'h-14 px-8 text-base'
  const cls = `group inline-flex items-center justify-center gap-3 rounded-full font-semibold tracking-tight transition-colors duration-500 ease-cinema disabled:pointer-events-none disabled:opacity-50 ${h} ${VARIANTS[variant]} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className={`${size === 'sm' ? 'size-4' : 'size-5'} transition-transform duration-500 ease-cinema group-hover:translate-x-1`}
        />
      )}
    </>
  )
  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {content}
      </Link>
    )
  }
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
        {content}
      </a>
    )
  }
  return (
    <button className={cls} {...props}>
      {content}
    </button>
  )
}
