import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLangPath } from '@/lib/usePathAlternate'
import VantaHalo from '@/components/ui/vanta-halo'
import CursorSpotlight from '@/components/motion/CursorSpotlight'
import SplitReveal from '@/components/motion/SplitReveal'
import { ArrowDown, ArrowRight } from 'lucide-react'

const HeroBlock = () => {
  const { t } = useTranslation('home')
  const langPath = useLangPath()

  return (
    <section className="relative bg-noir text-paper h-screen flex flex-col overflow-hidden">
      {/* Vanta halo */}
      <VantaHalo className="absolute inset-0 z-0" />

      {/* Reduce Vanta luminance to protect text */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(12,10,8,0.45) 0%, rgba(12,10,8,0.25) 40%, rgba(12,10,8,0.75) 100%)',
        }}
      />

      {/* Cursor spotlight */}
      <CursorSpotlight />

      <div className="w-full relative z-10 flex-1 flex flex-col pt-24 md:pt-28 pb-8 md:pb-10 px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Chapter row */}
        <div className="flex items-baseline justify-between">
          <span className="chapter" style={{ color: '#9C2626' }}>
            <SplitReveal trigger="load" delay={100} stagger={30}>
              {t('chapters.manifest')}
            </SplitReveal>
          </span>
        </div>

        <div className="rule-oxblood mt-4 mb-8 md:mb-12" />

        {/* Poster h1 + tagline, constrained so it can never push the CTA
            off-screen. min-h-0 lets the flex-1 shrink; overflow-hidden
            clips any residual overflow inside this block rather than the
            section (which would eat the CTA). */}
        <div className="flex-1 min-h-0 flex flex-col justify-center gap-4 md:gap-6 overflow-hidden">
          <h1 className="poster-1 text-paper">
            <span className="block">
              <SplitReveal trigger="load" delay={300} stagger={70}>
                {t('hero.titleLine1')}
              </SplitReveal>
            </span>
            <span
              className="block italic text-oxblood"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
            >
              <SplitReveal trigger="load" delay={600} stagger={70}>
                {t('hero.titleLine2')}
              </SplitReveal>
            </span>
            <span className="block">
              <SplitReveal trigger="load" delay={900} stagger={70}>
                {t('hero.titleLine3')}
              </SplitReveal>
            </span>
          </h1>

          <p
            className="max-w-2xl font-display italic text-base md:text-lg text-paper/70 opacity-0 leading-snug"
            style={{
              animation: 'fadeIn 0.9s ease-out 1.3s forwards',
            }}
          >
            {t('hero.tagline')}
          </p>
        </div>

        {/* Bottom row: CTA + scroll cue */}
        <div
          className="mt-8 md:mt-10 flex items-end justify-between border-t border-paper/15 pt-5 md:pt-6 opacity-0"
          style={{ animation: 'fadeIn 0.9s ease-out 1.6s forwards' }}
        >
          <Link
            to={langPath('contact')}
            className="group inline-flex items-baseline gap-3 md:gap-4"
          >
            <span className="chapter text-oxblood">▸</span>
            <span className="font-display font-bold text-2xl md:text-4xl text-paper leading-none border-b-2 border-oxblood pb-1 group-hover:pb-1.5 group-hover:border-paper transition-all">
              {t('hero.primaryCta')}
            </span>
            <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-oxblood group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#work"
            className="hidden md:flex items-center gap-2 smallcaps text-paper/40 hover:text-paper transition-colors"
          >
            <span>Scroll</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroBlock
