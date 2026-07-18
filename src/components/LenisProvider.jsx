import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { LenisContext } from '@/lib/useLenis'

const LenisProvider = ({ children }) => {
  const [instance, setInstance] = useState(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    })

    setInstance(lenis)

    const raf = (time) => {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lenis.destroy()
      setInstance(null)
    }
  }, [])

  return <LenisContext.Provider value={instance}>{children}</LenisContext.Provider>
}

export default LenisProvider
