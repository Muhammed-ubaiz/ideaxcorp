import { Link } from 'react-router'
import Button from '../../components/Button'
import { BlogCover } from '../../components/BlogCard'
import { ArrowRight } from '../../components/Icons'
import { Reveal, RevealLines } from '../../components/Reveal'
import { blog } from '../../data/home'
import { formatDate } from '../../utils/format'

/** The six latest posts: one lead story with a large cover, then a ruled list of the rest. */
export default function BlogSection({ posts }) {
  const [lead, ...rest] = posts.slice(0, 6)
  if (!lead) return null

  return (
    <section aria-labelledby="blog-title" className="border-t border-ink/15 py-24 md:py-36">
      <div className="site-container">
        <Reveal as="p" y={12} className="section-label text-graphite">
          {blog.label}
        </Reveal>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <RevealLines id="blog-title" lines={[blog.title]} className="display-xl lg:col-span-7" />
          <Reveal as="p" delay={0.15} className="text-lg leading-relaxed text-graphite lg:col-span-5">
            {blog.intro}
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <Link to={`/blog/${lead.slug}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-mist">
                <BlogCover post={lead} />
              </div>
              <time dateTime={lead.publishedAt} className="mt-6 block text-sm text-graphite">
                {formatDate(lead.publishedAt)}
              </time>
              <h3 className="display-md mt-3 text-balance text-3xl transition-colors duration-500 group-hover:text-violet sm:text-4xl">{lead.title}</h3>
              {lead.excerpt && <p className="mt-4 line-clamp-3 text-graphite">{lead.excerpt}</p>}
              <span className="mt-6 inline-flex items-center gap-2.5 text-sm font-semibold">
                <span className="link-underline">{blog.more}</span>
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>

          <ul className="border-t border-ink lg:col-span-6">
            {rest.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 0.05} y={20} className="border-b border-ink/20">
                <Link to={`/blog/${p.slug}`} className="group grid grid-cols-[1fr_auto] items-center gap-6 py-6">
                  <span>
                    <time dateTime={p.publishedAt} className="text-sm text-graphite">
                      {formatDate(p.publishedAt)}
                    </time>
                    <span className="mt-2 block text-balance text-xl font-semibold leading-snug transition-colors duration-500 group-hover:text-violet sm:text-[1.4rem]">
                      {p.title}
                    </span>
                  </span>
                  <span className="grid size-11 place-items-center rounded-full border border-ink/20 transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <ArrowRight className="size-4" />
                    <span className="sr-only">{blog.more}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="mt-16">
          <Button to="/blog" variant="outline">
            {blog.label}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
