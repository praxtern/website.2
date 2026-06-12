import type { LucideIcon } from 'lucide-react'

interface GlassCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function GlassCard({ icon: Icon, title, description }: GlassCardProps) {
  return (
    <div
      className="group glass-card p-8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-sakura-pink/40 hover:shadow-card-glow"
      data-cursor-expand
    >
      <div className="mb-2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
        <Icon
          size={28}
          strokeWidth={1.5}
          className="text-sakura-pink"
        />
      </div>
      <h3 className="mb-3 text-small-caps text-kimono-white">
        {title}
      </h3>
      <p className="font-sans text-sm leading-relaxed text-white/70">
        {description}
      </p>
    </div>
  )
}
