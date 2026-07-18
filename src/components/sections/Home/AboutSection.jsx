import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { RevealImageList } from '@/components/ui/reveal-images'
import { useLangPath } from '@/lib/usePathAlternate'

const PILLAR_IMAGES = {
  'ai-workflows': [
    '/assets/shiftend/shiftend-report.png',
    '/assets/availly/availly-dashboard.png',
  ],
  'kennissystemen': [
    '/assets/calvarychurch/calvarychurch-preview.png',
    '/assets/supportportal/supportportal-preview.png',
  ],
  'documentverwerking': [
    '/assets/shiftend/shiftend-mobile.png',
    '/assets/delicebrugge/delicebrugge-preview.png',
  ],
  'integraties': [
    '/assets/supportportal/supportportal-preview.png',
    '/assets/availly/availly-dashboard.png',
  ],
}

const AboutSection = () => {
  const { t } = useTranslation('home')
  const langPath = useLangPath()

  const services = t('about.services', { returnObjects: true })

  const items = Object.entries(services).map(([id, s]) => ({
    text: s.title,
    href: langPath('services', id),
    images: PILLAR_IMAGES[id] || [],
  }))

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
