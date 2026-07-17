import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLangPath } from '@/lib/usePathAlternate'

const PillarGrid = () => {
  const { t } = useTranslation('home')
  const langPath = useLangPath()
  const items = t('pillars.items', { returnObjects: true })
  const foundation = t('pillars.foundation', { returnObjects: true })

  return (
    <section id="pillars" className="relative bg-noir text-paper border-t border-paper/10">
      <div className="container-wide py-24 md:py-32">
        <div className="max-w-3xl mb-14 md:mb-20">
          <p className="eyebrow text-neon mb-6">{t('pillars.eyebrow')}</p>
          <h2 className="display-2 text-paper">{t('pillars.headline')}</h2>
        </div>

        {/* 2x2 dark cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to={langPath('services', item.id)}
                className="group block h-full rounded-md border border-paper/10 bg-noir-2 p-8 md:p-10 min-h-[280px] md:min-h-[340px] transition-all duration-200 hover:border-neon/50 hover:shadow-glow-sm hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-10 md:mb-12">
                  <span className="font-mono text-xs text-paper/40">{item.number}</span>
                  <span className="font-mono text-xs text-paper/40 group-hover:text-neon group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight tracking-brut text-paper mb-4 group-hover:text-neon transition-colors">
                  {item.title}
                </h3>
                <p className="text-base md:text-lg leading-snug text-paper/60 max-w-md">
                  {item.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Foundation strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
          className="mt-8 md:mt-10"
        >
          <Link
            to={langPath('services', 'softwareontwikkeling')}
            className="group block rounded-md border border-paper/10 bg-noir-2 transition-all duration-200 hover:border-neon/50 hover:shadow-glow-sm relative overflow-hidden"
          >
            <span className="absolute left-0 top-0 bottom-0 w-px bg-neon shadow-glow-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
              <div className="md:w-1/3">
                <p className="eyebrow text-neon mb-2">{foundation.eyebrow}</p>
                <h4 className="font-display font-bold text-2xl md:text-3xl leading-tight tracking-brut text-paper group-hover:text-neon transition-colors">
                  {foundation.title}
                </h4>
              </div>
              <p className="md:flex-1 text-paper/60 md:text-lg leading-snug">
                {foundation.description}
              </p>
              <span className="font-mono text-sm text-paper/40 group-hover:text-neon transition-colors">→</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default PillarGrid
