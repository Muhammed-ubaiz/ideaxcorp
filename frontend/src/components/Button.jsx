import { Link } from 'react-router'
import ArrowTile from './ArrowTile'

const VARIANTS = {
  // dark button + violet tile: the default call to action on light backgrounds
  primary: { box: 'bg-ink text-white hover:bg-ink-2', tile: 'violet' },
  violet: { box: 'bg-violet text-white hover:bg-violet-deep', tile: 'ink' },
  light: { box: 'bg-white text-ink hover:bg-lilac', tile: 'violet' },
  outline: { box: 'border border-ink/15 text-ink hover:border-ink', tile: 'ink' },
  'outline-light': { box: 'border border-white/25 text-white hover:border-white', tile: 'white' },
}

/**
 * Renders a router Link (`to`), an anchor (`href`) or a button.
 * Set `arrow={false}` for a plain text button.
 */
export default function Button({ to, href, variant = 'primary', arrow = true, size = 'md', className = '', children, ...props }) {
  const v = VARIANTS[variant]
  const pad = arrow ? (size === 'sm' ? 'pl-4 pr-1' : 'pl-6 pr-1.5') : size === 'sm' ? 'px-4' : 'px-6'
  const h = size === 'sm' ? 'h-10 text-sm' : 'h-[3.25rem] text-[0.95rem]'
  const cls = `group inline-flex items-center justify-between gap-4 rounded-md font-semibold tracking-tight transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50 ${h} ${pad} ${v.box} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowTile size={size === 'sm' ? 'sm' : 'md'} tone={v.tile} />}
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
