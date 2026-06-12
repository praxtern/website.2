import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import PolaroidCard from '@/components/PolaroidCard'
import type { LenisRef } from '@/hooks/useLenis'

const polaroidData = [
  { image: '/images/kyoto-pagoda.png', caption: '3 cities in Japan' },
  { image: '/images/rice-terraces.png', caption: '10 days' },
  { image: '/images/fushimi-inari.png', caption: 'gigabytes of photos' },
  { image: '/images/ramen-shop.png', caption: 'eat ramen' },
  { image: '/images/shinjuku-alley.png', caption: 'enjoy the vibe' },
]

interface HeroSectionProps {
  lenisRef: LenisRef
}

export default function HeroSection({ lenisRef }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [viewportHeight, setViewportHeight] = useState(800)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  useEffect(() => {
    const updateViewportHeight = () => setViewportHeight(window.innerHeight)

    updateViewportHeight()
    window.addEventListener('resize', updateViewportHeight)

    return () => window.removeEventListener('resize', updateViewportHeight)
  }, [])

  const mountainY = useTransform(scrollYProgress, [0, 1], [0, -viewportHeight * 0.3])
  const japanY = useTransform(scrollYProgress, [0, 1], [0, -viewportHeight * 0.5])
  const polaroidX = useTransform(scrollYProgress, [0, 1], [0, -viewportHeight * 0.4])

  // Solidifying effect: text fill fades in from transparent to semi-opaque as user scrolls
  const japanFillOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 0.55])
  const japanTextColor = useMotionTemplate`rgba(250, 250, 250, ${japanFillOpacity})`

  const parallaxMountainY = shouldReduceMotion ? 0 : mountainY
  const parallaxJapanY = shouldReduceMotion ? 0 : japanY
  const parallaxPolaroidX = shouldReduceMotion ? 0 : polaroidX

  const scrollToContacts = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#contacts', { duration: 1.2 })
      return
    }

    document.querySelector('#contacts')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Plane - full landscape and sky */}
      <motion.div
        className="absolute inset-0 z-0 h-[130%] w-full"
        style={{ y: parallaxMountainY, willChange: 'transform' }}
        data-hero-plane="mountains-background"
      >
        <img
          src="/images/hero-mountains.jpg"
          alt="Misty Japanese mountains at dawn"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        {/* Subtle warm overlay for color grading */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(245,232,211,0.08) 0%, transparent 30%, rgba(10,10,10,0.4) 100%)',
          }}
        />
      </motion.div>

      {/* Typography Plane - sits behind the mountain ridge, shifted left for readability */}
      <motion.div
        className="absolute left-0 right-0 top-[32%] z-10 flex -translate-y-1/2 justify-center pl-4 pr-[400px] md:pr-[600px]"
        style={{ y: parallaxJapanY, willChange: 'transform' }}
        data-hero-plane="japan-type"
      >
        <motion.h1
          className="font-display whitespace-nowrap text-[clamp(80px,18vw,280px)] leading-[0.85] tracking-[0.02em]"
          style={{
            WebkitTextStroke: '2px rgba(250, 250, 250, 0.85)',
            color: shouldReduceMotion ? 'rgba(250, 250, 250, 0.4)' : japanTextColor,
            textShadow: '0 0 60px rgba(255, 183, 197, 0.12)',
          }}
        >
          JAPAN
        </motion.h1>
      </motion.div>

      {/* Mountain Foreground Plane - clipped sky reveals the type above the peaks */}
      <motion.div
        className="absolute inset-0 z-20 h-[130%] w-full"
        style={{
          y: parallaxMountainY,
          clipPath: 'polygon(0 42%, 5% 40%, 12% 43%, 20% 41%, 28% 44%, 35% 42%, 42% 39%, 50% 37%, 58% 35%, 65% 33%, 72% 36%, 78% 38%, 85% 35%, 92% 37%, 100% 40%, 100% 100%, 0 100%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
        data-hero-plane="mountains-foreground"
      >
        <img
          src="/images/hero-mountains.jpg"
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(245,232,211,0.08) 0%, transparent 30%, rgba(10,10,10,0.4) 100%)',
          }}
        />
      </motion.div>

      {/* Foreground Plane - Kimono Figure */}
      <div className="absolute bottom-0 right-0 z-40 hidden h-[75vh] md:block">
        <img
          src="/images/hero-kimono-figure.png"
          alt="Woman in floral kimono overlooking the valley"
          className="h-full w-auto object-contain object-right-bottom"
          style={{ filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.3))' }}
        />
      </div>

      {/* Polaroid Card Strip */}
      <motion.div
        className="absolute bottom-10 left-6 z-30 flex gap-4 md:bottom-10 md:left-10"
        style={{ x: parallaxPolaroidX, willChange: 'transform' }}
        data-hero-plane="polaroids"
      >
        {polaroidData.map((card) => (
          <PolaroidCard key={card.caption} image={card.image} caption={card.caption} />
        ))}
      </motion.div>

      {/* Floating Book Button */}
      <button
        onClick={scrollToContacts}
        className="absolute bottom-[15%] right-[25%] z-50 hidden rounded-full px-12 py-4 font-sans text-sm font-medium uppercase tracking-[0.12em] text-mist-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 md:block"
        style={{
          background: 'rgba(245, 232, 211, 0.9)',
          backdropFilter: 'blur(8px)',
        }}
        data-cursor-expand
      >
        Book
      </button>
    </section>
  )
}
