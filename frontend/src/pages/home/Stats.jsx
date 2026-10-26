import { useEffect, useMemo, useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import CountUp from '../../components/motion/CountUp'
import { Reveal } from '../../components/Reveal'

const POINTS = 900

/**
 * A slowly turning globe of dots with the agency's markets and services floating on its surface.
 * Drawn on a canvas; labels brighten and grow as they rotate toward the viewer.
 */
function Globe({ labels }) {
  const canvas = useRef(null)
  const wrap = useRef(null)
  const inView = useInView(wrap)
  const reduced = useReducedMotion()
  // Read through a ref so toggling visibility pauses the spin without restarting the loop.
  const spinning = useRef(false)
  spinning.current = inView && !reduced

  useEffect(() => {
    const el = canvas.current
    const ctx = el.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let size = 0
    const resize = () => {
      size = el.clientWidth
      el.width = size * dpr
      el.height = size * dpr
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    // Fibonacci sphere for the dots; labels spread on their own spiral so they never bunch up.
    const golden = Math.PI * (3 - Math.sqrt(5))
    const spiral = (i, n) => {
      const y = 1 - (i / (n - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      return [Math.cos(golden * i) * r, y, Math.sin(golden * i) * r]
    }
    const dots = Array.from({ length: POINTS }, (_, i) => spiral(i, POINTS))
    const tags = labels.map((text, i) => ({ text, p: spiral(i * 1.7 + 1, labels.length * 1.7 + 2) }))

    let angle = 0.4
    let raf
    let last = performance.now()
    let drawnAt = -1 // size at the last paint, so a still globe repaints only after a resize
    const draw = (now) => {
      const dt = now - last
      last = now
      if (!spinning.current && drawnAt === size) {
        raf = requestAnimationFrame(draw)
        return
      }
      drawnAt = size
      if (spinning.current) angle += dt * 0.00012
      const R = size * 0.42
      const c = size / 2
      const [ca, sa] = [Math.cos(angle), Math.sin(angle)]
      const tilt = 0.35
      const [ct, st] = [Math.cos(tilt), Math.sin(tilt)]
      const project = ([x, y, z]) => {
        const x1 = x * ca + z * sa
        const z1 = -x * sa + z * ca
        const y1 = y * ct - z1 * st
        const z2 = y * st + z1 * ct
        return [c + x1 * R, c + y1 * R, z2]
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, size, size)
      for (const d of dots) {
        const [x, y, z] = project(d)
        const near = (z + 1) / 2
        ctx.fillStyle = `rgba(255,255,255,${0.08 + near * 0.5})`
        ctx.fillRect(x, y, 0.6 + near * 1.1, 0.6 + near * 1.1)
      }
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      for (const t of tags) {
        const [x, y, z] = project(t.p)
        const near = (z + 1) / 2
        const label = t.text.toUpperCase()
        ctx.font = `600 ${Math.round(size * (0.019 + near * 0.012))}px "Hubot Sans", system-ui, sans-serif`
        ctx.fillStyle = near > 0.55 ? `rgba(255,255,255,${0.25 + near * 0.75})` : `rgba(255,255,255,${0.08 + near * 0.3})`
        // keep long labels on the canvas rather than clipped at its edge
        const half = ctx.measureText(label).width / 2 + 4
        ctx.fillText(label, Math.min(Math.max(x, half), size - half), y)
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [labels])

  return (
    <div ref={wrap} className="relative mx-auto aspect-square w-full max-w-[34rem]">
      <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-violet/25 blur-[90px]" />
      <canvas ref={canvas} className="relative size-full" aria-hidden="true" />
    </div>
  )
}

/**
 * Figures taken only from published Ideaxcorp information:
 * the "Trusted by 20+" line, the listed markets, the services offered and the two offices.
 */
export default function Stats({ settings, serviceCount, serviceTitles = [] }) {
  const trusted = Number((settings.trustLine.match(/(\d+)\+/) || [])[1]) || null
  const stats = [
    trusted && { value: trusted, suffix: '+', label: 'Marketers, brands and entrepreneurs trust us' },
    { value: settings.markets.length, label: `Markets served — ${settings.markets.join(', ')}` },
    serviceCount && { value: serviceCount, label: 'Core services under one team' },
    { value: settings.offices.length, label: 'Offices — Dubai, UAE and Thrissur, Kerala' },
  ].filter(Boolean)

  const labelKey = [...settings.markets, ...serviceTitles].join('|')
  const labels = useMemo(() => labelKey.split('|').filter(Boolean), [labelKey])

  // "Trusted by 20+" leads in white; the rest of the line steps back in grey.
  const split = settings.trustLine.match(/^(.*?\d+\+)(.*)$/)

  return (
    <section className="relative overflow-hidden bg-black py-24 text-white md:py-36" aria-label="Ideaxcorp in numbers">
      <div className="site-container grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <Reveal y={20} className="lg:col-span-6">
          <Globe labels={labels} />
        </Reveal>

        <div className="lg:col-span-6">
          <Reveal as="p" y={12} className="kicker border-b border-white/15 pb-6 text-white/55">
            Ideaxcorp in numbers
          </Reveal>
          <Reveal as="h2" delay={0.1} className="display mt-10 text-balance text-[2.4rem] leading-[1.05] sm:text-6xl">
            {split ? (
              <>
                {split[1]}
                <span className="text-white/45">{split[2]}</span>
              </>
            ) : (
              settings.trustLine
            )}
          </Reveal>

          <dl className="mt-14 grid grid-cols-2 border-t border-white/15">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={0.1 + i * 0.08}
                className={`flex flex-col-reverse border-b border-white/15 py-8 ${i % 2 === 0 ? 'pr-5' : 'pl-5 sm:pl-8'}`}
              >
                <dt className="mt-4 max-w-[15rem] text-sm text-white/55 sm:text-base">{s.label}</dt>
                <dd className="display text-6xl leading-none sm:text-7xl">
                  <CountUp to={s.value} suffix={s.suffix} delay={0.15 + i * 0.15} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
