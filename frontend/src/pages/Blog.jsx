import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import Meta from '../components/Meta'
import PageHero from '../components/PageHero'
import BlogCard, { BlogCover } from '../components/BlogCard'
import Button from '../components/Button'
import { GridSkeleton } from '../components/Skeleton'
import { Reveal } from '../components/Reveal'
import { useCollection } from '../hooks/useContent'
import { formatDate } from '../utils/format'

const PAGE = 9

export default function Blog() {
  const { data, loading } = useCollection('blogs')
  const [q, setQ] = useState('')
  const [shown, setShown] = useState(PAGE)

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return data
    return data.filter((p) => `${p.title} ${p.excerpt}`.toLowerCase().includes(term))
  }, [data, q])

  const [lead, ...rest] = q ? [null, ...results] : results

  return (
    <>
      <Meta title="Blog" description="Insights, tips, and industry updates on digital marketing, web development, and online business growth." />
      <PageHero
        eyebrow="Blog"
        title="Hear from us."
        intro="Insights, tips, and industry updates on digital marketing, web development, and online business growth."
      >
        <label className="flex w-full max-w-md items-center gap-3 rounded-full border border-ink/20 bg-white/60 px-6 transition-colors focus-within:border-ink">
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setShown(PAGE)
            }}
            placeholder="Search articles"
            className="w-full bg-transparent py-3.5 text-lg text-ink outline-none placeholder:text-smoke"
          />
        </label>
      </PageHero>

      <section className="site-container py-20 md:py-28">
        {loading ? (
          <GridSkeleton count={6} className="aspect-[4/3] rounded-[1.25rem]" />
        ) : results.length === 0 ? (
          <p className="lead py-12">
            No articles match “{q}”. Try a broader term, like “SEO” or “Instagram”.
          </p>
        ) : (
          <>
            {lead && (
              <Reveal>
                <Link to={`/blog/${lead.slug}`} className="group mb-20 grid gap-8 border-b border-ink pb-20 lg:grid-cols-12 lg:items-end lg:gap-12">
                  <div className="aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-mist lg:col-span-7">
                    <BlogCover post={lead} />
                  </div>
                  <div className="lg:col-span-5">
                    <p className="eyebrow text-violet">Latest article</p>
                    <h2 className="display mt-5 text-balance text-4xl transition-colors duration-500 group-hover:text-violet sm:text-[3.4rem]">
                      {lead.title}
                    </h2>
                    <p className="lead mt-5 line-clamp-4">{lead.excerpt}</p>
                    <p className="eyebrow mt-6 text-graphite">
                      {formatDate(lead.publishedAt)} · {lead.readingTime} min read
                    </p>
                  </div>
                </Link>
              </Reveal>
            )}
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {rest.slice(0, shown).map((post, i) => (
                <Reveal key={post.id} delay={(i % 3) * 0.08} className={i % 3 === 1 ? 'lg:mt-20' : ''}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
            {rest.length > shown && (
              <div className="mt-20 flex justify-center">
                <Button variant="outline" onClick={() => setShown((n) => n + PAGE)}>
                  Show more articles
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
}
