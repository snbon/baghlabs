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
      <section className="relative border-b border-oxblood pt-32 md:pt-40 pb-16 md:pb-20">
        
        <div className="container-wide relative">
          <div className="flex items-baseline justify-between mb-6">
            <span className="chapter">Cap., Projecten</span>
            <span className="smallcaps text-paper/40 hidden md:inline">Archief</span>
          </div>
          <div className="rule-oxblood mb-14 md:mb-20" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="poster-1 max-w-[14ch]">{t('page.heroTitle')}</h1>
            <p className="mt-8 max-w-2xl font-display italic text-xl md:text-2xl text-paper/75">
              {t('page.heroDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-paper/15 py-6 md:py-8">
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
        <section className="border-b border-oxblood py-24 md:py-32 bg-noir-2">
          <div className="container-wide max-w-3xl">
            <div className="frame bg-noir p-8 md:p-12">
              <div className="flex items-baseline justify-between border-b border-oxblood pb-3 mb-6">
                <span className="chapter">{tCommon('cta.comingSoon')}</span>
                <span className="smallcaps text-paper/40">Onder NDA</span>
              </div>
              <h2 className="poster-3 mb-6">{t('page.aiEmptyTitle')}</h2>
              <p className="text-lg leading-relaxed text-paper/70">
                {t('page.aiEmptyBody')}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="border-b border-oxblood py-16 md:py-20">
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
