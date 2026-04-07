import { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { ContainerScroll } from '@/components/ui/container-scroll'
import { CreativeHero } from '@/components/ui/creative-hero'
import BackgroundHero from '@/components/ui/background-hero'
import BackgroundPage from '@/components/ui/background-page'
import { Badge } from '@/components/ui/badge'
import { CaseGallery } from '@/components/ui/case-gallery'
import { getCaseById, cases } from '@/data/cases'
import { CTASection } from '@/components/sections/Home'

const CaseDetail = () => {
  const [lightbox, setLightbox] = useState(null) // index or null
  const { caseName } = useParams()
  const location = useLocation()
  const basePath = location.pathname.startsWith('/en') ? '/en' : ''
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-3">Case Not Found</h1>
          <p className="text-muted-foreground mb-6">The case study you're looking for doesn't exist.</p>
          <Link to={`${basePath}/cases`} className="btn-primary">Back to Cases</Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero with noise+yellow background */}
      <div className="relative">
        <BackgroundHero />
      {/* Template-based hero */}
      {caseData.template === 'web' ? (
        <ContainerScroll
          titleComponent={
            <div className="text-center px-4">
              <Badge variant="outline" className="mb-4">{caseText.category}</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
                {caseText.name}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
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
      ) : (
        <CreativeHero
          title={caseText.name}
          year={caseData.year}
          category={caseText.category}
          image={caseData.heroImage || caseData.image}
        />
      )}
      </div>{/* end hero relative wrapper */}

      {/* Rest of page with grid+purple background */}
      <div className="relative">
        <BackgroundPage />
      {/* Content */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {caseText.longDescription || caseText.description}
            </p>
          </motion.div>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid md:grid-cols-3 gap-8 mb-16 py-8 border-y border-border"
          >
            {caseText.industry && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Industry</p>
                <p className="font-medium text-foreground">{caseText.industry}</p>
              </div>
            )}
            {caseText.client && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Client</p>
                <p className="font-medium text-foreground">{caseText.client}</p>
              </div>
            )}
            {caseData.year && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Year</p>
                <p className="font-medium text-foreground">{caseData.year}</p>
              </div>
            )}
          </motion.div>

          {/* Tech or Services */}
          {caseData.template === 'web' && caseData.technologies?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {caseData.technologies.map((tech, i) => (
                  <Badge key={i} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </motion.div>
          )}

          {caseData.template === 'creative' && caseData.services?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Services</h2>
              <div className="flex flex-wrap gap-2">
                {caseData.services.map((service, i) => (
                  <Badge key={i} variant="secondary">{service}</Badge>
                ))}
              </div>
            </motion.div>
          )}

          {/* Challenge & Solution */}
          {(caseText.challenge || caseText.solution) && (
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {caseText.challenge && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Challenge</h2>
                  <p className="text-foreground leading-relaxed">{caseText.challenge}</p>
                </motion.div>
              )}
              {caseText.solution && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Solution</h2>
                  <p className="text-foreground leading-relaxed">{caseText.solution}</p>
                </motion.div>
              )}
            </div>
          )}

          {/* Results for web cases */}
          {caseData.template === 'web' && caseData.results?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">Results</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {caseData.results.map((result, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                    <p className="text-foreground">{result}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Website link for web cases */}
          {caseData.template === 'web' && caseData.websiteUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <a
                href={caseData.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                {tCommon('cta.visitWebsite')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
          )}
        </div>

        {/* Gallery */}
        {caseData.gallery?.length > 0 && (
          <div className="container-custom max-w-6xl mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {caseData.gallery.map((img, i) => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => setLightbox(i)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="aspect-[4/3] overflow-hidden rounded-xl cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </motion.button>
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
              className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center"
              onClick={() => setLightbox(null)}
            >
              {/* Close */}
              <button
                className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                onClick={() => setLightbox(null)}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev */}
              {lightbox > 0 && (
                <button
                  className="absolute left-3 md:left-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                  onClick={e => { e.stopPropagation(); setLightbox(l => l - 1) }}
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Image */}
              <motion.img
                key={lightbox}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.2 }}
                src={caseData.gallery[lightbox]}
                alt=""
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                onClick={e => e.stopPropagation()}
              />

              {/* Next */}
              {lightbox < caseData.gallery.length - 1 && (
                <button
                  className="absolute right-3 md:right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                  onClick={e => { e.stopPropagation(); setLightbox(l => l + 1) }}
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Counter */}
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs tabular-nums">
                {lightbox + 1} / {caseData.gallery.length}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Videos for creative cases */}
        {caseData.template === 'creative' && caseData.videos?.length > 0 && (
          <div className="container-custom max-w-4xl mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">Video</h2>
            <div className="space-y-8">
              {caseData.videos.map((video, i) => (
                <div key={i} className="aspect-video rounded-xl overflow-hidden">
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

      {/* Other Cases */}
      {otherCases.length > 0 && (
        <section className="py-20">
          <div className="container-custom mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">More Work</h2>
          </div>
          <CaseGallery cases={otherCases} readMoreLabel={tCommon('cta.readMore')} basePath={basePath} />
        </section>
      )}
      </div>{/* end BackgroundPage wrapper */}

      <CTASection />
    </div>
  )
}

export default CaseDetail
