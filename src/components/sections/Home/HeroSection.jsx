import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { GooeyText } from '@/components/ui/gooey-text'
import BackgroundHero from '@/components/ui/background-hero'
import { useLangPath } from '@/lib/usePathAlternate'

const HeroSection = () => {
  const { t } = useTranslation('home')
  const langPath = useLangPath()
  const phrases = t('hero.morphingPhrases', { returnObjects: true })

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      <BackgroundHero />
      <div className="container-custom text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* GooeyText morphing hero */}
          <div className="mb-8">
            <GooeyText
              texts={phrases}
              morphTime={1.2}
              cooldownTime={0.5}
              className="h-24 md:h-32"
              textClassName="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground"
            />
          </div>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <Link to={langPath('contact')} className="btn-secondary text-sm">
            {t('hero.cta')}
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection
