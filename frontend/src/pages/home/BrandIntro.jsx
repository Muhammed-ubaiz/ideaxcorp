import { Link } from 'react-router'
import { motion } from 'motion/react'
import ScrollWords from '../../components/motion/ScrollWords'
import ArrowTile from '../../components/ArrowTile'
import { EASE, Reveal } from '../../components/Reveal'
import { paragraphs } from '../../utils/format'

const VIEW = { once: true, margin: '0px 0px -15% 0px' }

export default function BrandIntro({ settings }) {
  const story = paragraphs(settings.aboutStory)
  return (
    <section id="intro" className="relative overflow-hidden bg-paper py-28 md:py-44">
      {/* thin geometry: a drawn rule and a square echoing the mark */}
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-full origin-left bg-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEW}
        transition={{ duration: 1.8, ease: EASE }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute right-[6%] top-24 hidden size-24 border border-violet/40 lg:block"
        initial={{ rotate: -45, opacity: 0 }}
        whileInView={{ rotate: 12, opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: 2, ease: EASE }}
      />

      <div className="site-container">
        <Reveal as="p" y={12} className="eyebrow mb-10 flex items-center gap-3 text-graphite">
          <span className="inline-block size-2 bg-violet" aria-hidden="true" />
          Ideaxcorp · {settings.tagline.replace(/\.$/, '')}
        </Reveal>

        <ScrollWords
          as="h2"
          text="Good ideas deserve extraordinary execution."
          highlight={['ideas', 'extraordinary']}
          className="display max-w-6xl text-[2.7rem] leading-[0.95] sm:text-7xl lg:text-[7.25rem]"
        />

        <div className="mt-20 grid gap-12 md:mt-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <dl className="divide-y divide-line border-y border-line">
              <div className="flex justify-between gap-6 py-4">
                <dt className="eyebrow text-graphite">Offices</dt>
                <dd className="text-right font-medium">Dubai · Thrissur</dd>
              </div>
              <div className="flex justify-between gap-6 py-4">
                <dt className="eyebrow text-graphite">Markets</dt>
                <dd className="text-right font-medium">{settings.markets.join(' · ')}</dd>
              </div>
              <div className="flex justify-between gap-6 py-4">
                <dt className="eyebrow text-graphite">Approach</dt>
                <dd className="text-right font-medium">Data-focused</dd>
              </div>
            </dl>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal as="p" className="text-pretty text-2xl leading-snug text-ink md:text-[1.85rem]">
              {settings.introText}
            </Reveal>
            <Reveal as="p" delay={0.12} className="lead mt-6">
              {story[0]}
            </Reveal>
            <Reveal delay={0.2} className="mt-10">
              <Link to="/about" className="group inline-flex items-center gap-4 text-lg font-semibold">
                <span className="link-underline">Discover our story</span>
                <ArrowTile tone="ink" className="transition-colors duration-500 group-hover:bg-violet" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
