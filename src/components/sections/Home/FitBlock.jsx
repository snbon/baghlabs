import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const FitBlock = () => {
  const { t } = useTranslation('home')
  const yes = t('fit.yes', { returnObjects: true })
  const no = t('fit.no', { returnObjects: true })

  return (
    <section className="relative bg-noir text-paper border-t border-paper/10">
      <div className="container-wide py-24 md:py-32">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow text-neon mb-6">{t('fit.eyebrow')}</p>
          <h2 className="display-2 text-paper">{t('fit.headline')}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
            className="rounded-md border border-paper/10 bg-noir-2 overflow-hidden relative"
          >
            <span className="absolute left-0 top-0 bottom-0 w-px bg-neon shadow-glow-sm" />
            <div className="px-6 py-4 border-b border-paper/10 flex items-center gap-3 bg-noir-3/40">
              <span className="font-mono text-lg text-neon">+</span>
              <h3 className="font-display font-bold text-xl md:text-2xl leading-tight tracking-brut text-paper">
                {t('fit.yesTitle')}
              </h3>
            </div>
            <ul className="p-6 md:p-7 space-y-3">
              {yes.map((item, i) => (
                <li key={i} className="flex gap-3 text-paper/80 leading-snug">
                  <span className="font-mono text-neon shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="rounded-md border border-paper/10 bg-noir-2 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-paper/10 flex items-center gap-3 bg-noir-3/40">
              <span className="font-mono text-lg text-paper/40">×</span>
              <h3 className="font-display font-bold text-xl md:text-2xl leading-tight tracking-brut text-paper/70">
                {t('fit.noTitle')}
              </h3>
            </div>
            <ul className="p-6 md:p-7 space-y-3">
              {no.map((item, i) => (
                <li key={i} className="flex gap-3 text-paper/50 leading-snug">
                  <span className="font-mono text-paper/30 shrink-0">×</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FitBlock
