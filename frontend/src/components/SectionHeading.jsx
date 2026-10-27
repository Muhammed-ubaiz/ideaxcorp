import { Reveal, RevealLines } from './Reveal'

/**
 * Section label + masked display title + optional description, with an optional action on the right.
 * `title` may be a string or an array of lines.
 */
export default function SectionHeading({ eyebrow, title, description, action, dark = false, align = 'left', size = 'lg', className = '' }) {
  const lines = Array.isArray(title) ? title : [title]
  const titleSize = size === 'lg' ? 'display-lg' : 'display text-[2.4rem] sm:text-6xl lg:text-[4.5rem]'
  return (
    <div className={`flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between ${align === 'center' ? 'items-center text-center lg:flex-col lg:items-center' : ''} ${className}`}>
      <div className={align === 'center' ? 'max-w-4xl' : 'max-w-5xl'}>
        {eyebrow && (
          <Reveal as="p" y={12} className={`section-label mb-8 ${align === 'center' ? 'justify-center' : ''} ${dark ? 'text-white/55' : 'text-graphite'}`}>
            {eyebrow}
          </Reveal>
        )}
        <RevealLines lines={lines} className={`text-balance ${titleSize} ${dark ? 'text-white' : 'text-ink'}`} />
        {description && (
          <Reveal as="p" delay={0.15} className={`mt-8 max-w-2xl text-pretty ${align === 'center' ? 'mx-auto' : ''} ${dark ? 'text-lg leading-relaxed text-white/65 md:text-xl' : 'lead'}`}>
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
