import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const ROMAN = ['I', 'II', 'III']

const StorySection = () => {
  const { t } = useTranslation('about')
  const pillars = t('story.pillars', { returnObjects: true })

  return (
    <section className="bg-noir text-paper border-b border-oxblood">
      <div className="container-wide py-24 md:py-32">
        <div className="flex items-baseline justify-between mb-14 md:mb-20">
          <div>
            <p className="chapter mb-4">Cap. II, Achtergrond</p>
            <h2 className="poster-2 max-w-[16ch]">{t('story.heading')}</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-16">
          <p className="md:col-span-5 font-display text-xl md:text-2xl leading-snug text-paper/85 italic">
            {t('story.intro')}
          </p>

          <ol className="md:col-span-7 divide-y divide-paper/15 border-t border-b border-paper/15">
            {pillars.map((pillar, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="py-6 md:py-8"
              >
                <div className="grid grid-cols-12 gap-4 items-baseline">
                  <span className="col-span-2 font-display font-bold text-3xl md:text-4xl text-oxblood leading-none">
                    {ROMAN[index]}
                  </span>
                  <div className="col-span-10">
                    <p className="smallcaps text-paper/45 mb-2">{pillar.label}</p>
                    <h3 className="poster-3 mb-3">{pillar.title}</h3>
                    <p className="text-paper/70 leading-snug">{pillar.description}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default StorySection
