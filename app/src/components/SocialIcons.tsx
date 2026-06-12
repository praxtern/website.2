import { Instagram, Facebook, Send } from 'lucide-react'

interface SocialIconsProps {
  layout?: 'vertical' | 'horizontal'
  className?: string
}

export default function SocialIcons({ layout = 'horizontal', className = '' }: SocialIconsProps) {
  const icons = [
    { Icon: Instagram, label: 'Instagram' },
    { Icon: Facebook, label: 'Facebook' },
    { Icon: Send, label: 'Telegram' },
  ]

  return (
    <div
      className={`flex ${layout === 'vertical' ? 'flex-col gap-4' : 'flex-row gap-4'} ${className}`}
    >
      {icons.map(({ Icon, label }) => (
        <a
          key={label}
          href="#"
          aria-label={label}
          className="text-white/40 transition-colors duration-300 hover:text-kimono-white"
          data-cursor-expand
        >
          <Icon size={18} strokeWidth={1.5} />
        </a>
      ))}
    </div>
  )
}
