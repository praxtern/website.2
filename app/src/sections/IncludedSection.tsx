import { Compass, Plane, Bus, Hotel } from 'lucide-react'
import GlassCard from '@/components/GlassCard'

const includedData = [
  {
    icon: Compass,
    title: 'Guides',
    description: '2 awesome guides who know everything about Japan!',
  },
  {
    icon: Plane,
    title: 'Flights',
    description: 'Routes: Moscow \u2014 Osaka, Tokyo \u2014 Moscow',
  },
  {
    icon: Bus,
    title: 'Transfers',
    description: 'From the airport to the hotels',
  },
  {
    icon: Hotel,
    title: 'Hotels',
    description: 'Comfortable accommodation, 2 people per room (breakfasts included)',
  },
]

export default function IncludedSection() {
  return (
    <section
      id="included"
      className="relative bg-mist-black"
      style={{ padding: 'clamp(80px, 12vh, 160px) 0' }}
    >
      {/* Section Heading with right hairline */}
      <div className="mb-16 flex items-center gap-6 px-6 md:px-10">
        <h2 className="font-display text-[clamp(36px,6vw,80px)] leading-tight tracking-[0.04em] text-kimono-white">
          WHAT&apos;S INCLUDED
        </h2>
        <div className="hairline flex-1" />
      </div>

      {/* Bento Grid */}
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4 md:px-10">
        {includedData.map((item) => (
          <GlassCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  )
}
