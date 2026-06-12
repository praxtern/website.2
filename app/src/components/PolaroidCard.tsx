import { useEffect, useRef } from 'react'

interface PolaroidCardProps {
  image: string
  caption: string
}

export default function PolaroidCard({ image, caption }: PolaroidCardProps) {
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    // Defer non-critical polaroid image loads to idle time to improve LCP
    const el = imgRef.current
    if (!el) return

    const load = () => {
      el.src = image
      el.fetchPriority = 'low'
    }

    if ('requestIdleCallback' in window) {
      // @ts-ignore
      const id = (window as any).requestIdleCallback(load, { timeout: 500 })
      return () => (window as any).cancelIdleCallback(id)
    }

    const t = (window as any).setTimeout(load, 250)
    return () => (window as any).clearTimeout(t)
  }, [image])

  return (
    <div
      className="group relative w-[140px] flex-shrink-0 overflow-hidden rounded-lg border border-white/5 bg-mist-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,184,197,0.2)]"
      style={{ aspectRatio: '3/4', willChange: 'transform' }}
      data-cursor-expand
      data-polaroid-card={caption}
    >
      <div className="relative h-[75%] overflow-hidden">
        <img
          ref={imgRef}
          // src intentionally set by effect to defer loading
          src=""
          data-src={image}
          alt={caption}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-opacity duration-500 opacity-100"
        />
      </div>
      <div className="flex h-[25%] items-center px-2.5 pb-1">
        <span className="font-sans text-[11px] leading-tight text-mouse-gray">
          {caption}
        </span>
      </div>
    </div>
  )
}
