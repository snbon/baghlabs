import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { CaseGallery } from '@/components/ui/case-gallery'
import { ContainerScroll } from '@/components/ui/container-scroll'
import { CreativeHero } from '@/components/ui/creative-hero'
import { getCaseById, cases } from '@/data/cases'
import { CTASection } from '@/components/sections/Home'
import { useCurrentLang, useLangPath } from '@/lib/usePathAlternate'

const CaseDetail = () => {
  const [lightbox, setLightbox] = useState(null)
  const { caseName } = useParams()
  const lang = useCurrentLang()
  const langPath = useLangPath()
  const basePath = lang === 'en' ? '/en' : ''
  const { t } = useTranslation('cases')
  const { t: tCommon } = useTranslation('common')

  const caseData = getCaseById(caseName)
  const caseText = caseData ? {
    name: t(`${caseData.id}.name`, { defaultValue: caseData.id }),
    tagline: t(`${caseData.id}.tagline`, { defaultValue: '' }),
    description: t(`${caseData.id}.description`, { defaultValue: '' }),
    longDescription: t(`${caseData.id}.longDescription`, { defaultValue: '' }),
    challenge: t(`${caseData.id}.challenge`, { defaultValue: '' }),
    solution: t(`${caseData.id}.solution`, { defaultValue: '' }),
    category: t(`${caseData.id}.category`, { defaultValue: '' }),
    industry: t(`${caseData.id}.industry`, { defaultValue: '' }),
    client: t(`${caseData.id}.client`, { defaultValue: '' }),
    results: t(`${caseData.id}.results`, { returnObjects: true, defaultValue: caseData.results || [] }),
  } : null

  const otherCases = caseData
    ? cases.filter(c => c.id !== caseData.id && !c.comingSoon).slice(0, 4).map(c => ({
        ...c,
        name: t(`${c.id}.name`, { defaultValue: c.id }),
        tagline: t(`${c.id}.tagline`, { defaultValue: '' }),
      }))
    : []

  if (!caseData) {
    return (
      <div className="min-h-screen bg-noir text-paper flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="chapter mb-4">404</p>
          <h1 className="poster-2 mb-6">Project niet gevonden</h1>
          <Link
            to={langPath('projects')}
            className="font-display text-xl text-oxblood border-b-2 border-oxblood"
          >
            ← {tCommon('sections.moreWork')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-noir text-paper">
      {/* Back-link bar — floats above the hero */}
      <div className="fixed top-0 inset-x-0 z-[9998] pointer-events-none">
        <div className="container-wide pt-24 md:pt-28 flex items-baseline justify-between">
          <Link
            to={langPath('projects')}
            className="pointer-events-auto smallcaps text-paper/70 hover:text-oxblood transition-colors bg-noir/70 backdrop-blur-sm px-3 py-1.5 border border-paper/15"
          >
            ← {tCommon('sections.moreWork')}
          </Link>
          <span className="pointer-events-none smallcaps text-paper/50 bg-noir/70 backdrop-blur-sm px-3 py-1.5 border border-paper/15 hidden md:inline-block">
            {caseText.category}
          </span>
        </div>
      </div>

      {/* Hero — template-based */}
      {caseData.template === 'creative' ? (
        <CreativeHero
          title={caseText.name}
          year={caseData.year}
          category={caseText.category}
          image={caseData.heroImage || caseData.image}
          video={caseData.videos?.[0]?.includes('.mp4') ? caseData.videos[0] : undefined}
        />
      ) : (
        <section className="relative bg-noir border-b border-paper/10">
          <ContainerScroll
            titleComponent={
              <div className="text-center px-4">
                <p className="chapter mb-4">{caseText.category}</p>
                <h1
                  className="font-display font-bold text-paper mb-6 leading-none tracking-tight"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                    letterSpacing: '-0.03em',
                    fontVariationSettings: "'opsz' 96",
                  }}
                >
                  {caseText.name}
                </h1>
                <p className="font-display italic text-lg md:text-xl text-paper/70 max-w-2xl mx-auto">
                  {caseText.tagline}
                </p>
              </div>
            }
          >
            <img
              src={caseData.heroImage || caseData.image}
              alt={caseText.name}
              className="h-full w-full object-cover object-top"
            />
          </ContainerScroll>
        </section>
      )}

      {/* Content */}
      <section className="border-b border-oxblood py-20 md:py-24">
        <div className="container-wide max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl text-paper/75 leading-relaxed mb-16"
          >
            {caseText.longDescription || caseText.description}
          </motion.p>

          {/* Meta grid */}
          <div className="grid md:grid-cols-3 gap-0 mb-16 border-t border-b border-oxblood">
            {caseText.industry && (
              <div className="py-5 md:pr-6 border-b md:border-b-0 md:border-r border-paper/15">
                <p className="chapter mb-2">Sector</p>
                <p className="font-display font-bold text-lg text-paper">{caseText.industry}</p>
              </div>
            )}
            {caseText.client && (
              <div className="py-5 md:px-6 border-b md:border-b-0 md:border-r border-paper/15">
                <p className="chapter mb-2">Klant</p>
                <p className="font-display font-bold text-lg text-paper">{caseText.client}</p>
              </div>
            )}
            {caseData.year && (
              <div className="py-5 md:pl-6">
                <p className="chapter mb-2">Jaar</p>
                <p className="font-display font-bold text-lg text-paper">{caseData.year}</p>
              </div>
            )}
          </div>

          {/* Tech / Services chips */}
          {caseData.template === 'web' && caseData.technologies?.length > 0 && (
            <div className="mb-16">
              <p className="chapter mb-4">Technologie</p>
              <div className="flex flex-wrap gap-2">
                {caseData.technologies.map((tech, i) => (
                  <span key={i} className="smallcaps px-3 py-1.5 border border-paper/20 text-paper/75">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          {caseData.template === 'creative' && caseData.services?.length > 0 && (
            <div className="mb-16">
              <p className="chapter mb-4">Scope</p>
              <div className="flex flex-wrap gap-2">
                {caseData.services.map((service, i) => (
                  <span key={i} className="smallcaps px-3 py-1.5 border border-paper/20 text-paper/75">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Challenge & Solution */}
          {(caseText.challenge || caseText.solution) && (
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
              {caseText.challenge && (
                <div>
                  <p className="chapter mb-4 border-b border-paper/20 pb-2">Probleem</p>
                  <p className="text-paper/80 leading-relaxed">{caseText.challenge}</p>
                </div>
              )}
              {caseText.solution && (
                <div className="border-l border-oxblood pl-6 md:pl-8">
                  <p className="chapter mb-4 border-b border-oxblood pb-2">Aanpak</p>
                  <p className="text-paper/85 leading-relaxed">{caseText.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Results */}
          {caseData.template === 'web' && (Array.isArray(caseText.results) ? caseText.results : caseData.results)?.length > 0 && (
            <div className="mb-16">
              <p className="chapter mb-6">Resultaat</p>
              <ol className="grid md:grid-cols-2 gap-4">
                {(Array.isArray(caseText.results) ? caseText.results : caseData.results).map((result, i) => (
                  <li key={i} className="flex items-baseline gap-4">
                    <span className="font-display text-oxblood text-sm w-6 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-paper/80 leading-snug">{result}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {caseData.template === 'web' && caseData.websiteUrl && (
            <div className="mb-16">
              <a
                href={caseData.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xl md:text-2xl text-oxblood border-b-2 border-oxblood hover:text-oxblood-2 pb-1"
              >
                {tCommon('cta.visitWebsite')} ↗
              </a>
            </div>
          )}
        </div>

        {/* Gallery */}
        {caseData.gallery?.length > 0 && (
          <div className="container-wide max-w-6xl mt-16">
            <p className="chapter mb-8">Beelden</p>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {caseData.gallery.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="aspect-[4/3] overflow-hidden rounded-sm border border-paper/15 bg-noir-2 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-oxblood"
                >
                  <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && caseData.gallery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[99999] bg-noir/95 backdrop-blur-sm flex items-center justify-center"
              onClick={() => setLightbox(null)}
            >
              <button
                className="absolute top-4 right-4 text-paper/70 hover:text-oxblood p-2 rounded-sm border border-paper/20 transition-colors z-10"
                onClick={() => setLightbox(null)}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              {lightbox > 0 && (
                <button
                  className="absolute left-3 md:left-6 text-paper/70 hover:text-oxblood p-2 rounded-sm border border-paper/20 transition-colors z-10"
                  onClick={e => { e.stopPropagation(); setLightbox(l => l - 1) }}
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <motion.img
                key={lightbox}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                src={caseData.gallery[lightbox]}
                alt=""
                className="max-h-[90vh] max-w-[90vw] object-contain"
                onClick={e => e.stopPropagation()}
              />
              {lightbox < caseData.gallery.length - 1 && (
                <button
                  className="absolute right-3 md:right-6 text-paper/70 hover:text-oxblood p-2 rounded-sm border border-paper/20 transition-colors z-10"
                  onClick={e => { e.stopPropagation(); setLightbox(l => l + 1) }}
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 smallcaps text-paper/60">
                {String(lightbox + 1).padStart(2, '0')} / {String(caseData.gallery.length).padStart(2, '0')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {caseData.template === 'creative' && caseData.videos?.length > 0 && (
          <div className="container-wide max-w-4xl mt-16">
            <p className="chapter mb-8">Video</p>
            <div className="space-y-8">
              {caseData.videos.map((video, i) => (
                <div key={i} className="aspect-video rounded-sm border border-paper/15 overflow-hidden">
                  <iframe
                    src={video}
                    title="Case video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {otherCases.length > 0 && (
        <section className="border-b border-oxblood py-20 md:py-24">
          <div className="container-wide mb-10">
            <p className="chapter mb-4">Ander werk</p>
            <h2 className="poster-2">Meer</h2>
          </div>
          <CaseGallery cases={otherCases} readMoreLabel={tCommon('cta.readMore')} basePath={basePath} />
        </section>
      )}

      <CTASection />
    </div>
  )
}

export default CaseDetail
