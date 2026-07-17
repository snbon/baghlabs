import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const ProcessStages = () => {
  const { t } = useTranslation('home')
  const stages = t('process.stages', { returnObjects: true })

  return (
    <section className="relative bg-noir text-paper border-t border-paper/10">
      <div className="container-wide py-24 md:py-32">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow text-neon mb-6">{t('process.eyebrow')}</p>
          <h2 className="display-2 text-paper">{t('process.headline')}</h2>
        </div>

        <div className="space-y-5 md:space-y-6">
          {stages.map((stage) => (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4 }}
              className="group rounded-md border border-paper/10 bg-noir-2 hover:border-neon/40 hover:shadow-glow-sm transition-all duration-200 overflow-hidden relative"
            >
              <span className="absolute left-0 top-0 bottom-0 w-px bg-neon shadow-glow-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
                <div className="p-8 md:p-10 md:w-56 md:min-w-56 flex md:flex-col justify-between md:justify-start items-start gap-6 md:gap-8 border-b md:border-b-0 md:border-r border-paper/10 bg-noir-3/40">
                  <span className="font-display font-bold text-5xl md:text-6xl leading-none tracking-brut-tight text-neon">
                    {stage.number}
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-paper/50">{stage.priceLabel}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-paper/30 mt-1.5">{stage.duration}</p>
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight tracking-brut text-paper mb-4 md:mb-5">
                    {stage.title}
                  </h3>
                  <p className="text-paper/70 md:text-lg leading-snug max-w-2xl mb-6 md:mb-8">
                    {stage.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                    {stage.outputs.map((out, i) => (
                      <li key={i} className="flex gap-3 text-paper/60 text-sm md:text-base leading-snug">
                        <span className="font-mono text-neon shrink-0">·</span>
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessStages
