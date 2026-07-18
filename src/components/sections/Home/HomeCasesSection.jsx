import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CaseGallery } from '@/components/ui/case-gallery'
import { getFeaturedCases } from '@/data/cases'
import { useCurrentLang, useLangPath } from '@/lib/usePathAlternate'

const HomeCasesSection = () => {
  const { t } = useTranslation('home')
  const lang = useCurrentLang()
  const langPath = useLangPath()
  const basePath = lang === 'en' ? '/en' : ''
  const featuredCases = getFeaturedCases(6)

  // Augment with i18n text
  const { t: tCases } = useTranslation('cases')
  const casesWithText = featuredCases.map(c => ({
    ...c,
    name: tCases(`${c.id}.name`, { defaultValue: c.id }),
    tagline: tCases(`${c.id}.tagline`, { defaultValue: '' }),
  }))

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="container-custom mb-8 md:mb-14"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">
                {t('cases.heading')}
              </h2>
              <Link
                to={langPath('projects')}
                className="group flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('cases.subtext')}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>

        <CaseGallery
          cases={casesWithText}
          readMoreLabel={t('cases.subtext')}
          basePath={basePath}
        />

        <div className="container-custom mt-8">
          <p className="text-sm text-muted-foreground">{t('cases.comingSoon')}</p>
        </div>
      </div>
    </div>
  )
}

export default HomeCasesSection
