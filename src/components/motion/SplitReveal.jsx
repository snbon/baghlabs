import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// Splits `children` (a string) into words and staggers a mask reveal.
// `once`: only trigger once (default true).
// `delay`: initial delay in ms.
// `stagger`: delay between words in ms.
// `trigger`: 'load' | 'view', start immediately or on IntersectionObserver.
const SplitReveal = ({
  children,
  className,
  as: Tag = 'span',
  once = true,
  delay = 0,
  stagger = 60,
  trigger = 'view',
}) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(trigger === 'load')

  useEffect(() => {
    if (trigger === 'load') {
      const t = setTimeout(() => setVisible(true), delay)
      return () => clearTimeout(t)
    }
    if (!ref.current || visible) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay)
            if (once) io.disconnect()
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold: 0.15 }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [delay, once, trigger, visible])

  const text = typeof children === 'string' ? children : ''
  const words = text.split(/(\s+)/)

  return (
    <Tag ref={ref} className={cn('inline', className)}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return <span key={i}>{w}</span>
        return (
          <span key={i} className={cn('split-word', visible && 'split-in')}>
            <span style={{ transitionDelay: `${i * stagger}ms` }}>{w}</span>
          </span>
        )
      })}
    </Tag>
  )
}

export default SplitReveal
