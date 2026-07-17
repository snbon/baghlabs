import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const NetworkSection = () => {
  const { t } = useTranslation('about')

  return (
    <section className="relative bg-noir text-paper border-b border-paper/10 overflow-hidden">
      <div className="absolute inset-0 halo-violet pointer-events-none" />
      <div className="container-wide relative py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow text-violet mb-6">// {t('network.label')}</p>
            <h2 className="display-2 mb-8 text-paper">{t('network.heading')}</h2>
            <p className="text-lg md:text-xl leading-relaxed text-paper/75">
              {t('network.description')}
            </p>
            <p className="mt-8 border-l-2 border-violet pl-5 text-paper/60 italic">
              {t('network.note')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 gap-4 md:gap-5"
          >
            {['Systems', 'Frontend', 'Data', 'Strategy'].map((tag, i) => (
              <div
                key={i}
                className="group rounded-md border border-paper/10 bg-noir-2 aspect-square flex items-center justify-center hover:border-neon/50 hover:shadow-glow-sm transition-all duration-200"
              >
                <span className="font-display font-bold text-xl md:text-2xl tracking-brut text-paper group-hover:text-neon transition-colors">
                  {tag}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default NetworkSection
