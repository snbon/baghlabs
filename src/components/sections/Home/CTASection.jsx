import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useCurrentLang, usePathAlternate, useLangPath } from '@/lib/usePathAlternate'

const CTASection = () => {
  const { t } = useTranslation('home')
  const { t: tCommon, i18n } = useTranslation('common')
  const navigate = useNavigate()
  const lang = useCurrentLang()
  const alternatePath = usePathAlternate(lang === 'en' ? 'nl' : 'en')
  const langPath = useLangPath()

  const toggleLanguage = () => {
    const next = lang === 'en' ? 'nl' : 'en'
    i18n.changeLanguage(next)
    navigate(alternatePath)
  }

  const linkTarget = (key) => {
    if (key === 'home') return langPath('home')
    if (key === 'cases') return langPath('projects')
    if (key === 'services') return langPath('services', 'ai-workflows')
    if (key === 'about') return langPath('about')
    if (key === 'contact') return langPath('contact')
    return langPath('home')
  }

  return (
    <div className="relative w-full flex flex-col bg-white overflow-hidden">
      {/* Noise dots only, fade in very gradually from top, no colour cast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.07) 1px, transparent 0)',
          backgroundSize: '20px 20px',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
        }}
      />

      {/* CTA */}
      <div className="relative flex-1 flex items-center justify-center py-28">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6 tracking-tight">
              {t('ctaSection.heading')}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
              {t('ctaSection.description')}
            </p>
            <p className="text-sm text-muted-foreground/60 mb-10">
              {t('ctaSection.note')}
            </p>
            <Link
              to={langPath('contact')}
              className="btn-secondary inline-flex items-center gap-2"
            >
              {t('ctaSection.cta')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-bagh-100 py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-7 h-7 bg-bagh-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-medium text-xs">B</span>
                </div>
                <span className="text-bagh-800 font-semibold">Baghlabs</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {tCommon('footer.description')}
              </p>
            </div>
            <div>
              <h4 className="text-foreground font-medium text-sm mb-4 uppercase tracking-wide">
                {tCommon('footer.quickLinks')}
              </h4>
              <ul className="space-y-2">
                {Object.entries(tCommon('footer.links', { returnObjects: true })).map(([key, label]) => (
                  <li key={key}>
                    <Link
                      to={linkTarget(key)}
                      className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-foreground font-medium text-sm mb-4 uppercase tracking-wide">
                {tCommon('footer.getInTouch')}
              </h4>
              <p className="text-muted-foreground text-sm mb-4">{tCommon('footer.readyText')}</p>
              <Link
                to={langPath('contact')}
                className="btn-secondary text-sm"
              >
                {tCommon('footer.workWithUs')}
              </Link>
            </div>
          </div>
          <div className="border-t border-bagh-100 mt-12 pt-6 flex flex-col items-center gap-2 text-center">
            <p className="text-muted-foreground text-xs">{tCommon('footer.copyright')}</p>
            <p className="text-muted-foreground/50 text-xs">{tCommon('footer.tagline')}</p>
            <button
              onClick={toggleLanguage}
              className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              {lang === 'en' ? 'NL' : 'EN'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CTASection
