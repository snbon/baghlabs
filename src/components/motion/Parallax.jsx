import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

// Wraps children with a scroll-driven Y translation.
// `strength` = pixels of total travel across the ref's scroll range.
const Parallax = ({ children, strength = 60, className, as = 'div' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength])

  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </MotionTag>
  )
}

export default Parallax
