import { useEffect, useRef, useState } from 'react'
import { Globe } from 'lucide-react'
import SocialIcons from '@/components/SocialIcons'
import type { LenisRef } from '@/hooks/useLenis'

interface NavigationProps {
  lenisRef: LenisRef
}

export default function Navigation({ lenisRef }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const scrollFrame = useRef<number | null>(null)
  const scrolledRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollFrame.current !== null) return

      scrollFrame.current = requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > window.innerHeight * 0.8
        if (nextScrolled !== scrolledRef.current) {
          scrolledRef.current = nextScrolled
          setScrolled(nextScrolled)
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

  const scrollTo = (id: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(id, { duration: 1.2 })
      return
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks = [
    { label: 'About', target: '#about' },
    { label: 'Included', target: '#included' },
    { label: 'Contacts', target: '#contacts' },
  ]

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-all duration-300 md:px-10 ${
          scrolled ? 'bg-mist-black/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        {/* Wordmark */}
        <button
          onClick={() => scrollTo('#hero')}
          className="flex items-center gap-2"
          data-cursor-expand
        >
          <Globe size={16} strokeWidth={1.5} className="text-kimono-white" />
          <span className="text-small-caps text-kimono-white">JAPAN TOURS</span>
        </button>

        {/* Center Nav Links - hidden on mobile */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ label, target }) => (
            <button
              key={label}
              onClick={() => scrollTo(target)}
              className="nav-link text-small-caps text-kimono-white/80 transition-colors duration-300 hover:text-kimono-white"
              data-cursor-expand
            >
              {label}
            </button>
          ))}
        </div>

        {/* Book Button */}
        <button
          onClick={() => scrollTo('#contacts')}
          className="rounded-full border border-white/30 px-6 py-2 text-small-caps text-kimono-white transition-all duration-300 hover:border-white/70 hover:bg-white/[0.08]"
          data-cursor-expand
        >
          Book
        </button>
      </nav>

      {/* Social Icons - fixed right edge */}
      <div className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
        <SocialIcons layout="vertical" />
      </div>
    </>
  )
}
