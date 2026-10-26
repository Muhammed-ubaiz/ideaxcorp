import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import Button from '../../components/Button'
import { Skeleton } from '../../components/Skeleton'
import { EASE, Reveal, RevealLines } from '../../components/Reveal'
import { formatDate } from '../../utils/format'

const HOME_POSTS = 4
const VIEW = { once: true, margin: '0px 0px -10% 0px' }

/** Cover image with a restrained hover zoom and a branded fallback if the image is missing or fails. */
function Cover({ post }) {
  const [failed, setFailed] = useState(false)
  if (!post.coverImage || failed) {
    return (
      <div className="grid size-full place-items-center bg-[linear-gradient(140deg,#9700ff,#5b00a6)]">
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
      className="size-full object-cover transition-transform duration-[1.4s] ease-cinema group-hover:scale-[1.06]"
    />
  )
}

/** Thumbnail, category pill, headline and date — the reference's insight card. */
function PostCard({ post, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: 1.1, ease: EASE, delay: 0.1 + index * 0.1 }}
    >
      <Link to={`/blog/${post.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-mist">
          <Cover post={post} />
          {post.category && (
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-ink backdrop-blur">
              {post.category}
            </span>
          )}
        </div>
        <h3 className="mt-5 line-clamp-2 text-pretty text-lg font-semibold leading-snug text-ink transition-colors duration-500 group-hover:text-violet sm:text-xl">
          {post.title}
        </h3>
        <p className="mt-3 flex flex-wrap items-center gap-x-3 text-sm text-smoke">
          {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
          {post.readingTime ? (
            <>
              <span className="size-1 rounded-full bg-current opacity-50" aria-hidden="true" />
              <span>{post.readingTime} min read</span>
            </>
          ) : null}
        </p>
      </Link>
    </motion.li>
  )
}

export default function Insights({ posts, loading }) {
  // Lead with the newest post that has a featured image; the next three newest follow.
  const lead = posts.find((p) => p.coverImage) || posts[0]
  const shown = lead ? [lead, ...posts.filter((p) => p !== lead)].slice(0, HOME_POSTS) : []

  return (
    <section className="relative bg-white py-28 md:py-36" aria-label="Insights and ideas">
      <div className="site-container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal as="p" y={12} className="kicker mb-7 flex items-center gap-3 text-graphite">
              <span className="inline-block size-1.5 rounded-full bg-violet" aria-hidden="true" />
              Blog
            </Reveal>
            <RevealLines as="h2" lines={['Insights', '& ideas']} className="display text-[2.9rem] sm:text-7xl lg:text-[6rem]" lineClassName="[&:nth-child(2)]:text-violet" />
          </div>
          <div className="md:max-w-sm md:pb-3">
            <Reveal as="p" delay={0.2} className="text-pretty leading-relaxed text-graphite">
              Tips, playbooks and industry updates on digital marketing, web development and online growth.
            </Reveal>
            <Reveal delay={0.3} className="mt-7">
              <Button to="/blog" variant="outline">
                View all articles
              </Button>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-14">
          {loading ? (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true">
              {Array.from({ length: HOME_POSTS }, (_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-[4/3] rounded-3xl" />
                  <Skeleton className="mt-5 h-6 w-5/6" />
                  <Skeleton className="mt-3 h-4 w-1/3" />
                </div>
              ))}
            </div>
          ) : shown.length === 0 ? (
            <div className="rounded-3xl border border-line px-6 py-14 text-center">
              <p className="display-md text-2xl">New articles are on the way.</p>
              <p className="mt-2 text-graphite">Check back soon for insights from the Ideaxcorp team.</p>
            </div>
          ) : (
            <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {shown.map((p, i) => (
                <PostCard key={p.id ?? p.slug} post={p} index={i} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
