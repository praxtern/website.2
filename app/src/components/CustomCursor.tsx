import { useMousePosition } from '@/hooks/useMousePosition'

export default function CustomCursor() {
  // Increase lerp slightly for snappier cursor following while keeping smoothing
  const { isMobile, isReady, setCursorRef } = useMousePosition(0.28)

  if (isMobile) {
    return null
  }

  return (
    <div
      ref={setCursorRef}
      aria-hidden="true"
      data-custom-cursor
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full mix-blend-difference transition-[width,height,border,background-color,opacity] duration-120 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        width: 8,
        height: 8,
        backgroundColor: '#ffffff',
        border: '0 solid transparent',
        opacity: isReady ? 1 : 0,
        willChange: 'transform, width, height',
      }}
    />
  )
}
