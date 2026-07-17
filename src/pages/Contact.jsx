import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react'
import ReCAPTCHA from 'react-google-recaptcha'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { GlowButton } from '@/components/ui/glow-button'
import { CTASection } from '@/components/sections/Home'
import testimonials from '@/data/testimonials.json'

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''

const contentVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, x: -16, transition: { duration: 0.15 } },
}

const Contact = () => {
  const { t } = useTranslation('contact')
  const recaptchaRef = useRef(null)

  const [step, setStep] = useState(0)
  const [status, setStatus] = useState('idle')
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    services: [],
    budget: '',
    timeline: '',
    inquiry: '',
  })

  const serviceOptions = [
    { id: 'ai-workflows', label: t('services.ai-workflows') },
    { id: 'kennissystemen', label: t('services.kennissystemen') },
    { id: 'documentverwerking', label: t('services.documentverwerking') },
    { id: 'integraties', label: t('services.integraties') },
    { id: 'softwareontwikkeling', label: t('services.softwareontwikkeling') },
    { id: 'blueprint', label: t('services.blueprint') },
    { id: 'other', label: t('services.other') },
  ]

  const steps = [
    { id: 'contact', title: t('steps.contact') },
    { id: 'services', title: t('steps.services') },
    { id: 'budget', title: t('steps.budget') },
    { id: 'message', title: t('steps.message') },
  ]

  const budgetOptions = [
    { value: 'under-1000', label: t('budget.under1000') },
    { value: '1000-3000', label: t('budget.range1000') },
    { value: '3000-5000', label: t('budget.range3000') },
    { value: '5000-10000', label: t('budget.range5000') },
    { value: 'above-10000', label: t('budget.above10000') },
  ]

  const timelineOptions = [
    { value: 'asap', label: t('budget.asap') },
    { value: 'within-1-month', label: t('budget.within1month') },
    { value: '1-3-months', label: t('budget.oneToThree') },
    { value: 'flexible', label: t('budget.flexible') },
  ]

  const update = (field, value) => setFormData((p) => ({ ...p, [field]: value }))

  const toggleService = (id) =>
    setFormData((p) => ({
      ...p,
      services: p.services.includes(id)
        ? p.services.filter((s) => s !== id)
        : [...p.services, id],
    }))

  const isStepValid = () => {
    if (step === 0)
      return (
        formData.name.trim() &&
        formData.company.trim() &&
        formData.email.trim() &&
        formData.phone.trim()
      )
    if (step === 1) return formData.services.length > 0
    if (step === 2) return formData.budget && formData.timeline
    if (step === 3) return formData.inquiry.trim()
    return true
  }

  const handleSubmit = async () => {
    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      alert(t('form.recaptchaError'))
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputCls = 'rounded-md bg-noir-3 border border-paper/10 text-paper placeholder:text-paper/30 focus-visible:ring-0 focus-visible:border-neon focus-visible:shadow-glow-sm transition-all'

  const optionButtonCls = (active) =>
    `text-left px-4 py-3 rounded-md border transition-all duration-150 ${
      active
        ? 'border-neon bg-neon/10 text-paper shadow-glow-sm'
        : 'border-paper/10 bg-noir-3 text-paper/80 hover:border-paper/30 hover:bg-noir-4'
    }`

  return (
    <div className="bg-noir text-paper">
      {/* Hero */}
      <section className="relative border-b border-paper/10 pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute inset-0 halo-neon pointer-events-none" />
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow text-neon mb-6">{t('page.eyebrow')}</p>
            <h1 className="display-1 max-w-[14ch] text-paper">{t('page.heroTitle')}</h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-paper/70">
              {t('page.heroDescription')}
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-paper/40">
              {t('page.heroNote')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="border-b border-paper/10 py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 halo-violet pointer-events-none" />
        <div className="container-wide relative">
          <div className="max-w-3xl mx-auto">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-md border border-paper/10 bg-noir-2 p-10 md:p-14 text-center relative overflow-hidden"
              >
                <span className="absolute left-0 top-0 bottom-0 w-px bg-neon shadow-glow-sm" />
                <div className="w-14 h-14 rounded-md bg-neon flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <Check className="w-7 h-7 text-noir" strokeWidth={3} />
                </div>
                <h3 className="display-3 mb-4 text-paper">{t('form.success')}</h3>
                <p className="text-paper/70 text-lg">{t('form.successMessage')}</p>
              </motion.div>
            ) : (
              <div className="rounded-md border border-paper/10 bg-noir-2 overflow-hidden shadow-glow-sm">
                {/* Progress */}
                <div className="px-6 md:px-10 py-6 border-b border-paper/10 bg-noir-3/60">
                  <div className="flex items-center justify-between mb-4">
                    {steps.map((s, i) => (
                      <div key={s.id} className="flex flex-col items-center gap-2 flex-1">
                        <div
                          className={`w-4 h-4 rounded-full border transition-all duration-200 ${
                            i < step
                              ? 'bg-neon border-neon shadow-glow-sm'
                              : i === step
                              ? 'bg-neon/40 border-neon shadow-glow-sm'
                              : 'bg-transparent border-paper/25'
                          }`}
                        />
                        <span
                          className={`font-mono text-[10px] uppercase tracking-widest text-center hidden sm:block ${
                            i === step ? 'text-neon' : 'text-paper/40'
                          }`}
                        >
                          {s.title}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="h-0.5 bg-paper/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-neon shadow-glow-sm"
                      animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                  >
                    {step === 0 && (
                      <div className="px-6 md:px-10 pt-8 pb-4">
                        <h2 className="display-3 mb-2 text-paper">{t('steps.contactTitle')}</h2>
                        <p className="text-paper/60 mb-8">{t('steps.contactDesc')}</p>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                              <Label htmlFor="name" className="eyebrow">
                                {t('form.name')} *
                              </Label>
                              <Input
                                id="name"
                                placeholder={t('form.namePlaceholder')}
                                value={formData.name}
                                onChange={(e) => update('name', e.target.value)}
                                className={inputCls}
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label htmlFor="company" className="eyebrow">
                                {t('form.company')} *
                              </Label>
                              <Input
                                id="company"
                                placeholder={t('form.companyPlaceholder')}
                                value={formData.company}
                                onChange={(e) => update('company', e.target.value)}
                                className={inputCls}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                              <Label htmlFor="email" className="eyebrow">
                                {t('form.email')} *
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder={t('form.emailPlaceholder')}
                                value={formData.email}
                                onChange={(e) => update('email', e.target.value)}
                                className={inputCls}
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label htmlFor="phone" className="eyebrow">
                                {t('form.phone')} *
                              </Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder={t('form.phonePlaceholder')}
                                value={formData.phone}
                                onChange={(e) => update('phone', e.target.value)}
                                className={inputCls}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="px-6 md:px-10 pt-8 pb-4">
                        <h2 className="display-3 mb-2 text-paper">{t('steps.servicesTitle')}</h2>
                        <p className="text-paper/60 mb-8">{t('steps.servicesDesc')}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {serviceOptions.map((opt) => {
                            const active = formData.services.includes(opt.id)
                            return (
                              <label
                                key={opt.id}
                                className={`flex items-center gap-3 p-4 rounded-md border cursor-pointer transition-all duration-150 ${
                                  active
                                    ? 'border-neon bg-neon/10 shadow-glow-sm'
                                    : 'border-paper/10 bg-noir-3 hover:border-paper/30 hover:bg-noir-4'
                                }`}
                              >
                                <Checkbox
                                  checked={active}
                                  onCheckedChange={() => toggleService(opt.id)}
                                  className={active ? 'border-neon data-[state=checked]:bg-neon data-[state=checked]:text-noir' : ''}
                                />
                                <span className="text-sm md:text-base text-paper">
                                  {opt.label}
                                </span>
                              </label>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="px-6 md:px-10 pt-8 pb-4">
                        <h2 className="display-3 mb-2 text-paper">{t('steps.budgetTitle')}</h2>
                        <p className="text-paper/60 mb-8">{t('steps.budgetDesc')}</p>
                        <div className="space-y-8">
                          <div className="space-y-3">
                            <Label className="eyebrow">{t('budget.budgetLabel')}</Label>
                            <div className="grid grid-cols-1 gap-2">
                              {budgetOptions.map((opt) => (
                                <button
                                  type="button"
                                  key={opt.value}
                                  onClick={() => update('budget', opt.value)}
                                  className={optionButtonCls(formData.budget === opt.value)}
                                >
                                  <span className="text-sm md:text-base">{opt.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <Label className="eyebrow">{t('budget.timelineLabel')}</Label>
                            <div className="grid grid-cols-2 gap-2">
                              {timelineOptions.map((opt) => (
                                <button
                                  type="button"
                                  key={opt.value}
                                  onClick={() => update('timeline', opt.value)}
                                  className={optionButtonCls(formData.timeline === opt.value)}
                                >
                                  <span className="text-sm md:text-base">{opt.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="px-6 md:px-10 pt-8 pb-4">
                        <h2 className="display-3 mb-2 text-paper">{t('steps.messageTitle')}</h2>
                        <p className="text-paper/60 mb-8">{t('steps.messageDesc')}</p>
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="inquiry" className="eyebrow">
                              {t('form.inquiry')} *
                            </Label>
                            <Textarea
                              id="inquiry"
                              placeholder={t('form.inquiryPlaceholder')}
                              value={formData.inquiry}
                              onChange={(e) => update('inquiry', e.target.value)}
                              className={`min-h-[160px] ${inputCls}`}
                            />
                          </div>
                          {RECAPTCHA_SITE_KEY && (
                            <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey={RECAPTCHA_SITE_KEY}
                              onChange={setRecaptchaToken}
                              theme="dark"
                            />
                          )}
                          {status === 'error' && (
                            <p className="text-sm text-red-400 font-medium">{t('form.error')}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-between px-6 md:px-10 py-6 border-t border-paper/10 bg-noir-3/40">
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    disabled={step === 0}
                    className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-paper/60 hover:text-neon disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    {t('form.back')}
                  </button>

                  <span className="font-mono text-[10px] text-paper/40">
                    {String(step + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                  </span>

                  {step < steps.length - 1 ? (
                    <GlowButton
                      type="button"
                      onClick={() => setStep((s) => s + 1)}
                      disabled={!isStepValid()}
                      variant="neon"
                      size="md"
                    >
                      {t('form.next')} →
                    </GlowButton>
                  ) : (
                    <GlowButton
                      type="button"
                      onClick={handleSubmit}
                      disabled={!isStepValid() || status === 'submitting'}
                      variant="neon"
                      size="md"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> {t('form.submitting')}
                        </>
                      ) : (
                        <>{t('form.submit')} →</>
                      )}
                    </GlowButton>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-paper/10">
        <AnimatedTestimonials
          title={t('testimonials.title')}
          subtitle={t('testimonials.subtitle')}
          badgeText={t('testimonials.badge')}
          testimonials={testimonials}
        />
      </section>

      <CTASection />
    </div>
  )
}

export default Contact
