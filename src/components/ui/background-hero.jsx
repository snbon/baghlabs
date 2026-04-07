import { useScroll, useTransform, motion } from 'framer-motion'

/**
 * Hero background: soft yellow radial glow + subtle noise dots.
 * Fades out and drifts upward as the user scrolls (parallax depth).
 * Place as a direct child of the hero container (which must be `relative`).
 */
const BackgroundHero = () => {
  const { scrollY } = useScroll()

  // Entire background fades out
  const opacity = useTransform(scrollY, [0, 600], [1, 0])
  // Dots drift upward at 10% scroll speed , subtle parallax depth
  const dotsY = useTransform(scrollY, [0, 1000], [0, -80])
  // Glow drifts upward faster , stronger parallax depth
  const glowY = useTransform(scrollY, [0, 1000], [0, -200])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-white" />

      {/* Noise dots , parallax layer 1 */}
      <motion.div
        style={{ opacity, y: dotsY }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.07) 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
      </motion.div>

      {/* Yellow glow , parallax layer 2 (drifts faster for depth) */}
      <motion.div
        style={{ opacity, y: glowY }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 40%, #FFF991 0%, transparent 65%)',
            opacity: 0.3,
            mixBlendMode: 'multiply',
          }}
        />
      </motion.div>
    </div>
  )
}

export default BackgroundHero
