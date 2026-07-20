import { createContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

export const LenisContext = createContext(null)

const LenisProvider = ({ children }) => {
  const rafRef = useRef(null)
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    const raf = (time) => {
      instance.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)
    setLenis(instance)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export default LenisProvider
