/** Infinite horizontal drift. Children are rendered twice so the loop is seamless. */
export default function Marquee({ children, duration = 60, className = '' }) {
  return (
    <div className={`pause-on-hover relative overflow-hidden ${className}`}>
      <div className="animate-marquee flex w-max" style={{ '--marquee-duration': `${duration}s` }}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
