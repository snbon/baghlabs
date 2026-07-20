import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { CaseGallery } from '@/components/ui/case-gallery'
import { cases } from '@/data/cases'
import { CTASection } from '@/components/sections/Home'
import { getPillar, pillars } from '@/data/services'
import { useCurrentLang, useLangPath } from '@/lib/usePathAlternate'

const ServiceDetail = () => {
  const { serviceId } = useParams()
  const { t } = useTranslation('services')
  const { t: tCommon } = useTranslation('common')
  const { t: tCases } = useTranslation('cases')
  const lang = useCurrentLang()
  const langPath = useLangPath()

  const pillar = getPillar(serviceId)
  const localized = t(serviceId, { returnObjects: true, defaultValue: null })

  if (!pillar || !localized || typeof localized !== 'object') {
    return (
      <div className="min-h-screen bg-noir text-paper flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="chapter mb-4">404</p>
          <h1 className="poster-2 mb-6">Pijler niet gevonden</h1>
          <Link to={langPath('home')} className="font-display text-xl text-oxblood border-b-2 border-oxblood">
            ← Home
          </Link>
        </div>
      </div>
    )
  }

  const scope = pillar.scope[lang] || pillar.scope.nl
  const deliverables = pillar.deliverables[lang] || pillar.deliverables.nl
  const notFor = pillar.notForYouIf[lang] || pillar.notForYouIf.nl
  const tagline = pillar.tagline[lang] || pillar.tagline.nl
  const positioning = pillar.positioning[lang] || pillar.positioning.nl

  const otherPillars = pillars.filter((p) => p.id !== pillar.id)
  const relatedCases = cases
    .filter((c) => !c.comingSoon && (c.relatedService === 'development' || c.relatedService === serviceId))
    .slice(0, 6)
    .map((c) => ({
      ...c,
      name: tCases(`${c.id}.name`, { defaultValue: c.id }),
      tagline: tCases(`${c.id}.tagline`, { defaultValue: '' }),
    }))

  return (
    <div className="bg-noir text-paper">
      {/* Hero */}
      <section className="border-b border-oxblood pt-32 md:pt-40 pb-20 md:pb-28 relative">
        
        <div className="container-wide relative">
          <div className="flex items-baseline justify-between mb-6">
            <Link
              to={langPath('home')}
              className="smallcaps text-paper/50 hover:text-oxblood transition-colors"
            >
              ← {t('page.backToHome')}
            </Link>
            <span className="chapter">{localized.eyebrow.replace('// ', 'Cap. ')}</span>
          </div>
          <div className="rule-oxblood mb-14 md:mb-20" />

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="poster-1 max-w-[16ch] text-paper"
          >
            {localized.title}
          </motion.h1>
          <p className="mt-8 md:mt-10 font-display italic text-xl md:text-2xl text-paper/75 max-w-3xl">
            {localized.subtitle}
          </p>
          <p className="mt-8 md:mt-10 max-w-3xl text-lg leading-relaxed text-paper/70">
            {localized.heroDescription}
          </p>
        </div>
      </section>

      {/* Positioning */}
      <section className="border-b border-oxblood py-20 md:py-24">
        <div className="container-wide">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4">
              <p className="chapter mb-4">Fig. I — Manifest</p>
              <p className="smallcaps text-paper/50">{tagline}</p>
            </div>
            <p className="md:col-span-8 font-display text-xl md:text-2xl leading-snug text-paper">
              {positioning}
            </p>
          </div>
        </div>
      </section>

      {/* Scope + Deliverables — two typographic lists */}
      <section className="border-b border-oxblood py-20 md:py-24">
        <div className="container-wide grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <div className="flex items-baseline justify-between border-b border-oxblood pb-3 mb-6">
              <p className="chapter">Wat we bouwen</p>
              <span className="smallcaps text-paper/40">Scope</span>
            </div>
            <ol className="space-y-3">
              {scope.map((item, i) => (
                <li key={i} className="flex gap-4 items-baseline">
                  <span className="font-display text-paper/40 text-sm w-6 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-paper/80 leading-snug">{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="flex items-baseline justify-between border-b border-oxblood pb-3 mb-6">
              <p className="chapter">Wat je krijgt</p>
              <span className="smallcaps text-paper/40">Deliverables</span>
            </div>
            <ol className="space-y-3">
              {deliverables.map((item, i) => (
                <li key={i} className="flex gap-4 items-baseline">
                  <span className="text-oxblood shrink-0">◆</span>
                  <span className="text-paper/85 leading-snug">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Example plate */}
      {localized.example && (
        <section className="border-b border-oxblood py-20 md:py-24 bg-noir-2">
          <div className="container-wide max-w-4xl">
            <div className="frame bg-noir p-8 md:p-12">
              <div className="flex items-baseline justify-between border-b border-oxblood pb-3 mb-6">
                <span className="chapter">Plate — {localized.example.title}</span>
                <span className="smallcaps text-paper/40">In situ</span>
              </div>
              <p className="poster-3 leading-tight text-paper">{localized.example.body}</p>
            </div>
          </div>
        </section>
      )}

      {/* Not for you */}
      <section className="border-b border-oxblood py-20 md:py-24">
        <div className="container-wide grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <p className="chapter mb-4">Wanneer dit niet past</p>
          </div>
          <ul className="md:col-span-8 space-y-3">
            {notFor.map((item, i) => (
              <li key={i} className="flex gap-4 text-paper/55 text-lg leading-snug">
                <span className="text-paper/30 shrink-0 line-through">·</span>
                <span className="italic">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related cases */}
      {relatedCases.length > 0 && (
        <section className="border-b border-oxblood py-20 md:py-24">
          <div className="container-wide mb-10">
            <p className="chapter mb-4">Cap. — Recent</p>
            <h2 className="poster-2 max-w-2xl">Gebouwd</h2>
          </div>
          <CaseGallery
            cases={relatedCases}
            readMoreLabel={tCommon('cta.readMore')}
            basePath={lang === 'en' ? '/en' : ''}
          />
        </section>
      )}

      {/* Other pillars — index */}
      <section className="border-b border-oxblood py-20 md:py-24">
        <div className="container-wide">
          <p className="chapter mb-6">Andere pijlers</p>
          <ol className="border-t border-paper/20">
            {otherPillars.map((p) => {
              const label = p.label[lang] || p.label.nl
              return (
                <li key={p.id} className="border-b border-paper/20">
                  <Link
                    to={langPath('services', p.id)}
                    className="group flex items-baseline gap-6 md:gap-10 py-5 md:py-6"
                  >
                    <span className="font-display font-bold text-2xl md:text-3xl text-oxblood w-14 shrink-0 leading-none">
                      0{p.order}
                    </span>
                    <span className="font-display font-medium text-xl md:text-2xl leading-none tracking-tight text-paper group-hover:text-oxblood transition-colors">
                      {label}
                    </span>
                    <span className="dot-leader hidden md:block" />
                    <span className="smallcaps text-oxblood shrink-0 group-hover:translate-x-1 transition-transform">
                      Read →
                    </span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <CTASection />
    </div>
  )
}

export default ServiceDetail
