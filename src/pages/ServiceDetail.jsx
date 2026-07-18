import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useScroll, useTransform, motion } from 'framer-motion'
import { CaseGallery } from '@/components/ui/case-gallery'
import { cases } from '@/data/cases'
import { CTASection } from '@/components/sections/Home'
import { getPillar } from '@/data/services'
import { useCurrentLang } from '@/lib/usePathAlternate'

const ServiceDetail = () => {
  const { serviceId } = useParams()
  const lang = useCurrentLang()
  const basePath = lang === 'en' ? '/en' : ''
  const { t } = useTranslation('services')
  const { t: tCommon } = useTranslation('common')
  const { t: tCases } = useTranslation('cases')

  const { scrollY } = useScroll()
  const dotsY = useTransform(scrollY, [0, 2000], [0, -80])

  const pillar = getPillar(serviceId)
  const localized = t(serviceId, { returnObjects: true, defaultValue: null })

  if (!pillar || !localized || typeof localized !== 'object') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Service Not Found</h1>
        </div>
      </div>
    )
  }

  const scope = pillar.scope[lang] || pillar.scope.nl
  const deliverables = pillar.deliverables[lang] || pillar.deliverables.nl
  const notFor = pillar.notForYouIf[lang] || pillar.notForYouIf.nl
  const positioning = pillar.positioning[lang] || pillar.positioning.nl

  const relatedCases = cases
    .filter(c => !c.comingSoon && (c.relatedService === 'development' || c.relatedService === serviceId))
    .slice(0, 6)
    .map(c => ({
      ...c,
      name: tCases(`${c.id}.name`, { defaultValue: c.id }),
      tagline: tCases(`${c.id}.tagline`, { defaultValue: '' }),
    }))

  return (
    <div className="relative overflow-hidden">
      {/* Full-page background: noise dots only, parallax drift */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-white" />
        <motion.div style={{ y: dotsY }} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.07) 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
          />
        </motion.div>
      </div>

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              {localized.subtitle}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              {localized.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {localized.heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Positioning */}
      <section className="py-12">
        <div className="container-custom max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl text-foreground leading-relaxed"
          >
            {positioning}
          </motion.p>
        </div>
      </section>

      {/* Scope + Deliverables */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                {tCommon('sections.services')}
              </h2>
              <ul className="space-y-3">
                {scope.map((item, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                    <span className="text-foreground shrink-0">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                {tCommon('sections.results')}
              </h2>
              <ul className="space-y-3">
                {deliverables.map((item, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                    <span className="text-foreground shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Example */}
      {localized.example && (
        <section className="py-16">
          <div className="container-custom max-w-4xl">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              {localized.example.title}
            </p>
            <p className="text-xl md:text-2xl text-foreground leading-snug">
              {localized.example.body}
            </p>
          </div>
        </section>
      )}

      {/* Not for you */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 uppercase tracking-wide">
            {lang === 'en' ? "Not for you if" : 'Niet voor jou als'}
          </h2>
          <ul className="space-y-2">
            {notFor.map((item, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                <span className="text-muted-foreground/50 shrink-0">×</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related Cases */}
      {relatedCases.length > 0 && (
        <section className="py-20">
          <div className="container-custom mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">{tCommon('sections.relatedWork')}</h2>
          </div>
          <CaseGallery
            cases={relatedCases}
            readMoreLabel={tCommon('cta.readMore')}
            basePath={basePath}
          />
        </section>
      )}

      <CTASection />
    </div>
  )
}

export default ServiceDetail
