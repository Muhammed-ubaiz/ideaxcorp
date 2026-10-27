import { Link } from 'react-router'
import { motion } from 'motion/react'
import { articlesData } from '../../data/kotaData'

export default function KotaArticles() {
  return (
    <section
      id="articles-section"
      data-theme="dark"
      className="py-24 sm:py-36 bg-black text-white relative z-10 border-t border-white/10"
    >
      <div className="site-container">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-16 sm:pb-24 border-b border-white/15">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs uppercase tracking-widest text-white/45 block mb-3 font-semibold">
              Insights & News
            </span>
            <h2 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              {articlesData.heading}
            </h2>
          </motion.div>

          <Link
            to="/blog"
            className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
          >
            <span>{articlesData.linkText}</span>
            <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:translate-x-1 transition-all">
              →
            </span>
          </Link>
        </div>

        {/* 9 Articles Grid */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {articlesData.items.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (idx % 3) * 0.1 }}
              className="group flex flex-col justify-between"
            >
              <Link to={article.href} className="block">
                {/* Article Image Preview */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 mb-6">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Categories */}
                <span className="text-xs font-semibold uppercase tracking-widest text-white/45 block mb-3">
                  {article.categories}
                </span>

                {/* Title */}
                <h3 className="font-syne text-xl sm:text-2xl font-bold text-white group-hover:text-white/80 transition-colors leading-snug">
                  {article.title}
                </h3>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
