import { Globe } from 'lucide-react'
import SocialIcons from '@/components/SocialIcons'

const footerLinks = [
  { label: 'Home', target: '#hero' },
  { label: 'About', target: '#about' },
  { label: 'Included', target: '#included' },
  { label: 'Contacts', target: '#contacts' },
]

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="border-t border-white/[0.08] bg-mist-black px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 md:flex-row md:justify-between">
        {/* Wordmark */}
        <div className="flex flex-1 justify-start">
          <button
            onClick={() => scrollTo('#hero')}
            className="flex items-center gap-2"
            data-cursor-expand
          >
            <Globe size={16} strokeWidth={1.5} className="text-kimono-white" />
            <span className="text-small-caps text-kimono-white">JAPAN TOURS</span>
          </button>
        </div>

        {/* Footer Nav */}
        <nav className="flex flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {footerLinks.map((link, i) => (
            <span key={link.label} className="flex items-center gap-3">
              {i > 0 && <span className="text-mouse-gray">&middot;</span>}
              <button
                onClick={() => scrollTo(link.target)}
                className="font-sans text-xs tracking-[0.1em] text-mouse-gray transition-colors duration-300 hover:text-kimono-white"
                data-cursor-expand
              >
                {link.label}
              </button>
            </span>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex flex-1 justify-end">
          <SocialIcons layout="horizontal" />
        </div>
      </div>
    </footer>
  )
}
