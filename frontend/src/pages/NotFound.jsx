import Meta from '../components/Meta'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <>
      <Meta title="Page not found" />
      <meta name="robots" content="noindex" />
      <section className="flex min-h-[90vh] flex-col items-center justify-center bg-black px-5 pt-32 pb-24 text-center text-white">
        <h1 className="display text-[6rem] sm:text-[12rem]">
          <span className="chip bg-white text-ink">404</span>
        </h1>
        <p className="mt-10 max-w-lg text-pretty text-lg leading-relaxed text-white/65 md:text-xl">This page has moved or no longer exists. Head back home, or explore what we do.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button to="/" variant="light">
            Back to home
          </Button>
          <Button to="/services" variant="outline-light">
            Our services
          </Button>
        </div>
      </section>
    </>
  )
}
