import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const StorySection = () => {
  const { t } = useTranslation('about')
  const pillars = t('story.pillars', { returnObjects: true })

  return (
    <section className="bg-noir text-paper border-b border-paper/10">
      <div className="container-wide py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14 md:mb-20"
        >
          <p className="eyebrow text-neon mb-6">// {t('story.heading')}</p>
          <h2 className="display-2 text-paper">{t('story.intro')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group rounded-md border border-paper/10 bg-noir-2 p-8 md:p-10 hover:border-neon/40 hover:shadow-glow-sm transition-all duration-200"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-paper/40 mb-6 group-hover:text-neon transition-colors">
                {pillar.label}
              </p>
              <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight tracking-brut text-paper mb-5">
                {pillar.title}
              </h3>
              <p className="text-paper/60 leading-snug">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StorySection
