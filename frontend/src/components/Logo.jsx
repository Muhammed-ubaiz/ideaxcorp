import { Link } from 'react-router'

/** Official Ideaxcorp logo. `light` is the white-text version for dark backgrounds. */
export default function Logo({ light = false, className = 'h-10 w-auto', onClick }) {
  return (
    <Link to="/" aria-label="Ideaxcorp home" onClick={onClick} className="inline-flex shrink-0">
      <img
        src={light ? '/images/logo-light.webp' : '/images/logo-dark.webp'}
        alt="Ideaxcorp"
        width="798"
        height="374"
        className={className}
      />
    </Link>
  )
}
