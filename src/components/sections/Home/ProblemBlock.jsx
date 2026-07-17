import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const ProblemBlock = () => {
  const { t } = useTranslation('home')

  return (
    <section className="relative bg-noir text-paper border-t border-paper/10">
      <div className="container-wide py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4 }}
            className="md:col-span-3 flex md:flex-col gap-3 md:gap-4"
          >
            <span className="inline-block w-8 h-px bg-neon shadow-glow-sm mt-3 md:mt-4" />
            <p className="eyebrow text-neon">{t('problem.eyebrow')}</p>
          </motion.div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="display-2 max-w-[22ch] text-paper"
            >
              {t('problem.headline')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8 md:mt-12 max-w-3xl text-lg md:text-xl leading-relaxed text-paper/70"
            >
              {t('problem.body')}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemBlock
