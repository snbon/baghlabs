import { useScroll, useTransform, motion } from 'framer-motion'

/**
 * Page background: fine grid lines (linear fade-in/out mask) + a subtle
 * floating color accent that drifts with parallax for premium depth.
 * ONE instance inside a tall `relative overflow-hidden` wrapper.
 */
const BackgroundPage = () => {
  const { scrollY } = useScroll()
  // Accent drifts upward at ~10% scroll speed
  const accentY = useTransform(scrollY, [0, 3000], [0, -180])

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      {/* White base */}
      <div className="absolute inset-0 bg-white" />

      {/* Grid, static, masked to fade-in at top, fade-out at bottom */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 32px',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 12%, black 85%, transparent 100%)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 12%, black 85%, transparent 100%)',
        }}
      />

      {/* Floating accent, parallax, gives depth without being distracting */}
      <motion.div
        style={{ y: accentY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 35% at 75% 45%, rgba(120,119,198,0.07), transparent)',
          }}
        />
      </motion.div>
    </div>
  )
}

export default BackgroundPage
