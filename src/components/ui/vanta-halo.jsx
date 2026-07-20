import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

const VantaHalo = ({ className }) => {
  const ref = useRef(null)

  useEffect(() => {
    let mounted = true
    let vantaEffect = null

    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    ;(async () => {
      try {
        const [{ default: HALO }, THREE] = await Promise.all([
          import('vanta/dist/vanta.halo.min'),
          import('three'),
        ])
        if (!mounted || !ref.current) return

        vantaEffect = HALO({
          el: ref.current,
          THREE,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          baseColor: 0x2a1010,
          backgroundColor: 0x0c0a08,
          amplitudeFactor: 1.6,
          xOffset: -0.15,
          yOffset: 0.05,
          size: 1.5,
        })
      } catch (e) {
        console.error('Vanta halo failed to init', e)
      }
    })()

    return () => {
      mounted = false
      if (vantaEffect && typeof vantaEffect.destroy === 'function') {
        vantaEffect.destroy()
      }
    }
  }, [])

  return <div ref={ref} className={cn('absolute inset-0', className)} aria-hidden />
}

export default VantaHalo
