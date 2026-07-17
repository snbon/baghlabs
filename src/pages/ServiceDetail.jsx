import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CaseGallery } from '@/components/ui/case-gallery'
import { GlowButton } from '@/components/ui/glow-button'
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
          <p className="eyebrow text-neon mb-4">404</p>
          <h1 className="display-3 mb-6">Pijler niet gevonden</h1>
          <GlowButton asChild variant="neon" size="md">
            <Link to={langPath('home')}>← Home</Link>
          </GlowButton>
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
      {/* Hero band */}
      <section className="relative border-b border-paper/10 pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute inset-0 halo-neon pointer-events-none" />
        <div className="container-wide relative">
          <Link
            to={langPath('home')}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-paper/50 hover:text-neon mb-10 transition-colors"
          >
            ← {t('page.backToHome')}
          </Link>
          <p className="eyebrow text-neon mb-6">{localized.eyebrow}</p>
          <h1 className="display-1 max-w-[18ch] text-paper">{localized.title}</h1>
          <p className="mt-6 md:mt-8 text-xl md:text-2xl font-display font-medium tracking-brut text-paper/85 max-w-3xl">
            {localized.subtitle}
          </p>
          <p className="mt-8 md:mt-10 max-w-3xl text-lg leading-relaxed text-paper/70">
            {localized.heroDescription}
          </p>
        </div>
      </section>

      {/* Positioning */}
      <section className="border-b border-paper/10 py-20 md:py-24">
        <div className="container-wide">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4 flex md:flex-col gap-3 md:gap-4">
              <span className="inline-block w-8 h-px bg-neon shadow-glow-sm mt-3" />
              <p className="eyebrow text-neon">// {tagline}</p>
            </div>
            <p className="md:col-span-8 text-xl md:text-2xl leading-snug tracking-brut font-display text-paper">
              {positioning}
            </p>
          </div>
        </div>
      </section>

      {/* Scope + Deliverables */}
      <section className="border-b border-paper/10 py-20 md:py-24">
        <div className="container-wide grid md:grid-cols-2 gap-5 md:gap-6">
          <div className="rounded-md border border-paper/10 bg-noir-2 overflow-hidden">
            <div className="px-6 py-4 border-b border-paper/10 bg-noir-3/40">
              <p className="eyebrow">{t('page.sectionsScope')}</p>
            </div>
            <ul className="p-6 md:p-7 space-y-3">
              {scope.map((item, i) => (
                <li key={i} className="flex gap-3 leading-snug text-paper/80">
                  <span className="font-mono text-paper/40 shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-paper/10 bg-noir-2 overflow-hidden relative">
            <span className="absolute left-0 top-0 bottom-0 w-px bg-neon shadow-glow-sm" />
            <div className="px-6 py-4 border-b border-paper/10 bg-noir-3/40">
              <p className="eyebrow text-neon">{t('page.sectionsDeliverables')}</p>
            </div>
            <ul className="p-6 md:p-7 space-y-3">
              {deliverables.map((item, i) => (
                <li key={i} className="flex gap-3 leading-snug text-paper/85">
                  <span className="font-mono text-neon shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Example */}
      {localized.example && (
        <section className="border-b border-paper/10 py-20 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 halo-violet pointer-events-none" />
          <div className="container-wide relative max-w-4xl">
            <p className="eyebrow text-violet mb-6">// {localized.example.title}</p>
            <p className="display-3 leading-tight text-paper">{localized.example.body}</p>
          </div>
        </section>
      )}

      {/* Not for you */}
      <section className="border-b border-paper/10 py-20 md:py-24">
        <div className="container-wide grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <p className="eyebrow mb-4">// {t('page.sectionsNotForYou')}</p>
          </div>
          <ul className="md:col-span-8 space-y-3">
            {notFor.map((item, i) => (
              <li key={i} className="flex gap-3 text-paper/50 text-lg leading-snug">
                <span className="font-mono text-paper/30 shrink-0">×</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related cases */}
      {relatedCases.length > 0 && (
        <section className="border-b border-paper/10 py-20 md:py-24">
          <div className="container-wide mb-10">
            <p className="eyebrow text-neon mb-4">// {tCommon('sections.relatedWork')}</p>
            <h2 className="display-3 max-w-2xl text-paper">Recent gebouwd</h2>
          </div>
          <CaseGallery
            cases={relatedCases}
            readMoreLabel={tCommon('cta.readMore')}
            basePath={lang === 'en' ? '/en' : ''}
          />
        </section>
      )}

      {/* Other pillars */}
      <section className="border-b border-paper/10 py-20 md:py-24">
        <div className="container-wide">
          <p className="eyebrow mb-6">// {t('page.secondaryCta')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherPillars.map((p) => {
              const label = p.label[lang] || p.label.nl
              return (
                <Link
                  key={p.id}
                  to={langPath('services', p.id)}
                  className="group block rounded-md border border-paper/10 bg-noir-2 p-6 hover:border-neon/50 hover:shadow-glow-sm hover:-translate-y-0.5 transition-all duration-200"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-paper/40 mb-3 group-hover:text-neon transition-colors">
                    // 0{p.order}
                  </p>
                  <p className="font-display font-bold text-lg leading-tight tracking-brut text-paper group-hover:text-neon transition-colors">{label}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}

export default ServiceDetail
