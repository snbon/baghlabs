import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const ScenariosBlock = () => {
  const { t } = useTranslation('home')
  const items = t('scenarios.items', { returnObjects: true })

  return (
    <section className="relative bg-noir text-paper border-t border-paper/10">
      <div className="container-wide py-24 md:py-32">
        <div className="max-w-3xl mb-14 md:mb-20">
          <p className="eyebrow text-neon mb-6">{t('scenarios.eyebrow')}</p>
          <h2 className="display-2 text-paper">{t('scenarios.headline')}</h2>
          <p className="mt-6 text-lg md:text-xl text-paper/70 max-w-2xl">
            {t('scenarios.leadIn')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {items.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group rounded-md border border-paper/10 bg-noir-2 hover:border-violet/50 hover:shadow-glow-violet transition-all duration-200 flex flex-col overflow-hidden"
            >
              <div className="border-b border-paper/10 px-6 py-4 bg-noir-3/40">
                <span className="font-mono text-[10px] uppercase tracking-widest text-violet">{item.tag}</span>
              </div>
              <div className="p-6 md:p-7 flex-1 flex flex-col">
                <h3 className="font-display font-bold text-xl md:text-2xl leading-tight tracking-brut text-paper mb-4">
                  {item.title}
                </h3>
                <p className="text-paper/60 leading-snug">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ScenariosBlock
