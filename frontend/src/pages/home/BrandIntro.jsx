import ScrollWords from '../../components/motion/ScrollWords'
import Button from '../../components/Button'
import { Reveal } from '../../components/Reveal'
import { paragraphs } from '../../utils/format'

/** Centred manifesto: an oversized statement that lights up word by word, short copy and one action. */
export default function BrandIntro({ settings }) {
  const story = paragraphs(settings.aboutStory)
  const facts = [
    ['Offices', 'Dubai · Thrissur'],
    ['Markets', settings.markets.join(' · ')],
    ['Approach', 'Data-focused'],
  ]

  return (
    <section id="intro" className="relative overflow-hidden bg-white py-28 text-ink md:py-44">
      <div className="site-container flex flex-col items-center text-center">
        <Reveal as="p" y={12} className="kicker mb-10 flex items-center gap-3 text-graphite">
          <span className="inline-block size-1.5 rounded-full bg-violet" aria-hidden="true" />
          Ideaxcorp · {settings.tagline.replace(/\.$/, '')}
        </Reveal>

        <ScrollWords
          as="h2"
          text="Good ideas deserve extraordinary execution."
          highlight={['ideas', 'extraordinary']}
          className="display max-w-6xl text-balance text-[2.8rem] leading-[1] sm:text-7xl lg:text-[7rem]"
        />

        <Reveal as="p" className="display-md mt-16 max-w-3xl text-pretty text-[1.45rem] leading-snug md:mt-20 md:text-[2rem]">
          {settings.introText}
        </Reveal>
        <Reveal as="p" delay={0.12} className="lead mt-6 max-w-2xl">
          {story[0]}
        </Reveal>
        <Reveal delay={0.2} className="mt-12">
          <Button to="/about" variant="outline">
            Discover our story
          </Button>
        </Reveal>

        <Reveal delay={0.1} className="mt-20 w-full md:mt-28">
          <dl className="grid divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {facts.map(([k, v]) => (
              <div key={k} className="py-6 sm:px-6">
                <dt className="kicker text-[0.72rem] text-smoke">{k}</dt>
                <dd className="mt-2 text-lg font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
