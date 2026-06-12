import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const observers = new Map<string, IntersectionObserver>()
const callbackMap = new WeakMap<Element, (entry: IntersectionObserverEntry) => void>()

const getKey = (options: IntersectionObserverInit) =>
  JSON.stringify({
    root: options.root ? 'custom-root' : 'viewport',
    rootMargin: options.rootMargin ?? '0px',
    threshold: Array.isArray(options.threshold)
      ? options.threshold.join(',')
      : options.threshold ?? 0,
  })

const getObserver = (options: IntersectionObserverInit) => {
  const key = getKey(options)
  let observer = observers.get(key)

  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const callback = callbackMap.get(entry.target)
        if (callback) {
          callback(entry)
        }
      }
    }, options)

    observers.set(key, observer)
  }

  return observer
}

export function useIntersectionObserver<T extends Element = Element>(options: IntersectionObserverInit = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const elementRef = useRef<T | null>(null)

  const ref = useCallback((node: T | null) => {
    elementRef.current = node
  }, [])

  const { root, rootMargin, threshold } = options

  const optionsMemo = useMemo(
    () => ({ root, rootMargin, threshold }),
    [root, rootMargin, threshold]
  )

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = getObserver(optionsMemo)
    const callback = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        observer.unobserve(entry.target)
        callbackMap.delete(entry.target)
      }
    }

    callbackMap.set(element, callback)
    observer.observe(element)

    return () => {
      callbackMap.delete(element)
      observer.unobserve(element)
    }
  }, [optionsMemo])

  return [ref, isIntersecting] as const
}
