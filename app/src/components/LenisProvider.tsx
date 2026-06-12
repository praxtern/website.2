import Lenis from '@studio-freight/lenis'
import {
  useEffect,
  useRef,
  type PropsWithChildren,
} from 'react'
import { LenisContext, type LenisController } from '@/hooks/useLenis'

export function LenisProvider({ children }: PropsWithChildren) {
  const lenisRef = useRef<LenisController | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenisOptions = {
      duration: prefersReducedMotion ? 0.01 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: !prefersReducedMotion,
      smoothTouch: false,
    } as ConstructorParameters<typeof Lenis>[0] & { smooth: boolean; smoothTouch: boolean }

    const lenis = new Lenis(lenisOptions)
    let frameId = 0

    lenisRef.current = lenis as LenisController

    const raf = (time: number) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }

    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  )
}
