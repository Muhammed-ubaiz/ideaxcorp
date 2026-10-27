import { Link } from 'react-router'
import ProjectPreview from '../../components/ProjectPreview'
import { ArrowRight } from '../../components/Icons'
import { Reveal, RevealLines } from '../../components/Reveal'
import { work } from '../../data/home'

/**
 * Selected work: three projects in an asymmetric editorial grid, one tall lead project beside two
 * supporting ones. Featured projects with images come first; the full set lives on /portfolio.
 */
export default function WorkSection({ projects, settings, onOpen }) {
  const withImages = projects.filter((p) => p.image)
  const picks = [...withImages.filter((p) => p.featured), ...withImages.filter((p) => !p.featured)].slice(0, 3)
  const [lead, ...rest] = picks

  return (
    <section aria-labelledby="work-title" className="bg-ink py-20 text-white md:py-28">
      <div className="site-container">
        <div className="grid gap-8 border-b border-white/15 pb-10 lg:grid-cols-12 lg:items-end lg:pb-14">
          <div className="lg:col-span-7">
            <Reveal as="p" y={12} className="section-label text-white/55">
              {work.eyebrow}
            </Reveal>
            <RevealLines id="work-title" lines={[work.label]} className="display-lg mt-6" />
          </div>
          <div className="lg:col-span-5">
            <Reveal as="p" delay={0.1} className="leading-relaxed text-white/65">
              {work.intro}
            </Reveal>
            <Reveal as="p" delay={0.18} className="mt-5 text-xs tracking-[0.2em] text-white/40 uppercase">
              {work.categories.join(' / ')}
            </Reveal>
          </div>
        </div>

        {lead && (
          <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <ProjectPreview project={lead} index={0} featured onOpen={onOpen} />
            </div>
            <div className="flex flex-col gap-12 lg:col-span-6 lg:gap-10 lg:pt-24">
              {rest.map((p, i) => (
                <div key={p.id} className={i > 0 ? 'border-t border-white/15 pt-12 lg:pt-10' : ''}>
                  <ProjectPreview project={p} index={i + 1} onOpen={onOpen} delay={0.12 * (i + 1)} />
                </div>
              ))}
            </div>
          </div>
        )}

        <Reveal className="mt-16 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/portfolio" className="group inline-flex items-center gap-4 self-start">
            <span className="display-md link-underline text-2xl sm:text-3xl">{work.all}</span>
            <span className="grid size-11 place-items-center border border-white/25 transition-colors duration-500 group-hover:border-violet group-hover:bg-violet">
              <ArrowRight className="size-4 transition-transform duration-500 ease-cinema group-hover:translate-x-1" />
            </span>
          </Link>
          {settings.portfolioDriveUrl && (
            <a href={settings.portfolioDriveUrl} target="_blank" rel="noopener noreferrer" className="link-underline self-start text-sm text-white/60 hover:text-white sm:self-auto">
              {work.cta}
            </a>
          )}
        </Reveal>
      </div>
    </section>
  )
}
