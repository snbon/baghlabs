import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import BackgroundHero from '@/components/ui/background-hero'

const HeroSection = () => {
  const { t } = useTranslation('about')

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      <BackgroundHero />
      <div className="container-custom text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-medium">
            {t('hero.label')}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-8">
            {t('hero.heading')}
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection
