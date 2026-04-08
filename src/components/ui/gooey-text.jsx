import * as React from 'react'
import { cn } from '@/lib/utils'

export function GooeyText({ texts, morphTime = 1, cooldownTime = 0.25, className, textClassName }) {
  const text1Ref = React.useRef(null)
  const text2Ref = React.useRef(null)
  const blur1Ref = React.useRef(null)
  const blur2Ref = React.useRef(null)
  const id = React.useRef(`gooey-${Math.random().toString(36).slice(2)}`).current

  React.useEffect(() => {
    let textIndex = texts.length - 1
    let time = new Date()
    let morph = 0
    let cooldown = cooldownTime
    let animFrameId

    const setMorph = (fraction) => {
      if (!text1Ref.current || !text2Ref.current || !blur1Ref.current || !blur2Ref.current) return

      // text2 enters: starts heavily blurred/invisible → clears
      blur2Ref.current.setAttribute('stdDeviation', Math.min(8 / fraction - 8, 100))
      text2Ref.current.style.opacity = Math.pow(fraction, 0.4)

      // text1 exits: starts clear/visible → blurs out
      const fInv = 1 - fraction
      blur1Ref.current.setAttribute('stdDeviation', Math.min(8 / fInv - 8, 100))
      text1Ref.current.style.opacity = Math.pow(fInv, 0.4)
    }

    const doCooldown = () => {
      morph = 0
      if (!text1Ref.current || !text2Ref.current || !blur1Ref.current || !blur2Ref.current) return
      blur1Ref.current.setAttribute('stdDeviation', 0)
      blur2Ref.current.setAttribute('stdDeviation', 0)
      text1Ref.current.style.opacity = '0'
      text2Ref.current.style.opacity = '1'
    }

    const doMorph = () => {
      morph -= cooldown
      cooldown = 0
      let fraction = morph / morphTime
      if (fraction > 1) { cooldown = cooldownTime; fraction = 1 }
      setMorph(fraction)
    }

    const animate = () => {
      animFrameId = requestAnimationFrame(animate)
      const newTime = new Date()
      const shouldIncrementIndex = cooldown > 0
      const dt = (newTime.getTime() - time.getTime()) / 1000
      time = newTime
      cooldown -= dt
      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length]
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length]
          }
        }
        doMorph()
      } else {
        doCooldown()
      }
    }

    if (text1Ref.current) text1Ref.current.textContent = texts[texts.length - 1]
    if (text2Ref.current) text2Ref.current.textContent = texts[0]
    animate()
    return () => cancelAnimationFrame(animFrameId)
  }, [texts, morphTime, cooldownTime])

  return (
    <div className={cn('relative', className)}>
      {/*
        Text lives inside the SVG so the feColorMatrix threshold filter applies
        to native SVG elements , this works on iOS Safari, unlike CSS filter: url(#id)
        on HTML elements which Safari has never supported reliably.
      */}
      <svg className="w-full h-full" style={{ overflow: 'visible' }} aria-hidden="true">
        <defs>
          <filter id={`${id}-threshold`} x="-50%" y="-50%" width="200%" height="200%">
            <feColorMatrix in="SourceGraphic" type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
          </filter>
          <filter id={`${id}-blur1`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur ref={blur1Ref} in="SourceGraphic" stdDeviation="0" />
          </filter>
          <filter id={`${id}-blur2`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur ref={blur2Ref} in="SourceGraphic" stdDeviation="0" />
          </filter>
        </defs>
        <g filter={`url(#${id}-threshold)`}>
          <text
            ref={text1Ref}
            x="50%" y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            filter={`url(#${id}-blur1)`}
            fill="currentColor"
            className={cn('select-none', textClassName)}
            style={{ opacity: 0 }}
          />
          <text
            ref={text2Ref}
            x="50%" y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            filter={`url(#${id}-blur2)`}
            fill="currentColor"
            className={cn('select-none', textClassName)}
            style={{ opacity: 1 }}
          />
        </g>
      </svg>
    </div>
  )
}
