import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Play } from '../../components/Icons'
import { Reveal, RevealLines } from '../../components/Reveal'
import { showreel } from '../../data/home'
import ShowreelModal from './ShowreelModal'

/** Video block: the frame grows to the full container as it scrolls in; pressing play opens the film. */
export default function ShowreelSection({ url }) {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.84, 1])

  return (
    <section ref={ref} aria-labelledby="showreel-title" className="bg-ink pb-24 text-white md:pb-36">
      <div className="site-container">
        <div className="grid gap-10 border-t border-white/15 pt-24 md:pt-36 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal as="p" y={12} className="display-md text-5xl text-violet sm:text-6xl">
              {showreel.rating}
            </Reveal>
            <RevealLines id="showreel-title" lines={[showreel.title]} className="display-lg mt-6 text-balance" />
          </div>
          <Reveal as="p" delay={0.15} className="text-lg leading-relaxed text-white/65 lg:col-span-4">
            {showreel.intro}
          </Reveal>
        </div>

        <motion.div style={{ scale }} className="relative mt-16 aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-ink-2 sm:aspect-[16/9]">
          <img src="/images/glow-banner.webp" alt="" loading="lazy" className="size-full object-cover opacity-80" />
          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
            <figure className="max-w-xl">
              <blockquote className="display-md text-2xl leading-snug sm:text-4xl">{showreel.quote}</blockquote>
              <figcaption className="mt-4 text-white/70">{showreel.cite}</figcaption>
            </figure>
            {url && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Play the Ideaxcorp video"
                className="group grid size-24 place-items-center self-end rounded-full bg-white text-ink transition-transform duration-700 ease-cinema hover:scale-110 sm:size-32"
              >
                <Play className="size-8 translate-x-0.5 sm:size-10" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
      <ShowreelModal url={url} open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
