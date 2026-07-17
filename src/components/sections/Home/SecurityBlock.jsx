import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const SecurityBlock = () => {
  const { t } = useTranslation('home')
  const points = t('security.points', { returnObjects: true })

  return (
    <section className="relative bg-noir text-paper border-t border-paper/10 overflow-hidden">
      <div className="absolute inset-0 halo-violet pointer-events-none" />
      <div className="container-wide relative py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4 }}
              className="eyebrow text-violet mb-6"
            >
              {t('security.eyebrow')}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="display-2 text-paper"
            >
              {t('security.headline')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8 text-lg md:text-xl leading-relaxed text-paper/70"
            >
              {t('security.body')}
            </motion.p>
          </div>
          <div className="md:col-span-7">
            <div className="rounded-md border border-paper/10 bg-noir-2 divide-y divide-paper/5 overflow-hidden">
              {points.map((point, idx) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="p-6 md:p-7 flex gap-6 group hover:bg-noir-3/40 transition-colors"
                >
                  <span className="font-mono text-xs text-paper/30 shrink-0 pt-1 group-hover:text-violet transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-xl md:text-2xl leading-tight tracking-brut text-paper mb-2">
                      {point.title}
                    </h4>
                    <p className="text-paper/60 leading-snug">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecurityBlock
