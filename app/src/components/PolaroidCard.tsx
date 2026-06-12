import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface PolaroidCardProps {
  image: string
  caption: string
}

export default function PolaroidCard({ image, caption }: PolaroidCardProps) {
  const [loaded, setLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const hoverState = {
    y: shouldReduceMotion ? 0 : -8,
    scale: shouldReduceMotion ? 1 : 1.02,
    boxShadow: '0 20px 40px rgba(255, 184, 197, 0.2)',
  }

  return (
    <motion.div
      className="group relative w-[140px] flex-shrink-0 overflow-hidden rounded-lg border border-white/5 bg-mist-black"
      style={{
        aspectRatio: '3/4',
        willChange: 'transform, box-shadow',
      }}
      animate={isHovered ? hoverState : { y: 0, scale: 1, boxShadow: '0 0 0 rgba(255, 184, 197, 0)' }}
      whileHover={hoverState}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      data-cursor-expand
      data-polaroid-card={caption}
    >
      <div className="relative h-[75%] overflow-hidden">
        <img
          src={image}
          alt={caption}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <div className="flex h-[25%] items-center px-2.5 pb-1">
        <span className="font-sans text-[11px] leading-tight text-mouse-gray">
          {caption}
        </span>
      </div>
    </motion.div>
  )
}
