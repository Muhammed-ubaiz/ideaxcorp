import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { motion, useScroll, useSpring } from 'motion/react'
import Meta from '../components/Meta'
import BlogCard from '../components/BlogCard'
import { ArrowLeft, Facebook, LinkedIn, WhatsApp } from '../components/Icons'
import { EASE, Reveal } from '../components/Reveal'
import { Skeleton } from '../components/Skeleton'
import { useCollection } from '../hooks/useContent'
import { formatDate } from '../utils/format'
import { sanitizeHtml } from '../utils/sanitize'
import NotFound from './NotFound'

function Share({ title }) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const enc = encodeURIComponent
  const links = [
    ['LinkedIn', LinkedIn, `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`],
    ['Facebook', Facebook, `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`],
    ['WhatsApp', WhatsApp, `https://wa.me/?text=${enc(`${title} ${url}`)}`],
  ]
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="eyebrow mr-2 text-graphite">Share</span>
      {links.map(([label, Icon, href]) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
        >
          <Icon className="size-[1.1rem]" />
        </a>
      ))}
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(url).then(() => setCopied(true))}
        className="h-11 rounded-full border border-ink/15 px-5 text-sm font-semibold transition-colors hover:border-ink"
      >
        {copied ? 'Link copied' : 'Copy link'}
      </button>
    </div>
  )
}

export default function BlogDetails() {
  const { slug } = useParams()
  const { data, loading } = useCollection('blogs')
  const post = data.find((p) => p.slug === slug)
  const html = useMemo(() => sanitizeHtml(post?.content), [post])
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-44 pb-24">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-8 h-32 w-full" />
        <Skeleton className="mt-12 aspect-[16/9] w-full" />
      </div>
    )
  }
  if (!post) return <NotFound />

  const related = data.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <>
      <Meta title={post.title} description={post.excerpt} image={post.coverImage} />
      <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-violet" style={{ scaleX: progress }} />

      <article>
        <header className="site-container pt-36 md:pt-48">
          <Link to="/blog" className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink">
            <ArrowLeft className="size-4" /> All articles
          </Link>
          <motion.h1
            className="display-lg mt-10 max-w-6xl text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          >
            {post.title}
          </motion.h1>
          <motion.p
            className="eyebrow mt-10 flex flex-wrap gap-x-6 gap-y-1 border-t border-ink/15 pt-6 text-graphite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span>By {post.author || 'Ideaxcorp'}</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, { day: 'numeric', month: 'long', year: 'numeric' })}</time>
            {post.readingTime ? <span>{post.readingTime} min read</span> : null}
          </motion.p>
        </header>

        {post.coverImage && (
          <motion.div
            className="site-container mt-14 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
          >
            <img src={post.coverImage} alt="" className="max-h-[46rem] w-full rounded-[1.25rem] bg-mist object-cover" />
          </motion.div>
        )}

        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
          <div className="prose-ix" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="mt-16 border-t border-line pt-8">
            <Share title={post.title} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-ink/15 py-24 md:py-32">
          <div className="site-container">
            <h2 className="display-lg">Keep reading</h2>
            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
