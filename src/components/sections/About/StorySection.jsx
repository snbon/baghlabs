import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const StorySection = () => {
  const { t } = useTranslation('about')
  const pillars = t('story.pillars', { returnObjects: true })

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            {t('story.heading')}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
            {t('story.intro')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="space-y-4"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                {pillar.label}
              </p>
              <div className="w-8 h-0.5 bg-foreground" />
              <h3 className="text-xl font-semibold text-foreground">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StorySection
