import { useEffect, useRef, useState } from 'react'

interface LimeRevealTextProps {
  children: React.ReactNode
}

export default function LimeRevealText({ children }: LimeRevealTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      className="text-sakura-pink transition-opacity duration-1000 ease-out"
      style={{
        opacity: visible ? 1 : 0.2,
      }}
    >
      {children}
    </span>
  )
}
