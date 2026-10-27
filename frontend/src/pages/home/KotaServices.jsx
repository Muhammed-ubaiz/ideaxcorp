import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { servicesData } from '../../data/kotaData'

export default function KotaServices() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="services-section" className="py-24 sm:py-36 bg-[#ecebe6] border-t border-black/10">
      <div className="site-container">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-14 border-b border-black/15">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs uppercase tracking-widest text-black/45 block mb-3 font-semibold">
              What we do
            </span>
            <h2 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black">
              Our Services
            </h2>
          </motion.div>

          <Link
            to="/services"
            className="group hidden sm:inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-black/60 hover:text-black transition-colors"
          >
            <span>Explore all services</span>
            <span className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center group-hover:border-black group-hover:translate-x-1 transition-all">
              →
            </span>
          </Link>
        </div>

        {/* 3 Interactive Service Rows/Cards */}
        <div className="divide-y divide-black/15">
          {servicesData.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
              onMouseEnter={() => setActiveTab(idx)}
              className="py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center group cursor-pointer"
            >
              {/* Left Column: Number, Title, Tags, Description, CTA */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-black/40">
                      0{idx + 1}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full bg-white/70 text-black/80 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-syne text-3xl sm:text-5xl lg:text-5xl font-bold text-black tracking-tight mt-2 mb-6 group-hover:text-black/75 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-lg sm:text-xl text-black/75 leading-relaxed max-w-xl mb-8">
                    {service.description}
                  </p>
                </div>

                <div>
                  <Link
                    to={service.link}
                    className="group/btn inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-all"
                  >
                    <span>Find out more</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 17.1 15.17"
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
                      fill="currentColor"
                    >
                      <path d="m17.1,7.58s-.01-.04-.01-.06c.01-.22-.06-.45-.24-.61L9.23.19c-.31-.27-.78-.24-1.06.07-.27.31-.24.78.07,1.06l6.26,5.52H.75c-.41,0-.75.34-.75.75s.34.75.75.75h13.74l-6.26,5.52c-.31.27-.34.75-.07,1.06.15.17.35.25.56.25.18,0,.35-.06.5-.19l7.62-6.72c.18-.16.25-.39.24-.61,0-.02.01-.04.01-.06Z" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Preview (Video / Poster) */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/5 shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-[1.02]">
                  <video
                    src={service.video}
                    poster={service.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
