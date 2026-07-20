import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const NetworkSection = () => {
  const { t } = useTranslation('about')

  return (
    <section className="bg-noir-2 text-paper border-b border-oxblood">
      <div className="container-wide py-24 md:py-32">
        <div className="flex items-baseline justify-between mb-14 md:mb-20">
          <p className="chapter">Cap. III, {t('network.label')}</p>
          <span className="smallcaps text-paper/40 hidden md:inline">Uitbreiding</span>
        </div>
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7"
          >
            <h2 className="poster-2 mb-8">{t('network.heading')}</h2>
            <p className="text-lg md:text-xl leading-relaxed text-paper/80 max-w-2xl">
              {t('network.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 grid grid-cols-2 gap-3"
          >
            {['Systems', 'Frontend', 'Data', 'Strategy'].map((tag, i) => (
              <div
                key={i}
                className="frame bg-noir aspect-square flex flex-col items-start justify-between p-4"
              >
                <span className="smallcaps text-oxblood">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display font-bold text-xl md:text-2xl leading-none">
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
