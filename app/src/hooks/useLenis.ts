import { createContext, useContext, type RefObject } from 'react'

type LenisTarget = string | number | HTMLElement

export interface LenisController {
  scrollTo: (target: LenisTarget, options?: Record<string, unknown>) => void
}

export type LenisRef = RefObject<LenisController | null>

export const LenisContext = createContext<LenisRef | null>(null)

export function useLenis() {
  const lenisRef = useContext(LenisContext)

  if (!lenisRef) {
    throw new Error('useLenis must be used inside LenisProvider')
  }

  return lenisRef
}
