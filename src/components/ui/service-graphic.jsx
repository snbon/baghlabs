import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Inbox,
  Cog,
  CheckCircle2,
  FileText,
  Search,
  Sparkles,
  Boxes,
  Circle,
  Terminal,
  Play,
} from 'lucide-react'

/* Per-pillar mini-UI mockup that visualizes the service in action.
   Each is a small self-contained animated component. All share the
   same dark frame + subtle oxblood halo. */

const Frame = ({ children }) => (
  <div className="relative rounded-md border border-paper/10 bg-noir-2 overflow-hidden">
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(closest-side at 50% 40%, rgba(156,38,38,0.12), transparent 70%)',
      }}
    />
    <div className="relative p-6 md:p-10">{children}</div>
  </div>
)

const Chrome = ({ title, badge }) => (
  <div className="flex items-center justify-between mb-5 pb-3 border-b border-paper/10">
    <div className="flex items-center gap-3">
      <span className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-paper/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-paper/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-paper/20" />
      </span>
      <span className="smallcaps text-paper/60">{title}</span>
    </div>
    {badge && (
      <span className="smallcaps text-oxblood border border-oxblood/40 px-2 py-0.5 rounded-sm">
        {badge}
      </span>
    )}
  </div>
)

/* ─── 1. AI WORKFLOWS — Kanban board with cards flowing through columns ─── */
const WorkflowsBoard = ({ lang }) => {
  const cols = lang === 'en' ? ['Inbox', 'Processing', 'Done'] : ['Inbox', 'Verwerken', 'Klaar']
  const items = [
    { id: 'a', label: 'Invoice #4521', meta: '€1,240 · Acme' },
    { id: 'b', label: 'Support #98', meta: 'P2 · 4h SLA' },
    { id: 'c', label: 'PO #2214', meta: 'Draft · pending' },
    { id: 'd', label: 'Contract #17', meta: 'Review · legal' },
  ]
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800)
    return () => clearInterval(id)
  }, [])
  // Each item cycles inbox → processing → done → gone with an offset.
  const positionFor = (i) => {
    const phase = (tick + i * 2) % 6
    if (phase < 2) return 0
    if (phase < 4) return 1
    return 2
  }
  return (
    <Frame>
      <Chrome title="Ops board · live" badge={lang === 'en' ? 'auto' : 'auto'} />
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {cols.map((c, ci) => (
          <div key={ci} className="rounded-sm border border-paper/10 bg-noir-3 p-3 min-h-[220px]">
            <div className="flex items-center justify-between mb-3">
              <span className="smallcaps text-paper/50">{c}</span>
              <span className="smallcaps text-oxblood">
                {items.filter((_, i) => positionFor(i) === ci).length}
              </span>
            </div>
            <div className="space-y-2">
              <AnimatePresence>
                {items.map((it, i) =>
                  positionFor(i) === ci ? (
                    <motion.div
                      key={it.id}
                      layout
                      layoutId={it.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-sm border border-paper/15 bg-noir-2 p-2.5"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {ci === 0 && <Inbox className="w-3 h-3 text-paper/50" />}
                        {ci === 1 && <Cog className="w-3 h-3 text-oxblood animate-spin" style={{ animationDuration: '3s' }} />}
                        {ci === 2 && <CheckCircle2 className="w-3 h-3 text-oxblood" />}
                        <span className="font-mono text-[11px] text-paper/85">{it.label}</span>
                      </div>
                      <span className="font-mono text-[10px] text-paper/40">{it.meta}</span>
                    </motion.div>
                  ) : null
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-5 pt-3 border-t border-paper/10">
        <span className="font-mono text-[10px] text-paper/40">
          {lang === 'en' ? 'audit log · every state change recorded' : 'auditlog · elke stateverandering gelogd'}
        </span>
        <span className="font-mono text-[10px] text-oxblood">● live</span>
      </div>
    </Frame>
  )
}

/* ─── 2. KNOWLEDGE BASES — Chat mock with streaming answer + source ─── */
const KnowledgeChat = ({ lang }) => {
  const question = lang === 'en' ? 'What is our refund policy?' : 'Wat is ons refund-beleid?'
  const answer =
    lang === 'en'
      ? 'Refunds are processed within 14 days if the order was placed less than 30 days ago and the product is unopened.'
      : 'Refunds worden binnen 14 dagen verwerkt als de bestelling minder dan 30 dagen oud is en het product ongeopend is.'
  const source = lang === 'en' ? 'refund-policy.pdf · p. 3' : 'refund-beleid.pdf · p. 3'
  const [typed, setTyped] = useState('')
  const [showSource, setShowSource] = useState(false)
  useEffect(() => {
    let i = 0
    setTyped('')
    setShowSource(false)
    const t = setInterval(() => {
      i++
      setTyped(answer.slice(0, i))
      if (i >= answer.length) {
        clearInterval(t)
        setTimeout(() => setShowSource(true), 300)
        setTimeout(() => {
          setTyped('')
          setShowSource(false)
        }, 5000)
      }
    }, 25)
    const loop = setInterval(() => {
      setTyped('')
      setShowSource(false)
      let j = 0
      const t2 = setInterval(() => {
        j++
        setTyped(answer.slice(0, j))
        if (j >= answer.length) {
          clearInterval(t2)
          setTimeout(() => setShowSource(true), 300)
        }
      }, 25)
    }, 7500)
    return () => {
      clearInterval(t)
      clearInterval(loop)
    }
  }, [answer])
  return (
    <Frame>
      <Chrome title={lang === 'en' ? 'internal knowledge · assistant' : 'interne kennis · assistent'} badge="RAG" />
      <div className="space-y-4 min-h-[220px]">
        {/* User question */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-sm border border-paper/15 bg-noir-3 px-3.5 py-2.5">
            <p className="text-sm text-paper/90">{question}</p>
          </div>
        </div>
        {/* Assistant response */}
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-sm border border-oxblood/40 bg-noir flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-oxblood" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <div className="rounded-sm border border-paper/10 bg-noir px-3.5 py-2.5 min-h-[3rem]">
              <p className="text-sm text-paper/90 leading-relaxed">
                {typed}
                <span className="inline-block w-1.5 h-3.5 bg-oxblood/70 ml-0.5 align-middle animate-pulse" />
              </p>
            </div>
            <AnimatePresence>
              {showSource && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 inline-flex items-center gap-2 rounded-sm border border-oxblood/40 bg-noir-3 px-2.5 py-1.5"
                >
                  <FileText className="w-3 h-3 text-oxblood" />
                  <span className="font-mono text-[10px] text-paper/80">{source}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5 pt-3 border-t border-paper/10">
        <span className="font-mono text-[10px] text-paper/40">
          {lang === 'en' ? 'grounded in your docs · permission-aware' : 'gebaseerd op je docs · rechten-bewust'}
        </span>
        <Search className="w-3 h-3 text-paper/40" />
      </div>
    </Frame>
  )
}

/* ─── 3. DOCUMENT PROCESSING — PDF preview + extracted data table ─── */
const DocumentExtractor = ({ lang }) => {
  const fields = [
    { label: lang === 'en' ? 'Vendor' : 'Leverancier', value: 'Acme Industries', top: '22%', left: '10%', width: '48%' },
    { label: lang === 'en' ? 'Invoice #' : 'Factuurnr.', value: 'INV-4521', top: '35%', left: '10%', width: '32%' },
    { label: lang === 'en' ? 'Date' : 'Datum', value: '17.07.2026', top: '35%', left: '58%', width: '32%' },
    { label: lang === 'en' ? 'Total' : 'Totaal', value: '€ 1,240.00', top: '82%', left: '55%', width: '35%' },
  ]
  const [step, setStep] = useState(-1)
  useEffect(() => {
    let i = -1
    const cycle = () => {
      i = (i + 1) % (fields.length + 2)
      setStep(i)
    }
    cycle()
    const id = setInterval(cycle, 900)
    return () => clearInterval(id)
  }, [fields.length])
  return (
    <Frame>
      <Chrome title={lang === 'en' ? 'extractor · invoice pipeline' : 'extractor · factuur-pipeline'} badge="OCR" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PDF preview */}
        <div className="relative aspect-[3/4] rounded-sm border border-paper/10 bg-paper/95 p-4 overflow-hidden">
          {/* Fake page content — thin lines */}
          <div className="absolute top-4 left-4 right-4 h-4 bg-noir/10 rounded-sm" />
          <div className="absolute top-12 left-4 right-24 h-2 bg-noir/8 rounded-sm" />
          <div className="absolute top-16 left-4 right-40 h-2 bg-noir/8 rounded-sm" />
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-4 right-4 h-1 bg-noir/8 rounded-sm"
              style={{ top: `${45 + i * 5}%`, right: `${8 + (i % 3) * 6}%` }}
            />
          ))}
          {/* Highlight overlays */}
          {fields.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= i ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute border-2 border-oxblood bg-oxblood/15 rounded-sm"
              style={{ top: f.top, left: f.left, width: f.width, height: 22 }}
            >
              <span
                className="absolute -top-4 left-0 smallcaps text-oxblood"
                style={{ fontSize: '0.55rem' }}
              >
                {f.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Extracted table */}
        <div className="rounded-sm border border-paper/10 bg-noir-3 p-4 min-h-full">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-paper/10">
            <span className="smallcaps text-paper/50">
              {lang === 'en' ? 'Extracted' : 'Uitgelezen'}
            </span>
            <span className="smallcaps text-oxblood">JSON</span>
          </div>
          <ul className="space-y-2">
            {fields.map((f, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{
                  opacity: step >= i ? 1 : 0,
                  x: step >= i ? 0 : -6,
                }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="flex items-baseline justify-between gap-3 py-1.5 border-b border-paper/5 last:border-b-0"
              >
                <span className="font-mono text-[11px] text-paper/50">{f.label}</span>
                <span className="font-mono text-[11px] text-paper/90">{f.value}</span>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= fields.length ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 pt-2 mt-1"
            >
              <CheckCircle2 className="w-3 h-3 text-oxblood" />
              <span className="font-mono text-[10px] text-oxblood">
                {lang === 'en' ? 'validated · queued for approval' : 'gevalideerd · in approval queue'}
              </span>
            </motion.li>
          </ul>
        </div>
      </div>
    </Frame>
  )
}

/* ─── 4. SYSTEMS INTEGRATION — Network hub with animated packet flow ─── */
const SystemsHub = ({ lang }) => {
  const nodes = [
    { id: 'erp', label: 'ERP', x: 20, y: 25 },
    { id: 'crm', label: 'CRM', x: 80, y: 25 },
    { id: 'acc', label: 'Accounting', x: 20, y: 75 },
    { id: 'shop', label: 'Webshop', x: 80, y: 75 },
  ]
  const center = { x: 50, y: 50 }
  return (
    <Frame>
      <Chrome title={lang === 'en' ? 'integration hub · live traffic' : 'integratie-hub · live traffic'} badge="sync" />
      <div className="relative aspect-[16/9] min-h-[260px]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ln" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(232,225,208,0.15)" />
              <stop offset="100%" stopColor="rgba(232,225,208,0.15)" />
            </linearGradient>
          </defs>
          {nodes.map((n) => (
            <line
              key={n.id}
              x1={n.x}
              y1={n.y}
              x2={center.x}
              y2={center.y}
              stroke="rgba(232,225,208,0.15)"
              strokeWidth="0.3"
            />
          ))}
        </svg>

        {/* Animated packets along each line — travel BOTH directions */}
        {nodes.map((n, i) => (
          <motion.div
            key={`p-${n.id}`}
            className="absolute w-2 h-2 rounded-full bg-oxblood shadow-[0_0_8px_0_rgba(156,38,38,0.8)]"
            style={{ left: 0, top: 0 }}
            animate={{
              left: [`${n.x}%`, `${center.x}%`, `${n.x}%`],
              top: [`${n.y}%`, `${center.y}%`, `${n.y}%`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.4,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Outer nodes */}
        {nodes.map((n) => (
          <div
            key={n.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div className="w-12 h-12 rounded-sm border border-paper/25 bg-noir flex items-center justify-center">
              <Boxes className="w-4 h-4 text-paper/70" strokeWidth={1.5} />
            </div>
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 smallcaps text-paper/60 whitespace-nowrap">
              {n.label}
            </span>
          </div>
        ))}

        {/* Central hub */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${center.x}%`, top: `${center.y}%` }}
        >
          <motion.div
            animate={{ boxShadow: ['0 0 0 0 rgba(156,38,38,0.6)', '0 0 0 12px rgba(156,38,38,0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 rounded-full border-2 border-oxblood bg-noir-2 flex items-center justify-center"
          >
            <Circle className="w-4 h-4 text-oxblood fill-oxblood" />
          </motion.div>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 smallcaps text-oxblood whitespace-nowrap">
            {lang === 'en' ? 'Baghlabs Layer' : 'Baghlabs Layer'}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5 pt-3 border-t border-paper/10">
        <span className="font-mono text-[10px] text-paper/40">
          {lang === 'en' ? 'retries · reconciliation · logs' : 'retries · reconciliation · logs'}
        </span>
        <span className="font-mono text-[10px] text-oxblood">4 systems · 1 truth</span>
      </div>
    </Frame>
  )
}

/* ─── 5. CUSTOM SOFTWARE DEV — Code editor with typewriter effect ─── */
const CodeEditor = ({ lang }) => {
  const lines = [
    { code: "export function processInvoice(pdf) {", indent: 0 },
    { code: "  const fields = await extract(pdf);", indent: 0 },
    { code: "  if (fields.confidence < 0.9) {", indent: 0 },
    { code: "    return queue.forReview(fields);", indent: 0 },
    { code: "  }", indent: 0 },
    { code: "  await accounting.push(fields);", indent: 0 },
    { code: "  audit.log('ok', fields.id);", indent: 0 },
    { code: "}", indent: 0 },
  ]
  const [visible, setVisible] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setVisible((v) => (v >= lines.length ? 0 : v + 1))
    }, 400)
    return () => clearInterval(id)
  }, [lines.length])
  return (
    <Frame>
      <Chrome title="workflow.ts · watch mode" badge="build" />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-stretch">
        <div className="rounded-sm border border-paper/10 bg-noir p-4 font-mono text-[12px] min-h-[240px]">
          {lines.map((ln, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: i < visible ? 1 : 0 }}
              transition={{ duration: 0.15 }}
              className="flex gap-4 leading-6"
            >
              <span className="text-paper/25 select-none w-4 text-right">{i + 1}</span>
              <span className="text-paper/85">
                <SyntaxLine code={ln.code} />
                {i === visible - 1 && (
                  <span className="inline-block w-1.5 h-3.5 bg-oxblood/80 ml-0.5 align-middle animate-pulse" />
                )}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="rounded-sm border border-paper/10 bg-noir p-4 font-mono text-[11px] min-h-[240px] md:w-56 flex flex-col">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-paper/10">
            <Terminal className="w-3 h-3 text-paper/50" />
            <span className="smallcaps text-paper/50">terminal</span>
          </div>
          <p className="text-paper/60">$ npm run test</p>
          <p className="text-paper/60 mt-1">
            <span className="text-oxblood">●</span> 24 passed
          </p>
          <p className="text-paper/60 mt-3">$ npm run build</p>
          <p className="text-paper/60 mt-1">
            <span className="text-oxblood">✓</span> built in 1.9s
          </p>
          <div className="mt-auto pt-3 border-t border-paper/10">
            <p className="text-oxblood flex items-center gap-2">
              <Play className="w-3 h-3" />
              deployed → prod
            </p>
          </div>
        </div>
      </div>
    </Frame>
  )
}

const SyntaxLine = ({ code }) => {
  // very light-touch syntax colouring
  const parts = code.split(/(\bexport\b|\bfunction\b|\bconst\b|\bawait\b|\bif\b|\breturn\b|'[^']*'|\/\/.*)/g)
  return (
    <>
      {parts.map((p, i) => {
        if (/^(export|function|const|await|if|return)$/.test(p))
          return (
            <span key={i} className="text-oxblood">
              {p}
            </span>
          )
        if (/^'.*'$/.test(p))
          return (
            <span key={i} className="text-paper/60">
              {p}
            </span>
          )
        return <span key={i}>{p}</span>
      })}
    </>
  )
}

const ServiceGraphic = ({ serviceId, lang = 'nl' }) => {
  switch (serviceId) {
    case 'ai-workflows':
      return <WorkflowsBoard lang={lang} />
    case 'kennissystemen':
      return <KnowledgeChat lang={lang} />
    case 'documentverwerking':
      return <DocumentExtractor lang={lang} />
    case 'integraties':
      return <SystemsHub lang={lang} />
    case 'softwareontwikkeling':
      return <CodeEditor lang={lang} />
    default:
      return null
  }
}

export default ServiceGraphic
