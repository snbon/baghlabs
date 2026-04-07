import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CaseTabs } from '@/components/ui/case-tabs'
import { CaseGallery } from '@/components/ui/case-gallery'
import { cases } from '@/data/cases'
import BackgroundPage from '@/components/ui/background-page'
import { CTASection } from '@/components/sections/Home'

const Cases = () => {
  const [activeTab, setActiveTab] = useState('all')
  const { t } = useTranslation('cases')
  const { t: tCommon } = useTranslation('common')
  const location = useLocation()
  const basePath = location.pathname.startsWith('/en') ? '/en' : ''

  // Augment cases with i18n
  const augmentCases = (caseList) =>
    caseList.map(c => ({
      ...c,
      name: t(`${c.id}.name`, { defaultValue: c.id }),
      tagline: t(`${c.id}.tagline`, { defaultValue: '' }),
    }))

  const filteredCases = activeTab === 'all'
    ? augmentCases(cases)
    : augmentCases(cases.filter(c => c.relatedService === activeTab))

  return (
    <div>
      {/* Grid background wraps only the page content, not the footer */}
      <div className="relative overflow-hidden min-h-screen">
        <BackgroundPage />

        {/* Hero */}
        <section className="pt-32 md:pt-40 pb-12 md:pb-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
                {t('page.heroTitle')}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {t('page.heroDescription')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tabs */}
        <section className="pb-8">
          <div className="container-custom">
            <CaseTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              labels={{
                all: t('page.tabAll'),
                development: t('page.tabDevelopment'),
                brandingContent: t('page.tabBrandingContent'),
                performanceMarketing: t('page.tabPerformanceMarketing'),
              }}
            />
          </div>
        </section>

        {/* Gallery */}
        <section className="pb-20">
          <CaseGallery
            cases={filteredCases}
            readMoreLabel={tCommon('cta.readMore')}
            basePath={basePath}
          />
        </section>
      </div>

      {/* Footer outside the grid wrapper — grid fades out, dots fade in */}
      <CTASection />
    </div>
  )
}

export default Cases
