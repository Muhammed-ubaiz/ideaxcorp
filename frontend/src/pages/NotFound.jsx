import Meta from '../components/Meta'
import Button from '../components/Button'
import ArrowTile from '../components/ArrowTile'

export default function NotFound() {
  return (
    <>
      <Meta title="Page not found" />
      <meta name="robots" content="noindex" />
      <section className="site-container flex min-h-[80vh] flex-col justify-center pt-32 pb-24">
        <ArrowTile size="lg" />
        <h1 className="display mt-10 text-[4.5rem] sm:text-[9rem]">404</h1>
        <p className="lead mt-6 max-w-lg">This page has moved or no longer exists. Head back home, or explore what we do.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/">Back to home</Button>
          <Button to="/services" variant="outline">
            Our services
          </Button>
        </div>
      </section>
    </>
  )
}
