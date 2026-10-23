import CountUp from '../../components/motion/CountUp'
import { Reveal } from '../../components/Reveal'

/**
 * Figures taken only from published Ideaxcorp information:
 * the "Trusted by 20+" line, the listed markets, the services offered and the two offices.
 */
export default function Stats({ settings, serviceCount }) {
  const trusted = Number((settings.trustLine.match(/(\d+)\+/) || [])[1]) || null
  const stats = [
    trusted && { value: trusted, suffix: '+', label: 'Marketers, brands and entrepreneurs trust us' },
    { value: settings.markets.length, label: `Markets served — ${settings.markets.join(', ')}` },
    serviceCount && { value: serviceCount, label: 'Core services under one team' },
    { value: settings.offices.length, label: 'Offices — Dubai, UAE and Thrissur, Kerala' },
  ].filter(Boolean)

  return (
    <section className="relative overflow-hidden bg-violet py-24 text-white md:py-32" aria-label="Ideaxcorp in numbers">
      <div aria-hidden="true" className="animate-drift absolute -right-40 -top-40 size-[40rem] rounded-full bg-[#c065ff]/40 blur-[120px]" />
      <div className="site-container relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="border-t border-white/30 pt-6">
            <p className="display text-7xl leading-none md:text-8xl">
              <CountUp to={s.value} suffix={s.suffix} delay={0.15 + i * 0.18} />
            </p>
            <p className="mt-5 max-w-[16rem] text-white/80">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
