import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// Renders a soft radial oxblood glow that follows the cursor.
// Only active on non-touch devices. Positioned absolutely; parent must be relative.
const CursorSpotlight = ({ className, color = 'rgba(156, 38, 38, 0.28)', size = 480 }) => {
  const ref = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isTouch =
      'ontouchstart' in window ||
      (navigator && navigator.maxTouchPoints > 0)
    if (isTouch) return
    setEnabled(true)

    const onMove = (e) => {
      if (!ref.current) return
      const rect = ref.current.parentElement.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      ref.current.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`
    }

    const parent = ref.current?.parentElement
    if (parent) parent.addEventListener('mousemove', onMove)
    return () => {
      if (parent) parent.removeEventListener('mousemove', onMove)
    }
  }, [size])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        'pointer-events-none absolute top-0 left-0 rounded-full transition-transform duration-100 ease-out',
        className
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(closest-side, ${color}, transparent 70%)`,
        mixBlendMode: 'screen',
        willChange: 'transform',
      }}
    />
  )
}

export default CursorSpotlight
