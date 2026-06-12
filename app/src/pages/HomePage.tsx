import { Suspense, lazy } from 'react'
import { useLenis } from '@/hooks/useLenis'
import Navigation from '@/sections/Navigation'
import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'

const IncludedSection = lazy(() => import('@/sections/IncludedSection'))
const ContactSection = lazy(() => import('@/sections/ContactSection'))
const Footer = lazy(() => import('@/sections/Footer'))

export default function HomePage({ onNavigateItinerary }: { onNavigateItinerary?: () => void }) {
  const lenisRef = useLenis()

  return (
    <div className="relative">
      <Navigation lenisRef={lenisRef} />
      <main>
        <HeroSection lenisRef={lenisRef} />
        <AboutSection onNavigateItinerary={onNavigateItinerary} />
        <Suspense fallback={null}>
          <IncludedSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}
