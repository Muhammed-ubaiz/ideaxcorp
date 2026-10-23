import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Button from '../../components/Button'
import { ArrowUpRight } from '../../components/Icons'
import { Skeleton } from '../../components/Skeleton'
import { EASE, Reveal, RevealLines } from '../../components/Reveal'
import { formatDate } from '../../utils/format'

const HOME_POSTS = 4
const VIEW = { once: true, margin: '0px 0px -10% 0px' }

/** Cards rise in sequence once the grid is in view. */
const rise = (i) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEW,
  transition: { duration: 1.1, ease: EASE, delay: 0.1 + i * 0.12 },
})

const pad = (n) => String(n).padStart(2, '0')

/** Cover image with a restrained hover zoom and a branded fallback if the image is missing or fails. */
function Cover({ post, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (!post.coverImage || failed) {
    return (
      <div className={`grid place-items-center bg-[linear-gradient(140deg,#9700ff,#5b00a6)] ${className}`}>
        <img src="/images/mark.webp" alt="" className="size-10 rounded-[3px] opacity-90" />
      </div>
    )
  }
  return (
    <img
      src={post.coverImage}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover transition-transform duration-[1.4s] ease-cinema group-hover:scale-[1.05] ${className}`}
    />
  )
}

function Meta({ post, className = '' }) {
  return (
    <p className={`eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.72rem] ${className}`}>
      {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
      {post.readingTime ? (
        <>
          <span className="size-1 rounded-full bg-current opacity-50" aria-hidden="true" />
          <span>{post.readingTime} min read</span>
        </>
      ) : null}
    </p>
  )
}

/** Round arrow that fills in on card hover. */
function Arrow({ tone = 'light' }) {
  const tones = {
    light: 'border-white/40 text-white group-hover:border-white group-hover:bg-white group-hover:text-ink',
    ink: 'border-line text-ink group-hover:border-violet group-hover:bg-violet group-hover:text-white',
  }
  return (
    <span className={`grid size-11 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${tones[tone]}`} aria-hidden="true">
      <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </span>
  )
}

/** Lead story: full-bleed cover with the headline set over a dark gradient. */
function FeaturedPost({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group relative isolate flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-2xl bg-ink p-6 text-white sm:min-h-[32rem] sm:p-9"
    >
      <Cover post={post} className="absolute inset-0 -z-20 size-full" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(14,11,18,0.15)_0%,rgba(14,11,18,0.35)_40%,rgba(14,11,18,0.92)_100%)]" />

      <div className="flex items-start justify-between gap-4">
        <span className="eyebrow rounded-full bg-white/95 px-3 py-1.5 text-[0.7rem] text-ink">
          {post.category || 'Featured'}
        </span>
        <Arrow />
      </div>

      <div className="max-w-2xl">
        <Meta post={post} className="text-white/70" />
        <h3 className="display-md mt-4 text-balance text-[1.8rem] leading-[1.06] sm:text-[2.6rem]">{post.title}</h3>
        {post.excerpt && <p className="mt-4 line-clamp-2 hidden max-w-xl text-white/75 sm:block">{post.excerpt}</p>}
      </div>
    </Link>
  )
}

/** Brand accent: a text-only violet card led by its index number. */
function AccentPost({ post, number }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-2xl bg-violet p-6 text-white sm:p-8"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full border border-white/20 transition-transform duration-[1.4s] ease-cinema group-hover:scale-125"
      />
      <div className="flex items-start justify-between gap-4">
        <span className="display text-6xl text-white/30">{pad(number)}</span>
        <Arrow />
      </div>
      <div>
        {post.category && <p className="eyebrow mb-3 text-[0.72rem] text-white/80">{post.category}</p>}
        <h3 className="display-md line-clamp-4 text-balance text-2xl leading-[1.1] sm:text-[1.75rem]">{post.title}</h3>
        <Meta post={post} className="mt-5 text-white/70" />
      </div>
    </Link>
  )
}

/** Compact story: thumbnail beside an indexed headline. */
function CompactPost({ post, number }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group grid h-full grid-cols-[7rem_1fr] items-center gap-5 rounded-2xl border border-line bg-paper p-3 transition-[background-color,border-color,box-shadow] duration-500 hover:border-transparent hover:bg-mist hover:shadow-[0_24px_48px_-32px_rgba(14,11,18,0.4)] sm:grid-cols-[11rem_1fr] sm:p-4"
    >
      <div className="aspect-square overflow-hidden rounded-xl bg-mist sm:aspect-[4/3]">
        <Cover post={post} className="size-full" />
      </div>
      <div className="flex min-w-0 items-end justify-between gap-4 py-1">
        <div className="min-w-0">
          <p className="eyebrow flex items-center gap-3 text-[0.72rem] text-graphite">
            <span className="text-violet">{pad(number)}</span>
            {post.category && <span className="truncate">{post.category}</span>}
          </p>
          <h3 className="mt-2 line-clamp-3 text-[1.05rem] font-semibold leading-snug text-ink sm:text-lg">{post.title}</h3>
          <Meta post={post} className="mt-3 text-smoke" />
        </div>
        <span className="hidden sm:block">
          <Arrow tone="ink" />
        </span>
      </div>
    </Link>
  )
}

function LoadingGrid() {
  return (
    <div className="grid gap-5 lg:grid-cols-12" aria-busy="true">
      <Skeleton className="min-h-[26rem] rounded-2xl sm:min-h-[32rem] lg:col-span-8" />
      <Skeleton className="min-h-[22rem] rounded-2xl lg:col-span-4" />
      {[0, 1].map((n) => (
        <Skeleton key={n} className="h-36 rounded-2xl lg:col-span-6" />
      ))}
    </div>
  )
}

export default function Insights({ posts, loading }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const glowY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-80, 80])

  // Lead with the newest post that has a featured image; the next three newest follow.
  const lead = posts.find((p) => p.coverImage) || posts[0]
  const [accent, ...compact] = posts.filter((p) => p !== lead).slice(0, HOME_POSTS - 1)

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-paper py-28 md:py-36" aria-label="Insights and ideas">
      <motion.div aria-hidden="true" style={{ y: glowY }} className="absolute -left-48 top-1/3 -z-10 size-[34rem] rounded-full bg-violet/[0.07] blur-[100px]" />

      <div className="site-container">
        <div className="grid gap-8 border-b border-line pb-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal as="p" y={12} className="eyebrow mb-7 flex items-center gap-3 text-graphite">
              <span className="inline-block size-2 bg-violet" aria-hidden="true" />
              Blog
            </Reveal>
            <RevealLines as="h2" lines={['Insights', '& ideas']} className="display text-[2.9rem] sm:text-7xl lg:text-[6rem]" lineClassName="[&:nth-child(2)]:text-violet" />
          </div>
          <div className="md:col-span-5 md:pb-3">
            <Reveal as="p" delay={0.2} className="lead max-w-md">
              Tips, playbooks and industry updates on digital marketing, web development and online growth.
            </Reveal>
            <Reveal delay={0.3} className="mt-7">
              <Button to="/blog" variant="outline">
                View all articles
              </Button>
            </Reveal>
          </div>
        </div>

        <div className="mt-12">
          {loading ? (
            <LoadingGrid />
          ) : !lead ? (
            <div className="rounded-2xl border border-line px-6 py-14 text-center">
              <p className="display-md text-2xl">New articles are on the way.</p>
              <p className="mt-2 text-graphite">Check back soon for insights from the Ideaxcorp team.</p>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-12">
              <motion.div {...rise(0)} className={accent ? 'lg:col-span-8' : 'lg:col-span-12'}>
                <FeaturedPost post={lead} />
              </motion.div>
              {accent && (
                <motion.div {...rise(1)} className="lg:col-span-4">
                  <AccentPost post={accent} number={2} />
                </motion.div>
              )}
              {compact.map((p, i) => (
                <motion.div key={p.id} {...rise(i + 2)} className={compact.length === 1 ? 'lg:col-span-12' : 'lg:col-span-6'}>
                  <CompactPost post={p} number={i + 3} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
