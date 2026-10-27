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

/** Thumbnail with a category pill, then the headline and date — the reference's insight card. */
export default function BlogCard({ post, large = false }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className={`relative overflow-hidden rounded-[1.25rem] bg-mist ${large ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
        <BlogCover post={post} />
        {post.category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-ink backdrop-blur">{post.category}</span>
        )}
      </div>
      <h3
        className={`display-md mt-6 text-balance text-ink transition-colors duration-500 group-hover:text-violet ${
          large ? 'text-3xl sm:text-[2.4rem]' : 'text-[1.4rem] sm:text-[1.6rem]'
        }`}
      >
        {post.title}
      </h3>
      {post.excerpt && <p className={`mt-3 text-graphite ${large ? 'line-clamp-3 text-lg' : 'line-clamp-2'}`}>{post.excerpt}</p>}
      <p className="mt-4 flex flex-wrap items-center gap-x-3 text-sm text-smoke">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        {post.readingTime ? (
          <>
            <span className="size-1 rounded-full bg-current opacity-50" aria-hidden="true" />
            <span>{post.readingTime} min read</span>
          </>
        ) : null}
      </p>
    </Link>
  )
}
