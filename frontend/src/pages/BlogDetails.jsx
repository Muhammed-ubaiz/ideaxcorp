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
          className="grid size-10 place-items-center rounded-md bg-mist text-ink transition-colors hover:bg-violet hover:text-white"
        >
          <Icon className="size-[1.1rem]" />
        </a>
      ))}
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(url).then(() => setCopied(true))}
        className="h-10 rounded-md bg-mist px-4 text-sm font-semibold transition-colors hover:bg-lilac"
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
        <header className="mx-auto max-w-4xl px-5 pt-36 sm:px-8 md:pt-44">
          <Link to="/blog" className="eyebrow inline-flex items-center gap-2 text-graphite hover:text-ink">
            <ArrowLeft className="size-4" /> All articles
          </Link>
          <motion.h1
            className="display mt-8 text-balance text-[2.3rem] leading-[1] sm:text-5xl lg:text-[4rem]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          >
            {post.title}
          </motion.h1>
          <motion.p
            className="eyebrow mt-8 flex flex-wrap gap-x-4 gap-y-1 text-graphite"
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
            className="mx-auto mt-14 max-w-6xl overflow-hidden px-5 sm:px-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
          >
            <img src={post.coverImage} alt="" className="max-h-[42rem] w-full rounded-lg bg-mist object-cover" />
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
        <section className="border-t border-line bg-mist py-24 md:py-32">
          <div className="site-container">
            <h2 className="display-md text-4xl sm:text-5xl">Keep reading</h2>
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
