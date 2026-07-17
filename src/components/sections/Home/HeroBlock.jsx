import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLangPath } from '@/lib/usePathAlternate'
import { GlowButton } from '@/components/ui/glow-button'

const HeroBlock = () => {
  const { t } = useTranslation('home')
  const langPath = useLangPath()

  return (
    <section className="relative bg-noir text-paper overflow-hidden">
      {/* Faint grid */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      {/* Neon halo behind headline */}
      <div className="absolute inset-0 halo-neon pointer-events-none" />
      {/* Violet accent halo */}
      <div className="absolute inset-0 halo-violet pointer-events-none" />

      <div className="container-wide relative pt-40 md:pt-48 pb-24 md:pb-32 min-h-[92vh] flex flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="eyebrow text-neon mb-8 md:mb-12 flex items-center gap-3"
        >
          <span className="inline-block w-8 h-px bg-neon shadow-glow-sm" />
          {t('hero.eyebrow')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="display-1 max-w-[20ch] text-paper"
        >
          {t('hero.headline')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 md:mt-12 max-w-2xl text-lg md:text-xl text-paper/70 leading-relaxed"
        >
          {t('hero.subline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-10 md:mt-14 flex flex-wrap gap-4"
        >
          <GlowButton asChild variant="neon" size="lg">
            <Link to={langPath('contact')}>{t('hero.primaryCta')} →</Link>
          </GlowButton>
          <GlowButton asChild variant="ghost" size="lg">
            <a href="#pillars">{t('hero.secondaryCta')}</a>
          </GlowButton>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="hidden md:flex absolute bottom-10 left-10 items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-paper/40"
        >
          <span className="w-px h-8 bg-paper/20" />
          scroll
        </motion.div>
      </div>

      {/* Marquee strip */}
      <div className="relative border-t border-paper/10 bg-noir-2 overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap py-4 font-mono text-xs uppercase tracking-widest text-paper/40">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-16 shrink-0">
              <span>Workflow Systems</span>
              <span className="text-neon/60">/</span>
              <span>Private Knowledge</span>
              <span className="text-neon/60">/</span>
              <span>Document Intelligence</span>
              <span className="text-neon/60">/</span>
              <span>Systems Integration</span>
              <span className="text-neon/60">/</span>
              <span>Human-in-the-loop</span>
              <span className="text-neon/60">/</span>
              <span>Audit-ready</span>
              <span className="text-neon/60">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroBlock
