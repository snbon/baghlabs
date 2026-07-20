import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useCurrentLang, usePathAlternate, useLangPath } from '@/lib/usePathAlternate'
import { pillars } from '@/data/services'
import SplitReveal from '@/components/motion/SplitReveal'

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

  return (
    <div>
      {/* CTA slab */}
      <section className="relative bg-noir text-paper border-t border-paper/10 overflow-hidden">
        <div className="container-wide py-24 md:py-40 relative">
          <div className="flex items-baseline justify-between mb-14 md:mb-20">
            <span className="chapter">Cap. V — Volgende stap</span>
            <span className="smallcaps text-paper/40 hidden md:inline">Colofon</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="poster-1 max-w-[14ch] text-paper mb-10 md:mb-14"
          >
            <SplitReveal trigger="view" stagger={55}>
              {t('cta.headline')}
            </SplitReveal>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display italic text-xl md:text-2xl text-paper/70 max-w-2xl mb-10 md:mb-16"
          >
            {t('cta.body')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-12 border-t border-paper/20 pt-8"
          >
            <div className="flex items-baseline gap-4">
              <span className="chapter text-oxblood">▸</span>
              <Link
                to={langPath('contact')}
                className="font-display font-bold text-3xl md:text-5xl text-paper hover:text-oxblood transition-colors leading-none border-b-2 border-oxblood pb-1 hover:pb-1.5"
              >
                {t('cta.primary')}
              </Link>
            </div>
            <Link
              to={langPath('contact')}
              className="smallcaps text-paper/60 hover:text-oxblood border-b border-paper/25 hover:border-oxblood pb-1"
            >
              {t('cta.secondary')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Colophon footer */}
      <footer className="relative bg-noir-2 text-paper border-t border-paper/10">
        <div className="container-wide py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
            <div className="md:col-span-6">
              <h3 className="poster-2 mb-6">baghlabs</h3>
              <p className="text-paper/60 max-w-md mb-6 leading-relaxed">
                {tCommon('footer.description')}
              </p>
              <div className="smallcaps text-paper/40 space-y-1">
                <p>MMXXVI · Vlaanderen</p>
                <p>Studio · Één contact</p>
              </div>
            </div>

            <div className="md:col-span-6">
              <p className="chapter mb-6">Index</p>
              <ul className="border-t border-paper/15">
                {[
                  { key: 'projects', label: tCommon('nav.cases'), href: langPath('projects') },
                  { key: 'services', label: tCommon('nav.services'), href: `${langPath('home')}#pillars` },
                  { key: 'about', label: tCommon('nav.about'), href: langPath('about') },
                  { key: 'contact', label: tCommon('nav.contact'), href: langPath('contact') },
                ].map((item, i) => (
                  <li key={item.key} className="border-b border-paper/15">
                    <Link
                      to={item.href}
                      className="group flex items-baseline gap-4 py-3 text-paper hover:text-oxblood transition-colors"
                    >
                      <span className="smallcaps text-oxblood w-10 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-xl">{item.label}</span>
                      <span className="dot-leader" />
                      <span className="smallcaps text-paper/40 group-hover:text-oxblood">→</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="chapter mb-4">Diensten</p>
                <ul className="space-y-1">
                  {pillars.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={langPath('services', p.id)}
                        className="font-display text-base text-paper/70 hover:text-oxblood transition-colors"
                      >
                        {p.label[lang] || p.label.nl}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-paper/15 mt-14 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="smallcaps text-paper/40">{tCommon('footer.copyright')}</p>
            <div className="flex items-center gap-2 smallcaps">
              <button
                onClick={toggleLanguage}
                className={`px-2 py-1 transition-colors ${lang === 'nl' ? 'text-oxblood border-b border-oxblood' : 'text-paper/50 hover:text-oxblood'}`}
              >
                NL
              </button>
              <span className="text-paper/25">·</span>
              <button
                onClick={toggleLanguage}
                className={`px-2 py-1 transition-colors ${lang === 'en' ? 'text-oxblood border-b border-oxblood' : 'text-paper/50 hover:text-oxblood'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CTASection
