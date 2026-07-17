import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const ComparisonTable = () => {
  const { t } = useTranslation('home')
  const rows = t('comparison.rows', { returnObjects: true })

  return (
    <section className="relative bg-noir text-paper border-t border-paper/10">
      <div className="container-wide py-24 md:py-32">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow text-neon mb-6">{t('comparison.eyebrow')}</p>
          <h2 className="display-2 text-paper">{t('comparison.headline')}</h2>
          <p className="mt-6 md:mt-8 text-lg md:text-xl text-paper/70 max-w-2xl">
            {t('comparison.leadIn')}
          </p>
        </div>

        <div className="rounded-md border border-paper/10 bg-noir-2 overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-[auto_1fr_1fr] md:grid-cols-[80px_1fr_1fr] border-b border-paper/10 bg-noir-3">
            <div className="p-4 md:p-5 font-mono uppercase tracking-widest text-[10px] text-paper/40 border-r border-paper/10">
              //
            </div>
            <div className="p-4 md:p-5 font-mono uppercase tracking-widest text-[10px] text-paper/50 border-r border-paper/10">
              {t('comparison.columnA')}
            </div>
            <div className="p-4 md:p-5 font-mono uppercase tracking-widest text-[10px] text-neon">
              {t('comparison.columnB')}
            </div>
          </div>
          {rows.map((row, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              className="grid grid-cols-[auto_1fr_1fr] md:grid-cols-[80px_1fr_1fr] border-t border-paper/5 group hover:bg-noir-3/40 transition-colors"
            >
              <div className="p-4 md:p-6 font-mono text-xs text-paper/30 border-r border-paper/5">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div className="p-4 md:p-6 text-paper/40 line-through decoration-paper/20 decoration-1 border-r border-paper/5 leading-snug">
                {row.a}
              </div>
              <div className="p-4 md:p-6 text-paper leading-snug relative">
                <span className="text-neon mr-2 font-mono">✓</span>
                {row.b}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ComparisonTable
