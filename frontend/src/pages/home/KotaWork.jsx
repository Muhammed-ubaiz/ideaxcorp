import { Link } from 'react-router'
import { motion } from 'motion/react'
import { workData } from '../../data/kotaData'

export default function KotaWork() {
  return (
    <section
      id="work-section"
      data-theme="dark"
      className="py-24 sm:py-36 bg-black text-white relative z-10"
    >
      <div className="site-container">
        {/* Top Header */}
        <div className="pb-16 sm:pb-24 border-b border-white/15">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-white/50 font-semibold">
                {workData.heading}
              </span>
            </div>
            <h2 className="font-syne text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-white mb-6">
              {workData.subheading}
            </h2>
            <p className="text-lg sm:text-2xl text-white/60 max-w-2xl font-sans">
              {workData.lead}
            </p>
          </motion.div>
        </div>

        {/* 5 Project Cards */}
        <div className="divide-y divide-white/15">
          {workData.projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
              className="py-14 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center group cursor-pointer"
            >
              {/* Media Preview: Video with fallback Poster */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl group-hover:border-white/30 transition-all duration-500">
                  <video
                    src={project.video}
                    poster={project.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Text / Details */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-syne font-bold px-3 py-1 rounded-full bg-white/10 text-white/90">
                      {project.year}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-white/40">
                      Case Study
                    </span>
                  </div>

                  <h3 className="font-syne text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 group-hover:text-white/80 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-6 font-sans">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full border border-white/15 text-white/60 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <Link
                    to={project.link}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/30 text-white text-sm font-medium hover:border-white hover:bg-white hover:text-black transition-all"
                  >
                    <span>View project</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 17.1 15.17"
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="currentColor"
                    >
                      <path d="m17.1,7.58s-.01-.04-.01-.06c.01-.22-.06-.45-.24-.61L9.23.19c-.31-.27-.78-.24-1.06.07-.27.31-.24.78.07,1.06l6.26,5.52H.75c-.41,0-.75.34-.75.75s.34.75.75.75h13.74l-6.26,5.52c-.31.27-.34.75-.07,1.06.15.17.35.25.56.25.18,0,.35-.06.5-.19l7.62-6.72c.18-.16.25-.39.24-.61,0-.02.01-.04.01-.06Z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="pt-16 sm:pt-24 border-t border-white/15 flex justify-center">
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-4 px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-white text-black font-semibold text-base sm:text-lg hover:bg-neutral-200 transition-all shadow-xl"
          >
            <span>View all projects</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 17.1 15.17"
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
              fill="currentColor"
            >
              <path d="m17.1,7.58s-.01-.04-.01-.06c.01-.22-.06-.45-.24-.61L9.23.19c-.31-.27-.78-.24-1.06.07-.27.31-.24.78.07,1.06l6.26,5.52H.75c-.41,0-.75.34-.75.75s.34.75.75.75h13.74l-6.26,5.52c-.31.27-.34.75-.07,1.06.15.17.35.25.56.25.18,0,.35-.06.5-.19l7.62-6.72c.18-.16.25-.39.24-.61,0-.02.01-.04.01-.06Z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
