import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const HeroSection = () => {
  const { t } = useTranslation('about')

  return (
    <section className="relative bg-noir text-paper border-b border-paper/10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 halo-neon pointer-events-none" />
      <div className="container-wide relative pt-32 md:pt-40 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow text-neon mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-neon shadow-glow-sm" />
            {t('hero.eyebrow')}
          </p>
          <h1 className="display-1 max-w-[18ch] text-paper">{t('hero.heading')}</h1>
          <p className="mt-8 md:mt-10 max-w-3xl text-lg md:text-xl leading-relaxed text-paper/70">
            {t('hero.subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
