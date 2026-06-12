import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { itineraryData } from '@/data/itineraryData'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

function AnimatedCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: '50px',
  })

  return (
    <article
      ref={ref}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      } ${className}`}
    >
      {children}
    </article>
  )
}

export default function ItineraryPage() {
  const [scrolled, setScrolled] = useState(false)
  const [showFloatingButton, setShowFloatingButton] = useState(false)

  useEffect(() => {
    document.title = 'JAPAN TOURS — Ten-Day Curated Itinerary'
    window.scrollTo({ top: 0, behavior: 'auto' })

    return () => {
      document.title = 'JAPAN TOURS — Premium 10-Day Curated Travel Experience'
    }
  }, [])

  const scrollStateRef = useRef({ scrolled: false, showFloatingButton: false })
  const scrollFrame = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollFrame.current !== null) return

      scrollFrame.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const nextScrolled = scrollY > 50
        const nextShowFloatingButton = scrollY > 300

        if (nextScrolled !== scrollStateRef.current.scrolled) {
          scrollStateRef.current.scrolled = nextScrolled
          setScrolled(nextScrolled)
        }

        if (nextShowFloatingButton !== scrollStateRef.current.showFloatingButton) {
          scrollStateRef.current.showFloatingButton = nextShowFloatingButton
          setShowFloatingButton(nextShowFloatingButton)
        }

        scrollFrame.current = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      if (scrollFrame.current !== null) {
        cancelAnimationFrame(scrollFrame.current)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-mist-black text-kimono-white selection:bg-sakura-pink selection:text-mist-black">
      <header
        className={`fixed top-0 z-50 w-full border-b border-white/5 transition-all duration-500 ${
          scrolled ? 'bg-mist-black/70 py-4 backdrop-blur-2xl' : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
          <Link
            to="/"
            className="font-sans text-xs uppercase tracking-[0.2em] text-mountain-cream transition-colors hover:text-sakura-pink"
          >
            ← Back to Dossier
          </Link>
          <div className="hidden font-display text-2xl tracking-widest text-kimono-white md:block">
            JAPAN TOURS
          </div>
          <Link
            to="/#contacts"
            className="rounded-full bg-kimono-white px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-mist-black transition-colors duration-300 hover:bg-sakura-pink"
          >
            Request Access
          </Link>
        </div>
      </header>

      <section className="relative flex min-h-[50vh] flex-col justify-center px-8 pb-20 pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.03] via-mist-black to-mist-black" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p className="mb-6 font-sans text-xs uppercase tracking-[0.3em] text-mountain-cream">
            Curated Itinerary
          </p>
          <h1 className="mb-8 font-display text-7xl leading-none tracking-widest text-kimono-white md:text-9xl">
            TEN DAYS OF ELEVATION
          </h1>
          <div className="flex gap-4 font-display text-xl tracking-widest text-kimono-white md:text-2xl">
            <span className="rounded-full border border-white/20 px-6 py-2 backdrop-blur-sm">OSAKA</span>
            <span className="rounded-full border border-white/20 px-6 py-2 backdrop-blur-sm">KYOTO</span>
            <span className="rounded-full border border-white/20 px-6 py-2 backdrop-blur-sm">TOKYO</span>
          </div>
        </div>
      </section>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-32 px-8 py-20">
        {itineraryData.map((section) => {
          const isLeft = section.layout === 'text-left'

          return (
            <div className="w-full border-t border-white/5 pt-16" key={section.city}>
              <div className={`grid grid-cols-1 gap-16 lg:grid-cols-12 ${!isLeft ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`relative lg:col-span-4 ${!isLeft ? 'lg:order-2' : ''}`}>
                  <div className="sticky top-32">
                    <p
                      className={`mb-4 font-sans text-xs uppercase tracking-[0.2em] text-sakura-pink ${!isLeft ? 'lg:text-right' : ''}`}
                    >
                      {section.chapter}
                    </p>
                    <h2
                      className={`mb-6 font-display text-6xl tracking-widest text-kimono-white ${!isLeft ? 'lg:text-right' : ''}`}
                    >
                      {section.city}
                    </h2>
                    <p
                      className={`font-editorial text-xl leading-relaxed text-kimono-white/70 ${!isLeft ? 'lg:text-right' : ''}`}
                    >
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className={`flex flex-col gap-8 lg:col-span-8 ${!isLeft ? 'lg:order-1' : ''}`}>
                  {section.days.map((day) => (
                    <AnimatedCard
                      key={day.day}
                      className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-xl hover:-translate-y-1 hover:border-sakura-pink/30 hover:bg-white/[0.05]"
                    >
                      <div className="mb-6 flex items-center gap-6 border-b border-white/5 pb-6">
                        <span className="mt-1 font-display text-4xl tracking-widest text-sakura-pink">
                          DAY {day.day}
                        </span>
                        <h3 className="font-display text-3xl tracking-widest text-kimono-white">
                          {day.title}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-1 items-baseline gap-2 md:grid-cols-[120px_1fr] md:gap-8">
                          <span className="font-sans text-xs uppercase tracking-widest text-mountain-cream">
                            Morning
                          </span>
                          <p className="font-editorial text-lg leading-relaxed text-kimono-white/90">
                            {day.morning}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 items-baseline gap-2 md:grid-cols-[120px_1fr] md:gap-8">
                          <span className="font-sans text-xs uppercase tracking-widest text-mountain-cream">
                            Afternoon
                          </span>
                          <p className="font-editorial text-lg leading-relaxed text-kimono-white/90">
                            {day.afternoon}
                          </p>
                        </div>
                        {day.evening && (
                          <div className="grid grid-cols-1 items-baseline gap-2 md:grid-cols-[120px_1fr] md:gap-8">
                            <span className="font-sans text-xs uppercase tracking-widest text-mountain-cream">
                              Evening
                            </span>
                            <p className="font-editorial text-lg leading-relaxed text-kimono-white/90">
                              {day.evening}
                            </p>
                          </div>
                        )}
                        {day.note && (
                          <div className="mt-2 grid grid-cols-1 items-baseline gap-2 border-t border-white/5 pt-4 md:grid-cols-[120px_1fr] md:gap-8">
                            <span className="font-sans text-xs uppercase tracking-widest text-sakura-pink">
                              {day.note.startsWith('Transport') ? 'Transport' : 'Highlight'}
                            </span>
                            <p className="font-editorial text-lg italic leading-relaxed text-sakura-pink/90">
                              {day.note}
                            </p>
                          </div>
                        )}
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </main>

      <footer className="relative flex w-full flex-col items-center justify-center overflow-hidden border-t border-white/5 px-8 py-40 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sakura-pink opacity-[0.03] blur-[100px]" />

        <h2 className="z-10 mx-auto mb-8 max-w-4xl font-editorial text-4xl italic leading-tight text-kimono-white md:text-6xl">
          &ldquo;Ten days. Three cities. No compromise.&rdquo;
        </h2>

        <p className="z-10 mb-12 font-sans text-xs uppercase tracking-[0.2em] text-mountain-cream md:text-sm">
          Immerse yourself in the extraordinary. We handle the logistics; you experience the sublime.
        </p>

        <Link
          to="/#contacts"
          className="z-10 rounded-full bg-kimono-white px-12 py-5 font-sans text-sm font-semibold uppercase tracking-widest text-mist-black transition-all duration-500 ease-out hover:scale-105 hover:bg-sakura-pink hover:shadow-[0_0_40px_rgba(255,183,197,0.3)]"
        >
          Reserve Your Dossier
        </Link>
      </footer>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 transform rounded-full bg-sakura-pink px-6 py-4 font-sans text-xs font-bold uppercase tracking-wider text-mist-black shadow-[0_0_20px_rgba(255,183,197,0.2)] transition-all duration-500 ease-out hover:scale-105 hover:bg-kimono-white ${
          showFloatingButton
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-10 opacity-0'
        }`}
      >
        Book Now ↑
      </button>
    </div>
  )
}
