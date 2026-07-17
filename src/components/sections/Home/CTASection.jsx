import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useCurrentLang, usePathAlternate, useLangPath } from '@/lib/usePathAlternate'
import { GlowButton } from '@/components/ui/glow-button'

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

  const links = tCommon('footer.links', { returnObjects: true })
  const linkTarget = (key) => {
    if (key === 'home') return langPath('home')
    if (key === 'cases') return langPath('projects')
    if (key === 'services') return langPath('services', 'ai-workflows')
    if (key === 'about') return langPath('about')
    if (key === 'contact') return langPath('contact')
    return langPath('home')
  }

  return (
    <div className="bg-noir text-paper">
      {/* CTA slab */}
      <section className="relative overflow-hidden border-t border-paper/10">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 halo-neon pointer-events-none" />
        <div className="container-wide relative py-28 md:py-40">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4 }}
            className="eyebrow mb-6 md:mb-10 text-neon"
          >
            {t('cta.eyebrow')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="display-1 max-w-[16ch] text-paper"
          >
            {t('cta.headline')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 md:mt-10 max-w-2xl text-lg md:text-xl text-paper/70"
          >
            {t('cta.body')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 md:mt-14 flex flex-wrap gap-4"
          >
            <GlowButton asChild variant="neon" size="lg">
              <Link to={langPath('contact')}>{t('cta.primary')} →</Link>
            </GlowButton>
            <GlowButton asChild variant="ghost" size="lg">
              <Link to={langPath('contact')}>{t('cta.secondary')}</Link>
            </GlowButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-noir-2 border-t border-paper/10">
        <div className="container-wide py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-sm bg-neon flex items-center justify-center">
                  <span className="text-noir font-display font-bold text-sm">B</span>
                </div>
                <span className="font-display font-bold text-xl tracking-brut text-paper">baghlabs</span>
              </div>
              <p className="text-paper/60 max-w-md leading-relaxed">
                {tCommon('footer.description')}
              </p>
            </div>
            <div className="md:col-span-3">
              <h4 className="eyebrow mb-5">
                {tCommon('footer.quickLinks')}
              </h4>
              <ul className="space-y-3">
                {Object.entries(links).map(([key, label]) => (
                  <li key={key}>
                    <Link
                      to={linkTarget(key)}
                      className="text-paper/80 hover:text-neon transition-colors font-display text-base"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4">
              <h4 className="eyebrow mb-5">
                {tCommon('footer.getInTouch')}
              </h4>
              <p className="text-paper/60 mb-6 leading-relaxed">
                {tCommon('footer.readyText')}
              </p>
              <GlowButton asChild variant="neon" size="md">
                <Link to={langPath('contact')}>{tCommon('footer.workWithUs')} →</Link>
              </GlowButton>
            </div>
          </div>
          <div className="border-t border-paper/10 mt-14 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <p className="text-paper/40 text-xs font-mono">{tCommon('footer.copyright')}</p>
              <p className="text-paper/25 text-xs hidden md:inline">·</p>
              <p className="text-paper/40 text-xs">{tCommon('footer.tagline')}</p>
            </div>
            <button
              onClick={toggleLanguage}
              className="font-mono text-[10px] uppercase tracking-widest border border-paper/20 text-paper/70 hover:text-neon hover:border-neon/60 hover:shadow-glow-sm px-3 py-2 rounded-sm transition-all"
              aria-label="Switch language"
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
