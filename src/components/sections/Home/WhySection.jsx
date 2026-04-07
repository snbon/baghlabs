import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const WhySection = () => {
  const { t } = useTranslation('home')
  const reasons = t('why.reasons', { returnObjects: true })

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="container-custom py-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-semibold text-foreground mb-16 tracking-tight"
        >
          {t('why.heading')}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="space-y-4"
            >
              <div className="w-8 h-0.5 bg-foreground" />
              <h3 className="text-xl font-semibold text-foreground">{reason.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhySection
