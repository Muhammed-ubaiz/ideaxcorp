import { useState } from 'react'
import Meta from '../components/Meta'
import FounderNote from '../components/FounderNote'
import ProjectViewer from '../components/ProjectViewer'
import ScrollProgress from '../components/motion/ScrollProgress'
import { useCollection, useSettings } from '../hooks/useContent'
import HeroSection from './home/HeroSection'
import TrustSection from './home/TrustSection'
import WorkSection from './home/WorkSection'
import AboutSection from './home/AboutSection'
import ServicesSection from './home/ServicesSection'
import ShowreelSection from './home/ShowreelSection'
import TestimonialsSection from './home/TestimonialsSection'
import ContactSection from './home/ContactSection'
import BlogSection from './home/BlogSection'
import FaqSection from './home/FaqSection'

// Sections follow the order of the live ideaxcorp.com homepage.
export default function Home() {
  const settings = useSettings()
  const services = useCollection('services')
  const portfolio = useCollection('portfolio')
  const testimonials = useCollection('testimonials')
  const blogs = useCollection('blogs')
  const faqs = useCollection('faqs')
  const [project, setProject] = useState(null)

  return (
    <>
      <Meta description={settings.introText} />
      <ScrollProgress />
      <HeroSection />
      <TrustSection settings={settings} />
      <WorkSection projects={portfolio.data} settings={settings} onOpen={setProject} />
      <AboutSection settings={settings} />
      {services.data.length > 0 && <ServicesSection services={services.data} />}
      <ShowreelSection url={settings.showreelUrl} />
      <FounderNote settings={settings} />
      <TestimonialsSection items={testimonials.data} />
      <ContactSection settings={settings} />
      <BlogSection posts={blogs.data} />
      <FaqSection items={faqs.data} />

      <ProjectViewer project={project} projects={portfolio.data} onNavigate={setProject} onClose={() => setProject(null)} />
    </>
  )
}
