import { useLenis } from '@/hooks/useLenis'
import Navigation from '@/sections/Navigation'
import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import IncludedSection from '@/sections/IncludedSection'
import ContactSection from '@/sections/ContactSection'
import Footer from '@/sections/Footer'

export default function App() {
  const lenisRef = useLenis()

  return (
    <div className="relative">
      <Navigation lenisRef={lenisRef} />
      <main>
        <HeroSection lenisRef={lenisRef} />
        <AboutSection />
        <IncludedSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
