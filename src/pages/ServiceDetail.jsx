import { useParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Pricing } from '@/components/ui/pricing'
import { CaseGallery } from '@/components/ui/case-gallery'
import { cases } from '@/data/cases'
import { CTASection } from '@/components/sections/Home'

const ServiceDetail = () => {
  const { serviceId } = useParams()
  const location = useLocation()
  const basePath = location.pathname.startsWith('/en') ? '/en' : ''
  const { t } = useTranslation('services')
  const { t: tCommon } = useTranslation('common')
  const { t: tCases } = useTranslation('cases')

  // Parallax , dots drift upward subtly as user scrolls
  const { scrollY } = useScroll()
  const dotsY = useTransform(scrollY, [0, 2000], [0, -80])

  const service = t(serviceId, { returnObjects: true })

  if (!service || typeof service !== 'object') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Service Not Found</h1>
        </div>
      </div>
    )
  }

  const relatedCases = cases
    .filter(c => c.relatedService === serviceId && !c.comingSoon)
    .map(c => ({
      ...c,
      name: tCases(`${c.id}.name`, { defaultValue: c.id }),
      tagline: tCases(`${c.id}.tagline`, { defaultValue: '' }),
    }))

  const whatWeOffer = service.whatWeOffer?.items || []
  const pricing = service.pricing

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
      <section className="pt-32 md:pt-40 pb-24">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              {service.subtitle}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {service.heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-20">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold text-foreground mb-12"
          >
            {service.whatWeOffer?.heading}
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {whatWeOffer.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-bagh-100/60 bg-white/40 backdrop-blur-sm hover:border-bagh-200 transition-colors"
              >
                <div className="w-8 h-0.5 bg-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
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

      {/* Pricing */}
      {pricing && (
        <section className="py-4">
          <Pricing plans={pricing.plans} heading={pricing.heading} />
        </section>
      )}

      <CTASection />
    </div>
  )
}

export default ServiceDetail
