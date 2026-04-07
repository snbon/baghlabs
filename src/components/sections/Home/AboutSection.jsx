import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { RevealImageList } from '@/components/ui/reveal-images'
import { useLocation } from 'react-router-dom'

const AboutSection = () => {
  const { t } = useTranslation('home')
  const location = useLocation()
  const basePath = location.pathname.startsWith('/en') ? '/en' : ''

  const services = t('about.services', { returnObjects: true })

  const items = [
    {
      text: services.development.title,
      href: `${basePath}/services/development`,
      images: [
        '/assets/availly/availly-dashboard.png',
        '/assets/shiftend/shiftend-report.png',
      ],
    },
    {
      text: services.branding.title,
      href: `${basePath}/services/branding-content`,
      images: [
        '/assets/blurry-vintage/blurry-by-persona-gent.jpg',
        '/assets/claymates/claymates-cup2.jpg',
      ],
    },
    {
      text: services.marketing.title,
      href: `${basePath}/services/performance-marketing`,
      images: [
        '/assets/yokoso/yokoso-campagin-photography-by-persona-gent.jpg',
        '/assets/rebelieve/rebelieve-by-persona-gent.jpg',
      ],
    },
  ]

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6 tracking-tight">
            {t('about.heading')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl">
            {t('about.intro')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <RevealImageList
            items={items}
            title={t('about.servicesLabel')}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default AboutSection
