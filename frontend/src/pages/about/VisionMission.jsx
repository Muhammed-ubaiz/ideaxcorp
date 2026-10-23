import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useInView, useReducedMotion } from 'motion/react'
import { EASE } from '../../components/Reveal'

/**
 * Vision & Mission as a dark bento deck: two glass cards with beam borders and a cursor
 * spotlight, a spinning wireframe polyhedron tile, and a grid backdrop that lights up under the cursor.
 */
export default function VisionMission({ vision, mission }) {
  const still = useReducedMotion()

  // The cursor position drives both the grid highlight and the card spotlights, via CSS variables
  // (no React re-render per mouse move).
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section
      aria-label="Vision and mission"
      onPointerMove={onMove}
      className="relative isolate overflow-hidden bg-[#0a0a12] py-24 text-white [--mx:50%] [--my:30%] md:py-36"
    >
      <Backdrop still={still} />

      <div className="site-container grid gap-5 lg:grid-cols-12 lg:grid-rows-2">
        {vision && (
          <BentoCard className="lg:col-span-7" from={{ x: -90 }} delay={0}>
            <CardBody index="01" label="Vision" text={vision} still={still} />
          </BentoCard>
        )}

        <BentoCard className="min-h-80 lg:col-span-5 lg:row-span-2" from={{ scale: 0.85 }} delay={0.15}>
          <OrbTile still={still} />
        </BentoCard>

        {mission && (
          <BentoCard className="lg:col-span-7" from={{ x: -90 }} delay={0.3}>
            <CardBody index="02" label="Mission" text={mission} still={still} />
          </BentoCard>
        )}
      </div>
    </section>
  )
}

/* ── Card shell ─────────────────────────────────────────────────────────── */

/**
 * Glass card with a rotating conic "border beam", a spotlight that follows the cursor,
 * and a lift toward the viewer on hover. Enters from `from` when scrolled into view.
 */
function BentoCard({ className = '', from, delay, children }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--cx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--cy', `${e.clientY - r.top}px`)
  }

  return (
    <motion.div
      className={`[perspective:1200px] ${className}`}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <div
        onPointerMove={onMove}
        className="group relative h-full overflow-hidden rounded-2xl p-px transition-[transform,box-shadow] duration-500 ease-cinema [--cx:50%] [--cy:50%] hover:[transform:translateZ(36px)_translateY(-4px)] hover:shadow-[0_30px_90px_-25px_rgba(151,0,255,0.55)]"
      >
        {/* Border beam: an oversized conic gradient spinning behind the 1px gap. */}
        <div
          className="absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,#9700ff_40deg,#22d3ee_80deg,transparent_120deg,transparent_360deg)] opacity-60 transition-opacity duration-500 group-hover:opacity-100 motion-safe:animate-[spin_7s_linear_infinite]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 rounded-2xl bg-white/10" aria-hidden="true" />

        {/* Glass body */}
        <div className="relative h-full overflow-hidden rounded-[15px] bg-[#0d0d18]/90 backdrop-blur-2xl">
          {/* Cursor spotlight */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: 'radial-gradient(420px circle at var(--cx) var(--cy), rgba(151,0,255,0.18), transparent 45%)' }}
            aria-hidden="true"
          />
          {children}
        </div>
      </div>
    </motion.div>
  )
}

function CardBody({ index, label, text, still }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })

  return (
    <div ref={ref} className="relative flex h-full flex-col p-8 sm:p-10">
      <div className="flex items-center justify-between">
        <p className="eyebrow flex items-center gap-2.5 text-white/60">
          <span className="size-1.5 rounded-full bg-violet shadow-[0_0_10px_2px] shadow-violet/70" aria-hidden="true" />
          <Decipher text={`Our ${label.toLowerCase()}`} run={inView} still={still} />
        </p>
        <span className="font-mono text-xs text-white/30">{index}</span>
      </div>
      <h2 className="display mt-8 text-5xl sm:text-6xl">
        <Decipher text={label} run={inView} still={still} delay={150} />
        <span className="text-violet">.</span>
      </h2>
      <motion.p
        className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl"
        initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
        transition={{ duration: 1, ease: EASE, delay: 0.55 }}
      >
        {text}
      </motion.p>
    </div>
  )
}

/* ── Text decipher ──────────────────────────────────────────────────────── */

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>/'

/** Scrambles through random glyphs, then locks letters in left to right. Screen readers get the plain text. */
function Decipher({ text, run, still, delay = 0, speed = 38 }) {
  const [shown, setShown] = useState(still ? text : '')

  useEffect(() => {
    if (!run) return
    if (still) {
      setShown(text)
      return
    }
    let frame = 0
    let timer
    const start = setTimeout(() => {
      timer = setInterval(() => {
        frame += 1
        const locked = Math.floor(frame / 2) // two scramble ticks per settled letter
        setShown(
          [...text]
            .map((ch, i) => (i < locked || ch === ' ' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join(''),
        )
        if (locked >= text.length) clearInterval(timer)
      }, speed)
    }, delay)
    return () => {
      clearTimeout(start)
      clearInterval(timer)
    }
  }, [run, still, text, delay, speed])

  return (
    <span aria-label={text}>
      <span aria-hidden="true" className={shown ? '' : 'invisible'}>
        {shown || text}
      </span>
    </span>
  )
}

/* ── Wireframe polyhedron ───────────────────────────────────────────────── */

// Icosahedron: 12 vertices from the golden ratio; edges join vertices exactly 2 apart.
const PHI = (1 + Math.sqrt(5)) / 2
const VERTS = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
]
const EDGES = []
VERTS.forEach((a, i) =>
  VERTS.forEach((b, j) => {
    if (j > i && Math.abs(Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) - 2) < 1e-6) EDGES.push([i, j])
  }),
)

/** SVG wireframe icosahedron spun in 3D by hand — 30 lines and 12 dots, no WebGL needed. */
function OrbTile({ still }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const lines = useRef([])
  const dots = useRef([])
  const angle = useRef(0.6)

  const draw = (a) => {
    const [ca, sa] = [Math.cos(a), Math.sin(a)]
    const [ct, st] = [Math.cos(0.45), Math.sin(0.45)] // fixed forward tilt
    const projected = VERTS.map(([x, y, z]) => {
      const x1 = x * ca + z * sa // spin around Y
      const z1 = -x * sa + z * ca
      const y1 = y * ct - z1 * st // tilt around X
      const z2 = y * st + z1 * ct
      const p = 4.2 / (4.2 + z2) // perspective
      return [100 + x1 * 38 * p, 100 + y1 * 38 * p, z2]
    })
    EDGES.forEach(([i, j], k) => {
      const el = lines.current[k]
      if (!el) return
      el.setAttribute('x1', projected[i][0])
      el.setAttribute('y1', projected[i][1])
      el.setAttribute('x2', projected[j][0])
      el.setAttribute('y2', projected[j][1])
      el.setAttribute('stroke-opacity', 0.25 + 0.5 * ((2 - (projected[i][2] + projected[j][2]) / 2) / 4)) // nearer = brighter
    })
    projected.forEach(([x, y, z], k) => {
      const el = dots.current[k]
      if (!el) return
      el.setAttribute('cx', x)
      el.setAttribute('cy', y)
      el.setAttribute('r', 1.6 + (2 - z) * 0.5)
    })
  }

  useEffect(() => draw(angle.current), [])
  useAnimationFrame((_, delta) => {
    if (still || !inView) return
    angle.current += delta * 0.00035
    draw(angle.current)
  })

  return (
    <div ref={ref} className="relative grid h-full min-h-80 place-items-center p-8">
      <div className="absolute size-56 rounded-full bg-violet/30 blur-3xl" aria-hidden="true" />
      <div className="absolute size-40 translate-x-10 translate-y-8 rounded-full bg-cyan-400/15 blur-3xl" aria-hidden="true" />
      <div className="relative aspect-square w-full max-w-sm motion-safe:animate-float" style={{ animationDuration: '7s' }}>
        <svg viewBox="0 0 200 200" className="size-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="vm-edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="92" fill="none" stroke="white" strokeOpacity="0.06" strokeDasharray="2 6" />
          {EDGES.map((_, k) => (
            <line key={k} ref={(el) => (lines.current[k] = el)} stroke="url(#vm-edge)" strokeWidth="0.8" />
          ))}
          {VERTS.map((_, k) => (
            <circle key={k} ref={(el) => (dots.current[k] = el)} fill="#e9d5ff" />
          ))}
        </svg>
      </div>
      <p className="eyebrow absolute bottom-6 left-8 text-white/35">Data · Strategy · Technology</p>
    </div>
  )
}

/* ── Backdrop ───────────────────────────────────────────────────────────── */

/** Violet, cyan and emerald glow orbs plus a grid that brightens in a circle around the cursor. */
function Backdrop({ still }) {
  const drift = (x, y, duration) =>
    still ? {} : { animate: { x: [0, x, 0], y: [0, y, 0] }, transition: { duration, repeat: Infinity, ease: 'easeInOut' } }
  const grid =
    'linear-gradient(rgba(255,255,255,VAR) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,VAR) 1px,transparent 1px)'

  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <motion.div className="absolute -left-40 top-0 size-[32rem] rounded-full bg-violet opacity-25 blur-3xl" {...drift(90, 60, 16)} />
      <motion.div className="absolute -right-32 top-1/3 size-[28rem] rounded-full bg-cyan-400 opacity-15 blur-3xl" {...drift(-70, -40, 19)} />
      <motion.div className="absolute bottom-[-8rem] left-1/3 size-[26rem] rounded-full bg-emerald-400 opacity-10 blur-3xl" {...drift(60, -50, 22)} />

      {/* Base grid, faded toward the edges */}
      <div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
        style={{ backgroundImage: grid.replaceAll('VAR', '0.035'), backgroundSize: '56px 56px' }}
      />
      {/* Bright grid, visible only in a circle around the cursor */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: grid.replaceAll('VAR', '0.16'),
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(260px circle at var(--mx) var(--my), black, transparent)',
          WebkitMaskImage: 'radial-gradient(260px circle at var(--mx) var(--my), black, transparent)',
        }}
      />
    </div>
  )
}
