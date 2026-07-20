import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'

const ROMAN = ['I', 'II', 'III']

const ProcessStages = () => {
  const { t } = useTranslation('home')
  const stages = t('process.stages', { returnObjects: true })
  const N = stages.length

  const wrapperRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  const [uiIdx, setUiIdx] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const clamped = Math.min(0.9999, Math.max(0, p))
    const total = clamped * N
    // Midpoint swap so the visible stage lands centered in its slot.
    const idx = Math.min(N - 1, Math.max(0, Math.floor(total + 0.5)))
    setUiIdx(idx)
  })

  const stage = stages[uiIdx]
  const barWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="process"
      ref={wrapperRef}
      className="relative bg-noir text-paper border-t border-paper/10"
      style={{ height: `${N * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Top row */}
        <div className="container-wide pt-24 pb-6 border-b border-paper/10 flex items-baseline justify-between z-10">
          <div className="flex items-baseline gap-8">
            <span className="chapter">{t('chapters.process')}</span>
            <span className="smallcaps text-paper/50">
              {String(uiIdx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
            </span>
          </div>
          <span className="smallcaps text-paper/40 hidden md:inline">{t('labels.threePhases')}</span>
        </div>

        {/* Stage layer */}
        <div className="flex-1 relative overflow-hidden">
          {/* Massive watermark numeral, cross-fades */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`num-${uiIdx}`}
              aria-hidden
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -left-4 md:-left-10 top-1/2 -translate-y-1/2 pointer-events-none select-none font-display font-bold leading-none tracking-tight text-oxblood/[0.18]"
              style={{
                fontSize: 'clamp(20rem, 55vw, 52rem)',
                fontVariationSettings: "'opsz' 144",
              }}
            >
              {ROMAN[uiIdx]}
            </motion.span>
          </AnimatePresence>

          {/* Sticky left rail, current stage indicator */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-6 z-20 pointer-events-none">
            <ul className="flex flex-col gap-6">
              {stages.map((s, i) => {
                const active = i === uiIdx
                const done = i < uiIdx
                return (
                  <li key={s.number} className="flex items-center gap-3">
                    <span
                      className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 ${
                        active
                          ? 'bg-oxblood border-oxblood scale-125 shadow-[0_0_18px_-2px_rgba(156,38,38,0.7)]'
                          : done
                          ? 'bg-oxblood/40 border-oxblood/40'
                          : 'bg-transparent border-paper/40'
                      }`}
                    />
                    <span className={`smallcaps transition-colors duration-300 ${active ? 'text-oxblood' : 'text-paper/40'}`}>
                      {ROMAN[i]}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Content, cross-fades with the same key */}
          <div className="absolute inset-0 flex items-center">
            <div className="container-wide w-full grid grid-cols-12 gap-8 items-start">
              <div className="hidden md:block col-span-1" />
              <div className="col-span-12 md:col-span-8 md:pl-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`stage-${uiIdx}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="smallcaps text-oxblood mb-4">
                      {t('labels.phase')} {String(uiIdx + 1).padStart(2, '0')} · {stage.priceLabel} · {stage.duration}
                    </p>
                    <h3
                      className="font-display font-bold mb-8"
                      style={{
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                        fontVariationSettings: "'opsz' 96",
                      }}
                    >
                      {stage.title}
                    </h3>
                    <p className="font-display italic text-lg md:text-2xl text-paper/75 max-w-2xl mb-10 leading-snug">
                      {stage.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 max-w-2xl">
                      {stage.outputs.map((out, i) => (
                        <li key={i} className="flex gap-3 text-paper/75 leading-snug">
                          <span className="text-oxblood shrink-0">◆</span>
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right rail, counter */}
              <div className="hidden md:flex col-span-3 md:pt-2 md:pl-6 border-l border-paper/15 flex-col gap-2">
                <p className="smallcaps text-paper/40">{t('labels.phase')}</p>
                <p className="font-display text-3xl text-paper leading-none">
                  {String(uiIdx + 1).padStart(2, '0')}
                  <span className="text-paper/30"> / {String(N).padStart(2, '0')}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="container-wide pb-6 pt-4 border-t border-paper/10 z-10">
          <div className="flex items-center gap-4">
            <span className="smallcaps text-paper/50 w-14">{t('labels.scroll')}</span>
            <div className="flex-1 h-px bg-paper/20 relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-oxblood"
                style={{ width: barWidth }}
              />
            </div>
            <span className="smallcaps text-paper/50 w-14 text-right">{t('labels.process')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessStages
