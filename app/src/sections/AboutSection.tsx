import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import LimeRevealText from '@/components/LimeRevealText'
import PhotoCluster from '@/components/PhotoCluster'

const timelineData = [
  {
    days: 'Days 1\u20133',
    city: 'Osaka',
    images: ['/images/osaka-castle.png', '/images/osaka-skyline.png'] as [string, string],
    alt: 'Osaka',
  },
  {
    days: 'Days 4\u20136',
    city: 'Kyoto',
    images: ['/images/kyoto-pagoda.png', '/images/kyoto-shrine.png'] as [string, string],
    alt: 'Kyoto',
  },
  {
    days: 'Days 7\u201310',
    city: 'Tokyo',
    images: ['/images/tokyo-shibuya.png', '/images/tokyo-street.png'] as [string, string],
    alt: 'Tokyo',
  },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-mist-black"
      style={{ padding: 'clamp(80px, 12vh, 160px) 0' }}
    >
      {/* Section Heading with hairline rules */}
      <div className="mb-20 flex items-center gap-6 px-4 md:px-10">
        <div className="hairline flex-1" />
        <h2 className="font-display text-[clamp(36px,6vw,80px)] leading-tight tracking-[0.04em] text-kimono-white">
          ABOUT THE TOUR
        </h2>
        <div className="hairline flex-1" />
      </div>

      {/* Two-column layout */}
      <div className="mx-auto grid max-w-[1280px] gap-16 px-6 md:grid-cols-2 md:gap-20 md:px-10">
        {/* Left Column - Text */}
        <div className="flex flex-col justify-center gap-8">
          <p className="font-editorial text-[clamp(16px,2vw,22px)] leading-relaxed text-white/85">
            We&apos;ve planned a simple and convenient 10-day itinerary for your trip to Japan. You&apos;ll visit three cities:{' '}
            <LimeRevealText>Osaka, Kyoto, and Tokyo</LimeRevealText>.
          </p>
          <p className="font-editorial text-[clamp(16px,2vw,22px)] leading-relaxed text-white/85">
            No need to worry about routes, schedules, or finding places &mdash; everything is already organized. We&apos;ll show you where to go, what to see, and where to eat, so you can simply{' '}
            <LimeRevealText>enjoy the journey</LimeRevealText>.
          </p>
        </div>

        {/* Right Column - Timeline */}
        <div className="relative flex justify-center">
          {/* Vertical hairline */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/20" />

          {/* Timeline nodes */}
          <div className="flex flex-col gap-16 py-4">
            {timelineData.map((item, i) => (
              <TimelineNode
                key={item.city}
                item={item}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface TimelineNodeProps {
  item: (typeof timelineData)[number]
  index: number
}

function TimelineNode({ item, index }: TimelineNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(nodeRef, { amount: 0.3, once: true })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={nodeRef}
      className="relative flex items-start gap-6"
      data-timeline-city={item.city}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: shouldReduceMotion ? 0 : index * 0.2,
      }}
      style={{ willChange: shouldReduceMotion ? 'auto' : 'transform, opacity' }}
    >
      {/* Dot on the line */}
      <div className="absolute left-1/2 top-2 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-sakura-pink shadow-[0_0_12px_rgba(255,183,197,0.3)]" />

      {/* Content - positioned alternating or consistently */}
      <div className="ml-8 flex flex-col gap-3 md:ml-12">
        <div>
          <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-mouse-gray">
            {item.days}
          </span>
          <span className="font-display text-[28px] leading-tight text-kimono-white">
            {item.city}
          </span>
        </div>
        <PhotoCluster images={item.images} alt={item.alt} />
      </div>
    </motion.div>
  )
}
