import { ArrowUpRight } from './Icons'

const SIZES = {
  sm: 'size-8 [&_svg]:size-4',
  md: 'size-10 [&_svg]:size-5',
  lg: 'size-14 [&_svg]:size-7',
}
const TONES = {
  violet: 'bg-violet text-white',
  ink: 'bg-ink text-white',
  white: 'bg-white text-violet',
}

/**
 * The square-and-arrow from the Ideaxcorp mark. Inside any `group`, hovering sends the arrow
 * out through the top-right corner while a fresh one rises in from the bottom-left.
 */
export default function ArrowTile({ size = 'md', tone = 'violet', className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-grid shrink-0 place-items-center overflow-hidden rounded-[4px] ${SIZES[size]} ${TONES[tone]} ${className}`}
    >
      <span className="col-start-1 row-start-1 transition-transform duration-500 ease-cinema group-hover:translate-x-[160%] group-hover:-translate-y-[160%]">
        <ArrowUpRight />
      </span>
      <span className="col-start-1 row-start-1 -translate-x-[160%] translate-y-[160%] transition-transform duration-500 ease-cinema group-hover:translate-x-0 group-hover:translate-y-0">
        <ArrowUpRight />
      </span>
    </span>
  )
}
