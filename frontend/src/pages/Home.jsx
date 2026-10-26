import { useState } from 'react'
import Meta from '../components/Meta'
import LogoIntro from '../components/LogoIntro'
import ProjectViewer from '../components/ProjectViewer'
import ScrollProgress from '../components/motion/ScrollProgress'
import { useCollection, useSettings } from '../hooks/useContent'
import Hero from './home/Hero'
import BrandIntro from './home/BrandIntro'
import ServicesShowcase from './home/ServicesShowcase'
import PortfolioShowcase from './home/PortfolioShowcase'
import Statement from './home/Statement'
import AboutFounder from './home/AboutFounder'
import Stats from './home/Stats'
import TestimonialsShowcase from './home/TestimonialsShowcase'
import Insights from './home/Insights'
import FinalCta from './home/FinalCta'

export default function Home() {
  const settings = useSettings()
  const services = useCollection('services')
  const portfolio = useCollection('portfolio')
  const testimonials = useCollection('testimonials')
  const blogs = useCollection('blogs')
  const [project, setProject] = useState(null)

  return (
    <>
      <Meta description={settings.introText || settings.heroSubtitle} />
      <ScrollProgress />
      <LogoIntro>
        <Hero settings={settings} work={portfolio.data} />
      </LogoIntro>
      <BrandIntro settings={settings} />
      {services.data.length > 0 && <ServicesShowcase services={services.data} />}
      <PortfolioShowcase projects={portfolio.data} loading={portfolio.loading} onOpen={setProject} />
      <Statement />
      <AboutFounder settings={settings} />
      <Stats settings={settings} serviceCount={services.data.length} serviceTitles={services.data.map((s) => s.title)} />
      <TestimonialsShowcase items={testimonials.data} />
      <Insights posts={blogs.data} loading={blogs.loading} />
      <FinalCta settings={settings} />

      <ProjectViewer project={project} onClose={() => setProject(null)} />
    </>
  )
}
