import { Reveal, RevealLines } from './Reveal'

/**
 * Eyebrow + masked display title + optional description, with an optional action on the right.
 * `title` may be a string or an array of lines.
 */
export default function SectionHeading({ eyebrow, title, description, action, dark = false, align = 'left', size = 'lg', className = '' }) {
  const lines = Array.isArray(title) ? title : [title]
  const titleSize = size === 'lg' ? 'text-[2.6rem] sm:text-6xl lg:text-[5.25rem]' : 'text-[2.2rem] sm:text-5xl lg:text-6xl'
  return (
    <div className={`flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between ${align === 'center' ? 'items-center text-center lg:flex-col lg:items-center' : ''} ${className}`}>
      <div className={align === 'center' ? 'max-w-4xl' : 'max-w-5xl'}>
        {eyebrow && (
          <Reveal as="p" y={12} className={`eyebrow mb-6 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} ${dark ? 'text-white/60' : 'text-graphite'}`}>
            <span className="inline-block size-1.5 rounded-full bg-violet" aria-hidden="true" />
            {eyebrow}
          </Reveal>
        )}
        <RevealLines lines={lines} className={`display text-balance ${titleSize} ${dark ? 'text-white' : 'text-ink'}`} />
        {description && (
          <Reveal as="p" delay={0.15} className={`mt-7 max-w-2xl text-pretty ${align === 'center' ? 'mx-auto' : ''} ${dark ? 'text-lg leading-relaxed text-white/65' : 'lead'}`}>
            {description}
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal delay={0.2} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  )
}
