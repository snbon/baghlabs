import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLangPath } from '@/lib/usePathAlternate'
import SplitReveal from '@/components/motion/SplitReveal'

const PillarGrid = () => {
  const { t } = useTranslation('home')
  const langPath = useLangPath()
  const items = t('pillars.items', { returnObjects: true })
  const foundation = t('pillars.foundation', { returnObjects: true })
  const [hovered, setHovered] = useState(null)

  return (
    <section id="pillars" className="relative bg-noir text-paper border-t border-paper/10">
      <div className="container-wide py-24 md:py-32">
        <div className="flex items-baseline justify-between mb-14 md:mb-20">
          <div>
            <p className="chapter mb-4">{t('chapters.services')}</p>
            <h2 className="poster-2 max-w-[16ch]">
              <SplitReveal trigger="view" stagger={45}>
                {t('pillars.headline')}
              </SplitReveal>
            </h2>
          </div>
          <span className="smallcaps text-paper/40 hidden md:inline">{t('pillars.sideNote')}</span>
        </div>

        <ol className="border-t border-paper/15">
          {items.map((item) => (
            <li key={item.id} className="border-b border-paper/15">
              <Link
                to={langPath('services', item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className="group block"
              >
                <div className="flex items-baseline gap-6 md:gap-10 py-6 md:py-8">
                  <span className="font-display font-bold text-3xl md:text-5xl text-oxblood w-16 md:w-24 shrink-0 leading-none">
                    {item.number}
                  </span>
                  <span className="font-display font-bold text-2xl md:text-4xl leading-none tracking-tight text-paper group-hover:text-oxblood transition-colors">
                    {item.title}
                  </span>
                  <span className="dot-leader hidden md:block" />
                  <span className="smallcaps text-oxblood shrink-0 transition-transform group-hover:translate-x-1">
                    Read →
                  </span>
                </div>
                <AnimatePresence>
                  {hovered === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 md:pb-8 md:pl-[9.5rem] pl-16 text-base md:text-lg text-paper/70 max-w-3xl">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          ))}
          <li className="border-b border-paper/15">
            <Link
              to={langPath('services', 'softwareontwikkeling')}
              className="group flex items-baseline gap-6 md:gap-10 py-6 md:py-8"
            >
              <span className="font-display font-bold text-3xl md:text-5xl text-oxblood w-16 md:w-24 shrink-0 leading-none">
                +
              </span>
              <span className="font-display font-medium italic text-2xl md:text-4xl leading-none tracking-tight text-paper group-hover:text-oxblood transition-colors">
                {foundation.title}
              </span>
              <span className="dot-leader hidden md:block" />
              <span className="smallcaps text-oxblood shrink-0 transition-transform group-hover:translate-x-1">
                Read →
              </span>
            </Link>
          </li>
        </ol>
      </div>
    </section>
  )
}

export default PillarGrid
