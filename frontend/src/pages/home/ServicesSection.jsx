import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import Button from '../../components/Button'
import { ArrowRight } from '../../components/Icons'
import { EASE, Reveal, RevealLines } from '../../components/Reveal'
import { useRichMotion } from '../../hooks/useMedia'
import { services as copy } from '../../data/home'

const pad = (n) => String(n).padStart(2, '0')

/**
 * Numbered service index. Each row is a link to its service page; on desktop, hovering a row
 * floats that service's image beside the pointer.
 */
export default function ServicesSection({ services }) {
  const listRef = useRef(null)
  const rich = useRichMotion()
  const [active, setActive] = useState(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 26 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 26 })

  const track = (e) => {
    const box = listRef.current?.getBoundingClientRect()
    if (!box) return
    x.set(e.clientX - box.left)
    y.set(e.clientY - box.top)
  }
  const preview = rich && active !== null ? services[active] : null

  return (
    <section aria-labelledby="services-title" className="border-t border-ink/15 py-24 md:py-36">
      <div className="site-container">
        <Reveal as="p" y={12} className="section-label text-graphite">
          {copy.label}
        </Reveal>
        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <RevealLines id="services-title" lines={copy.lines} className="display-lg" />
            <Reveal as="p" delay={0.1} className="display-md mt-5 text-2xl text-graphite sm:text-3xl">
              {copy.sub}
            </Reveal>
          </div>
          <Reveal delay={0.2} className="shrink-0">
            <Button to="/contact">{copy.cta}</Button>
          </Reveal>
        </div>

        <ul ref={listRef} className="relative mt-20 border-t border-ink" onPointerMove={track} onPointerLeave={() => setActive(null)}>
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} y={24} className="border-b border-ink/20" onPointerEnter={() => setActive(i)}>
              <Link to={`/services/${s.slug}`} className="group grid gap-5 py-9 md:grid-cols-12 md:items-center md:gap-8 md:py-11">
                <span className="text-sm font-semibold tabular-nums text-violet md:col-span-1">{pad(i + 1)}</span>
                <h3 className="display text-balance text-[2.1rem] leading-[1] transition-[translate,color] duration-700 ease-cinema group-hover:translate-x-3 group-hover:text-violet sm:text-5xl md:col-span-6 lg:text-[3.6rem]">
                  {copy.cardTitles[s.slug] || s.title}
                </h3>
                <div className="md:col-span-5">
                  <p className="max-w-md text-pretty leading-relaxed text-graphite">{s.shortDescription}</p>
                  <span className="mt-5 inline-flex items-center gap-2.5 text-sm font-semibold">
                    <span className="link-underline">{copy.more}</span>
                    <ArrowRight className="size-4 transition-transform duration-500 ease-cinema group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}

          <AnimatePresence>
            {preview?.image && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 z-10 hidden w-72 overflow-hidden rounded-2xl shadow-2xl lg:block"
                style={{ x, y, translateX: '-50%', translateY: '-50%' }}
                initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <img key={preview.image} src={preview.image} alt="" className="aspect-[4/3] w-full object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  )
}
