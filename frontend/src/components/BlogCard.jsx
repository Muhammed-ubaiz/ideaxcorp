import { Link } from 'react-router'
import { formatDate } from '../utils/format'

export function BlogCover({ post, className = '' }) {
  if (post.coverImage) {
    return (
      <img
        src={post.coverImage}
        alt=""
        loading="lazy"
        className={`size-full object-cover transition-transform duration-[1.6s] ease-cinema group-hover:scale-[1.05] ${className}`}
      />
    )
  }
  return (
    <div className="flex size-full flex-col justify-between bg-violet p-6 text-white sm:p-8">
      <span className="eyebrow text-white/70">Ideaxcorp blog</span>
      <span className="display-md line-clamp-3 text-2xl sm:text-3xl">{post.title}</span>
    </div>
  )
}

export default function BlogCard({ post, large = false }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className={`overflow-hidden rounded-lg bg-mist ${large ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
        <BlogCover post={post} />
      </div>
      <p className="eyebrow mt-6 flex flex-wrap gap-x-3 text-graphite">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        {post.readingTime ? <span>· {post.readingTime} min read</span> : null}
      </p>
      <h3
        className={`display-md mt-3 text-balance text-ink decoration-violet decoration-2 underline-offset-[6px] group-hover:underline ${
          large ? 'text-3xl sm:text-[2.4rem]' : 'text-xl sm:text-[1.45rem]'
        }`}
      >
        {post.title}
      </h3>
      {post.excerpt && <p className={`mt-3 text-graphite ${large ? 'line-clamp-3 text-lg' : 'line-clamp-2'}`}>{post.excerpt}</p>}
    </Link>
  )
}
