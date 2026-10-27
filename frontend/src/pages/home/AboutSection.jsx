import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Button from '../../components/Button'
import { EASE, Reveal } from '../../components/Reveal'
import { about } from '../../data/home'
import { paragraphs } from '../../utils/format'

/** Cycles through the headline's verbs, each rolling up out of a mask. */
function RotatingWord({ words }) {
  const [i, setI] = useState(0)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2400)
    return () => clearInterval(t)
  }, [reduced, words.length])
  return (
    <span className="relative inline-block overflow-hidden pb-[0.08em] align-bottom text-violet">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="inline-block"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function AboutSection({ settings }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const story = paragraphs(settings.aboutStory)

  return (
    <section ref={ref} aria-labelledby="about-title" className="py-24 md:py-36">
      <div className="site-container">
        <Reveal as="p" y={12} className="section-label text-graphite">
          {about.label}
        </Reveal>
        <h2 id="about-title" className="display-lg mt-8" aria-label={`${about.words.join(', ')} ${about.rest}`}>
          <span aria-hidden="true">
            <RotatingWord words={about.words} />
            <br />
            {about.rest}
          </span>
        </h2>

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-mist lg:col-span-7">
            <motion.img
              src="/images/team.webp"
              alt="The Ideaxcorp team"
              loading="lazy"
              style={{ y: imageY, scale: 1.08 }}
              className="size-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col justify-between gap-10 lg:col-span-5">
            <div className="space-y-6 text-lg leading-relaxed text-ink/80">
              {story.map((p, i) => (
                <Reveal as="p" key={i} delay={i * 0.06} y={20} className={i === 0 ? 'display-md text-2xl leading-snug text-ink md:text-[1.7rem]' : ''}>
                  {p}
                </Reveal>
              ))}
            </div>
            <Reveal>
              <Button to="/about" variant="outline">
                About Us
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
