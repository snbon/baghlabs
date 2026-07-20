import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const HeroSection = () => {
  const { t } = useTranslation('about')

  return (
    <section className="relative bg-noir text-paper border-b border-oxblood">
      
      <div className="container-wide relative pt-32 md:pt-40 pb-20 md:pb-24">
        <div className="flex items-baseline justify-between mb-6">
          <span className="chapter">Cap. I — Colofon</span>
          <span className="smallcaps text-paper/40 hidden md:inline">MMXXVI</span>
        </div>
        <div className="rule-oxblood mb-14 md:mb-20" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="poster-1 max-w-[16ch]">{t('hero.heading')}</h1>
          <p className="mt-8 md:mt-10 max-w-3xl font-display italic text-xl md:text-2xl text-paper/75">
            {t('hero.subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
