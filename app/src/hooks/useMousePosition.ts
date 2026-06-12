import { useCallback, useEffect, useRef, useState } from 'react'

const HOVER_TARGET_SELECTOR = 'a, button, input, textarea, select, [role="button"], [data-cursor-expand]'

interface CursorState {
  isMobile: boolean
  isReady: boolean
}

/**
 * High-performance mouse tracking hook.
 * Instead of calling setState every frame (~60 re-renders/sec),
 * this hook directly mutates the cursor DOM element via a ref callback.
 * React only re-renders for mobile/ready state changes (rare).
 */
export function useMousePosition(lerp = 0.15) {
  const [state, setState] = useState<CursorState>({
    isMobile: true,
    isReady: false,
  })

  // Ref to the cursor DOM element — set via the returned callback ref
  const cursorRef = useRef<HTMLDivElement | null>(null)

  // Track hover state in a ref to avoid re-renders
  const isHoveringRef = useRef(false)

  const setCursorRef = useCallback((node: HTMLDivElement | null) => {
    cursorRef.current = node
  }, [])

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { ...target }
    let isMobile = mobileQuery.matches
    let isReady = false
    let prevIsHovering = false
    let frameId = 0

    // Set initial mobile state
    setState({ isMobile, isReady: false })

    const updateHoverState = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target : null
      isHoveringRef.current = Boolean(element?.closest(HOVER_TARGET_SELECTOR))
    }

    const handleMouseMove = (event: MouseEvent) => {
      target.x = event.clientX
      target.y = event.clientY
      if (!isReady) {
        isReady = true
        setState(prev => ({ ...prev, isReady: true }))
      }
      updateHoverState(event)
    }

    const handleMobileChange = () => {
      isMobile = mobileQuery.matches
      setState(prev => ({ ...prev, isMobile }))
    }

    const animate = () => {
      const el = cursorRef.current
      if (el) {
        const alpha = reducedMotionQuery.matches ? 1 : lerp
        current.x += (target.x - current.x) * alpha
        current.y += (target.y - current.y) * alpha

        const hovering = isHoveringRef.current
        const size = hovering ? 32 : 8

        // Direct DOM mutation — no React re-render
        el.style.transform = `translate3d(${current.x - size / 2}px, ${current.y - size / 2}px, 0)`
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.style.backgroundColor = hovering ? 'transparent' : '#ffffff'
        el.style.borderWidth = hovering ? '1px' : '0px'
        el.style.borderStyle = 'solid'
        el.style.borderColor = hovering ? '#ffffff' : 'transparent'
        el.style.opacity = isReady ? '1' : '0'

        // Only update border transition when hover state changes
        if (hovering !== prevIsHovering) {
          prevIsHovering = hovering
        }
      }

      frameId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', updateHoverState, { passive: true })
    mobileQuery.addEventListener('change', handleMobileChange)
    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', updateHoverState)
      mobileQuery.removeEventListener('change', handleMobileChange)
    }
  }, [lerp])

  return { ...state, setCursorRef }
}
