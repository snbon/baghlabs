import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone, ClipboardList, Hammer, RefreshCcw } from 'lucide-react'
import SplitReveal from '@/components/motion/SplitReveal'

/* Planning timeline — Gantt-inspired project schedule visualization.
   Rows per phase, each row has a proportional duration bar positioned
   on a shared week ruler. Bar fills in on scroll. Intro Call node pulses. */

const PHASES = {
  nl: [
    {
      Icon: Phone,
      label: 'Intro call',
      duration: '30 min',
      startWeek: 0,
      lengthWeeks: 0.1,
      desc: 'Kennismaken, brief bespreken. Vrijblijvend.',
    },
    {
      Icon: ClipboardList,
      label: 'Blueprint',
      duration: '2 weken',
      startWeek: 0.2,
      lengthWeeks: 2,
      desc: 'Discovery + concreet build proposal. Paid, vaste prijs.',
    },
    {
      Icon: Hammer,
      label: 'Build & Launch',
      duration: '4–8 weken',
      startWeek: 2.4,
      lengthWeeks: 6,
      desc: 'We bouwen, testen en shippen. Docs + handover aan je team.',
    },
    {
      Icon: RefreshCcw,
      label: 'Continuous Improvement',
      duration: 'Monthly retainer',
      startWeek: 8.6,
      lengthWeeks: 3.4,
      desc: 'Monitoring, tuning, incremental releases. Op basis van gebruik.',
    },
  ],
  en: [
    {
      Icon: Phone,
      label: 'Intro call',
      duration: '30 min',
      startWeek: 0,
      lengthWeeks: 0.1,
      desc: 'Get acquainted, discuss the brief. No commitment.',
    },
    {
      Icon: ClipboardList,
      label: 'Blueprint',
      duration: '2 weeks',
      startWeek: 0.2,
      lengthWeeks: 2,
      desc: 'Discovery + concrete build proposal. Paid, fixed price.',
    },
    {
      Icon: Hammer,
      label: 'Build & Launch',
      duration: '4–8 weeks',
      startWeek: 2.4,
      lengthWeeks: 6,
      desc: 'We build, test, ship. Docs + handover to your team.',
    },
    {
      Icon: RefreshCcw,
      label: 'Continuous Improvement',
      duration: 'Monthly retainer',
      startWeek: 8.6,
      lengthWeeks: 3.4,
      desc: 'Monitoring, tuning, incremental releases. Based on usage.',
    },
  ],
}

const LABELS = {
  nl: {
    chapter: 'Planning',
    headline: 'Van intro call tot productie.',
    scaleLabel: 'Weken',
    weekLabel: 'W',
    ongoing: 'doorlopend',
  },
  en: {
    chapter: 'Planning',
    headline: 'From intro call to production.',
    scaleLabel: 'Weeks',
    weekLabel: 'W',
    ongoing: 'ongoing',
  },
}

const TOTAL_WEEKS = 12

const PlanningTimeline = ({ lang = 'nl' }) => {
  const phases = PHASES[lang] || PHASES.nl
  const labels = LABELS[lang] || LABELS.nl

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 30%'],
  })

  return (
    <div ref={ref}>
      {/* Header */}
      <div className="flex items-baseline justify-between mb-4">
        <p className="chapter">{labels.chapter}</p>
        <span className="smallcaps text-paper/40 hidden md:inline">
          Intro call → Live
        </span>
      </div>
      <h2 className="poster-2 max-w-[24ch] mb-10 md:mb-16">
        <SplitReveal trigger="view" stagger={45}>
          {labels.headline}
        </SplitReveal>
      </h2>

      {/* Gantt-style schedule */}
      <div className="relative rounded-md border border-paper/10 bg-noir-2 overflow-hidden">
        {/* Week ruler */}
        <div className="hidden md:grid grid-cols-[minmax(220px,320px)_1fr] border-b border-paper/10">
          <div className="px-6 py-3 border-r border-paper/10">
            <span className="smallcaps text-paper/40">{labels.scaleLabel}</span>
          </div>
          <div className="relative h-10">
            {Array.from({ length: TOTAL_WEEKS + 1 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 flex items-center"
                style={{ left: `${(i / TOTAL_WEEKS) * 100}%` }}
              >
                <span
                  className="font-mono text-[10px] text-paper/35 -translate-x-1/2"
                  style={{ display: i === TOTAL_WEEKS ? 'none' : 'block' }}
                >
                  {labels.weekLabel}
                  {i + 1}
                </span>
              </div>
            ))}
            {/* Vertical grid lines */}
            {Array.from({ length: TOTAL_WEEKS + 1 }).map((_, i) => (
              <div
                key={`g-${i}`}
                className="absolute top-6 bottom-0 w-px bg-paper/8"
                style={{ left: `${(i / TOTAL_WEEKS) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-paper/8">
          {phases.map((phase, i) => (
            <PhaseRow
              key={i}
              phase={phase}
              index={i}
              total={phases.length}
              progress={scrollYProgress}
              totalWeeks={TOTAL_WEEKS}
              ongoing={labels.ongoing}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const PhaseRow = ({ phase, index, total, progress, totalWeeks, ongoing }) => {
  const { Icon, label, duration, startWeek, lengthWeeks, desc } = phase
  const isIntro = index === 0
  const isOngoing = index === total - 1

  // Segment of the section-scroll during which THIS phase's bar fills in.
  const start = (index / total) * 0.7
  const end = ((index + 1) / total) * 0.7 + 0.1
  const fill = useTransform(progress, [start, end], [0, 1])

  const barLeftPct = (startWeek / totalWeeks) * 100
  const barWidthPct = (lengthWeeks / totalWeeks) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(220px,320px)_1fr]">
      {/* Left column: phase label + icon + meta */}
      <div className="px-6 py-6 md:border-r md:border-paper/10 flex md:block">
        <div className="flex items-start gap-4">
          <div
            className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center bg-noir shrink-0 ${
              isIntro
                ? 'border-oxblood shadow-[0_0_16px_-2px_rgba(156,38,38,0.6)]'
                : 'border-oxblood/60'
            }`}
          >
            <Icon className="w-4 h-4 text-oxblood" strokeWidth={1.5} />
            {isIntro && (
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-oxblood"
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
          </div>
          <div className="flex-1">
            <p className="smallcaps text-oxblood mb-1.5">
              {String(index + 1).padStart(2, '0')} · {duration}
            </p>
            <p
              className="font-display font-bold text-paper leading-none"
              style={{ fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)', letterSpacing: '-0.02em' }}
            >
              {label}
            </p>
            <p className="text-paper/60 text-sm mt-2 leading-snug max-w-xs">{desc}</p>
          </div>
        </div>
      </div>

      {/* Right column: Gantt bar */}
      <div className="relative min-h-[64px] md:min-h-full px-6 py-6 md:px-0 md:py-0">
        {/* Mobile duration line (compact) */}
        <div className="md:hidden pl-14">
          <div className="h-1.5 rounded-full bg-paper/10 overflow-hidden relative">
            <motion.div
              className={`absolute inset-y-0 left-0 ${isIntro ? 'bg-oxblood' : 'bg-oxblood/70'}`}
              style={{ width: '100%', scaleX: fill, transformOrigin: 'left' }}
            />
          </div>
        </div>

        {/* Desktop Gantt bar aligned to week ruler */}
        <div className="hidden md:block relative h-full min-h-[80px]">
          {/* Vertical grid lines aligned with header */}
          {Array.from({ length: totalWeeks + 1 }).map((_, w) => (
            <div
              key={w}
              className="absolute top-0 bottom-0 w-px bg-paper/6"
              style={{ left: `${(w / totalWeeks) * 100}%` }}
            />
          ))}

          {/* The bar */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-10 rounded-sm overflow-hidden"
            style={{
              left: `${barLeftPct}%`,
              width: `${barWidthPct}%`,
            }}
          >
            {/* Bar background rail */}
            <div className="absolute inset-0 bg-paper/10 border border-paper/15" />
            {/* Bar fill — animates in on scroll */}
            <motion.div
              style={{ scaleX: fill, transformOrigin: 'left' }}
              className={`absolute inset-0 ${
                isOngoing
                  ? 'bg-gradient-to-r from-oxblood to-oxblood/30'
                  : 'bg-oxblood'
              }`}
            />
            {/* Duration label inside bar */}
            <div className="absolute inset-0 flex items-center px-3 pointer-events-none">
              <span className="font-mono text-[10px] text-paper mix-blend-difference">
                {duration}
              </span>
            </div>
            {/* If ongoing — dashed continuation */}
            {isOngoing && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full flex items-center gap-2 pl-2">
                <div className="h-px w-6 border-t border-dashed border-oxblood/50" />
                <span className="smallcaps text-oxblood/70 whitespace-nowrap">
                  {ongoing}
                </span>
              </div>
            )}
          </div>

          {/* Start marker (small notch below the bar) */}
          <div
            className="absolute bottom-3 h-2 border-l border-oxblood"
            style={{ left: `${barLeftPct}%` }}
          />
          {/* Week span text below bar */}
          <div
            className="absolute bottom-0 font-mono text-[10px] text-paper/40 whitespace-nowrap"
            style={{ left: `${barLeftPct}%` }}
          >
            {isIntro
              ? 'day 1'
              : `W${Math.max(1, Math.round(startWeek + 1))}–W${Math.round(
                  startWeek + lengthWeeks
                )}`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanningTimeline
