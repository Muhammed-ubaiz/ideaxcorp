import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from '../../components/Icons'
import { EASE, Reveal, RevealLines } from '../../components/Reveal'
import { useRichMotion } from '../../hooks/useMedia'
import { paragraphs } from '../../utils/format'

// This section is deliberately neutral (no brand violet): off-white, stone, black and true greys.
const VIEW = { once: true, margin: '0px 0px -12% 0px' }

// Background-free versions of bundled portraits (the originals were shot on black).
const CUTOUTS = {
  '/images/founder-jaseel.webp': { src: '/images/founder-jaseel-cutout.webp', width: 348, height: 660 },
}

/** Hairline arch that drifts slightly against the portrait on desktop for depth. */
function Outline({ rich }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], rich ? [14, -14] : [0, 0])
  return (
    <motion.div ref={ref} aria-hidden="true" className="absolute -inset-x-3.5 top-[11%] -bottom-3.5" style={{ y }}>
      <motion.div
        className="size-full rounded-t-full rounded-b-[2.25rem] border border-neutral-300"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEW}
        transition={{ duration: 1.6, ease: EASE, delay: 0.35 }}
      />
    </motion.div>
  )
}

/**
 * Founder portrait on a light arch. With a cutout, the figure stands in the arch and rises past its top;
 * otherwise the photo fills the arch. The arch opens upward, then the figure rises into place.
 */
function Portrait({ src, name, role }) {
  const reduced = useReducedMotion()
  const rich = useRichMotion()
  const cutout = CUTOUTS[src]
  const alt = `${name}, ${role} of Ideaxcorp`

  return (
    <figure className="relative mx-auto w-full max-w-[19rem] sm:max-w-[22rem] lg:mx-0 lg:max-w-md">
      <div className="relative aspect-[4/5]">
        <Outline rich={rich} />

        {/* arch: soft stone gradient with a light bloom behind the head */}
        <motion.div
          className="absolute inset-x-0 top-[14%] bottom-0 overflow-hidden rounded-t-full rounded-b-[1.75rem] bg-[linear-gradient(172deg,#efeeea_0%,#dedcd6_55%,#cdcac2_100%)]"
          initial={reduced ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={VIEW}
          transition={{ duration: 1.3, ease: EASE }}
        >
          <div aria-hidden="true" className="absolute left-1/2 top-[6%] size-[85%] -translate-x-1/2 rounded-full bg-white/80 blur-3xl" />
          {!cutout && <img src={src} alt={alt} loading="lazy" className="absolute inset-0 size-full object-cover object-top" />}
        </motion.div>

        {cutout && (
          // clipped at the arch's base only, so the head can rise past the top while the shadow stops at the floor
          <div className="absolute -inset-x-[15%] -top-[10%] bottom-0 overflow-hidden">
            <motion.img
              src={cutout.src}
              alt={alt}
              width={cutout.width}
              height={cutout.height}
              loading="lazy"
              className="absolute bottom-0 left-1/2 h-[calc(100%/1.1)] w-auto max-w-none -translate-x-1/2 drop-shadow-[0_18px_28px_rgba(28,25,20,0.18)]"
              initial={reduced ? false : { opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEW}
              transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
            />
          </div>
        )}
      </div>

      <motion.figcaption
        className="absolute bottom-8 left-3 rounded-md bg-white/95 px-5 py-3.5 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.3)] ring-1 ring-neutral-200 backdrop-blur sm:-left-5 lg:-left-8"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEW}
        transition={{ duration: 1, ease: EASE, delay: 1 }}
      >
        <span className="block font-semibold text-neutral-950">{name}</span>
        <span className="block text-sm text-neutral-500">{role}</span>
      </motion.figcaption>
    </figure>
  )
}

export default function AboutFounder({ settings }) {
  const note = paragraphs(settings.founderNote)
  return (
    <section className="relative overflow-hidden bg-[#f6f6f4] py-24 text-neutral-950 md:py-36" aria-label="Founder’s note">
      {/* oversized neutral quote mark for editorial texture */}
      <span aria-hidden="true" className="display pointer-events-none absolute -top-10 right-[4%] select-none text-[18rem] leading-none text-neutral-200 md:text-[26rem]">
        “
      </span>

      <div className="site-container relative grid items-start gap-16 sm:gap-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:pt-4">
          {settings.founderImage && <Portrait src={settings.founderImage} name={settings.founderName} role={settings.founderRole} />}
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal as="p" y={12} className="eyebrow mb-8 flex items-center gap-3 text-neutral-500">
            <motion.span
              aria-hidden="true"
              className="inline-block h-px w-10 origin-left bg-neutral-900"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEW}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            />
            Founder’s note
          </Reveal>
          <RevealLines lines={['Marketing guided', 'by insight and real data,', 'not guesswork.']} className="display text-[2.3rem] sm:text-5xl lg:text-[3.6rem] xl:text-[3.9rem]" />
          <div className="mt-12 max-w-xl space-y-6 text-lg leading-relaxed text-neutral-600 text-pretty">
            {note.map((p, i) => (
              <Reveal
                as="p"
                key={i}
                delay={0.1 + i * 0.1}
                y={22}
                className={i === 0 ? 'border-l-2 border-neutral-900 pl-5 text-xl leading-relaxed text-neutral-900 sm:text-[1.35rem]' : ''}
              >
                {p}
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 flex flex-wrap items-end justify-between gap-8 border-t border-neutral-300 pt-8" y={14} delay={0.2}>
            <div>
              <p className="display text-4xl sm:text-5xl">{settings.founderName}</p>
              <p className="mt-2 text-neutral-500">{settings.founderRole}, Ideaxcorp</p>
            </div>
            <Link to="/about" className="group inline-flex items-center gap-4 font-semibold text-neutral-950">
              <span className="link-underline">More about Ideaxcorp</span>
              <span className="grid size-10 place-items-center rounded-[4px] bg-neutral-950 text-white transition-colors duration-500 group-hover:bg-neutral-700">
                <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
