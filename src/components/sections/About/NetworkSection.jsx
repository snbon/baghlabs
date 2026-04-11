import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const NetworkSection = () => {
  const { t } = useTranslation('about')

  return (
    <div className="w-full flex items-center justify-center py-28">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              {t('network.label')}
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              {t('network.heading')}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              {t('network.description')}
            </p>
            <p className="text-sm text-foreground font-medium border-l-2 border-foreground pl-4">
              {t('network.note')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {['Development', 'Branding', 'Marketing', 'Strategy'].map((tag, i) => (
              <div
                key={i}
                className="border border-bagh-200 rounded-2xl p-6 flex items-center justify-center"
              >
                <span className="text-sm font-light text-muted-foreground">{tag}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default NetworkSection
