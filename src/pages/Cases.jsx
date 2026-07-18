import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { CaseTabs } from '@/components/ui/case-tabs'
import { CaseGallery } from '@/components/ui/case-gallery'
import { cases } from '@/data/cases'
import BackgroundPage from '@/components/ui/background-page'
import { CTASection } from '@/components/sections/Home'
import { useCurrentLang } from '@/lib/usePathAlternate'

const Cases = () => {
  const [activeTab, setActiveTab] = useState('all')
  const { t } = useTranslation('cases')
  const { t: tCommon } = useTranslation('common')
  const lang = useCurrentLang()
  const basePath = lang === 'en' ? '/en' : ''

  const augmentCases = (caseList) =>
    caseList.map((c) => ({
      ...c,
      name: t(`${c.id}.name`, { defaultValue: c.id }),
      tagline: t(`${c.id}.tagline`, { defaultValue: '' }),
    }))

  const filteredCases = (() => {
    if (activeTab === 'all') return augmentCases(cases)
    if (activeTab === 'ai') return []
    return augmentCases(cases.filter((c) => c.relatedService === activeTab))
  })()

  return (
    <div>
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
                ai: t('page.tabAi'),
                others: t('page.tabOthers'),
              }}
            />
          </div>
        </section>

        {/* Gallery or AI empty state */}
        {activeTab === 'ai' ? (
          <section className="pb-20">
            <div className="container-custom max-w-2xl">
              <div className="rounded-2xl border border-bagh-100/60 bg-white/40 backdrop-blur-sm p-8 md:p-10">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  {tCommon('cta.comingSoon')}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  {t('page.aiEmptyTitle')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('page.aiEmptyBody')}
                </p>
              </div>
            </div>
          </section>
        ) : (
          <section className="pb-20">
            <CaseGallery
              cases={filteredCases}
              readMoreLabel={tCommon('cta.readMore')}
              basePath={basePath}
            />
          </section>
        )}
      </div>

      <CTASection />
    </div>
  )
}

export default Cases
