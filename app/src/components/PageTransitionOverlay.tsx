type PageTransitionOverlayProps = {
  visible: boolean
}

export default function PageTransitionOverlay({ visible }: PageTransitionOverlayProps) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-mist-black/90 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-center text-sm uppercase tracking-[0.3em] text-kimono-white shadow-[0_0_40px_rgba(255,183,197,0.12)] backdrop-blur-xl">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-sakura-pink animate-pulse" />
        Preparing your itinerary
      </div>
    </div>
  )
}
