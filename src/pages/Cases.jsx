import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { CaseTabs } from '@/components/ui/case-tabs'
import { CaseGallery } from '@/components/ui/case-gallery'
import { cases } from '@/data/cases'
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
    <div className="bg-noir text-paper">
      {/* Hero */}
      <section className="relative border-b border-paper/10 pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute inset-0 halo-neon pointer-events-none" />
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow text-neon mb-6">{t('page.eyebrow')}</p>
            <h1 className="display-1 max-w-[16ch] text-paper">{t('page.heroTitle')}</h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-paper/70">
              {t('page.heroDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-paper/10 py-8 md:py-10">
        <div className="container-wide">
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

      {/* Gallery / Empty */}
      {activeTab === 'ai' ? (
        <section className="border-b border-paper/10 py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 halo-violet pointer-events-none" />
          <div className="container-wide relative max-w-3xl">
            <p className="eyebrow text-violet mb-4">// {tCommon('cta.comingSoon')}</p>
            <h2 className="display-2 mb-6 text-paper">{t('page.aiEmptyTitle')}</h2>
            <p className="text-lg md:text-xl leading-relaxed text-paper/70">
              {t('page.aiEmptyBody')}
            </p>
          </div>
        </section>
      ) : (
        <section className="border-b border-paper/10 py-16 md:py-20">
          <CaseGallery
            cases={filteredCases}
            readMoreLabel={tCommon('cta.readMore')}
            basePath={basePath}
          />
        </section>
      )}

      <CTASection />
    </div>
  )
}

export default Cases
