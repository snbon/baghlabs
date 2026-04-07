import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

export function CreativeHero({ title, year, category, image, video, className }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div ref={ref} className={cn('relative h-screen overflow-hidden', className)}>
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {video ? (
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content overlay */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 lg:px-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          {(year || category) && (
            <p className="text-white/70 text-sm uppercase tracking-widest mb-4 font-medium">
              {year}{year && category ? ' · ' : ''}{category}
            </p>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {title}
          </h1>
        </motion.div>
      </motion.div>
    </div>
  )
}
