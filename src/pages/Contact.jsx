import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import ReCAPTCHA from 'react-google-recaptcha'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import { CTASection } from '@/components/sections/Home'
import testimonials from '@/data/testimonials.json'

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''
const ROMAN = ['I', 'II', 'III', 'IV']

const contentVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, x: -16, transition: { duration: 0.15 } },
}

const Contact = () => {
  const { t } = useTranslation('contact')

  const [step, setStep] = useState(0)
  const [status, setStatus] = useState('idle')
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const recaptchaRef = useRef(null)
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
    if (step === 0) return formData.name.trim() && formData.company.trim() && formData.email.trim() && formData.phone.trim()
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

  const Underline = ({ id, type = 'text', value, onChange, placeholder }) => (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-transparent border-b border-paper/25 focus:border-oxblood focus:outline-none py-2 font-display text-lg text-paper placeholder:text-paper/30"
    />
  )

  const optionBtn = (active) =>
    `text-left px-4 py-3 border transition-all duration-150 ${
      active
        ? 'border-oxblood bg-oxblood/8 text-paper'
        : 'border-paper/20 bg-noir-2 text-paper hover:border-oxblood hover:text-oxblood'
    }`

  return (
    <div className="bg-noir text-paper">
      {/* Hero */}
      <section className="relative border-b border-oxblood pt-32 md:pt-40 pb-16 md:pb-20">
        
        <div className="container-wide relative">
          <div className="flex items-baseline justify-between mb-6">
            <span className="chapter">Cap. — Contact</span>
            <span className="smallcaps text-paper/40 hidden md:inline">{t('page.heroNote')}</span>
          </div>
          <div className="rule-oxblood mb-14 md:mb-20" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="poster-1 max-w-[14ch]">{t('page.heroTitle')}</h1>
            <p className="mt-8 font-display italic text-xl md:text-2xl text-paper/75">
              {t('page.heroDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form — poster with framed plate */}
      <section className="border-b border-oxblood py-20 md:py-24 bg-noir-2">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="frame bg-noir p-10 md:p-14 text-center"
              >
                <div className="w-14 h-14 rounded-sm bg-oxblood flex items-center justify-center mx-auto mb-6">
                  <Check className="w-7 h-7 text-paper" strokeWidth={3} />
                </div>
                <p className="chapter mb-4">Verstuurd</p>
                <h3 className="poster-2 mb-4">{t('form.success')}</h3>
                <p className="text-paper/70 text-lg">{t('form.successMessage')}</p>
              </motion.div>
            ) : (
              <div className="frame bg-noir overflow-hidden">
                {/* Progress */}
                <div className="px-6 md:px-10 py-6 border-b border-oxblood bg-noir-3/50">
                  <div className="flex items-baseline justify-between">
                    {steps.map((s, i) => (
                      <div key={s.id} className="flex flex-col items-center gap-2 flex-1">
                        <span
                          className={`font-display font-bold text-2xl md:text-3xl leading-none transition-colors ${
                            i <= step ? 'text-oxblood' : 'text-paper/25'
                          }`}
                        >
                          {ROMAN[i]}
                        </span>
                        <span className={`smallcaps hidden sm:block ${i === step ? 'text-oxblood' : 'text-paper/40'}`}>
                          {s.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={step} initial="hidden" animate="visible" exit="exit" variants={contentVariants}>
                    {step === 0 && (
                      <div className="px-6 md:px-10 pt-8 pb-4">
                        <p className="chapter mb-2">{t('steps.contactTitle')}</p>
                        <p className="text-paper/60 mb-8">{t('steps.contactDesc')}</p>
                        <div className="space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                            <div>
                              <label htmlFor="name" className="smallcaps text-paper/50 block mb-1">
                                {t('form.name')} <span className="text-oxblood">*</span>
                              </label>
                              <Underline id="name" value={formData.name} onChange={(e) => update('name', e.target.value)} placeholder={t('form.namePlaceholder')} />
                            </div>
                            <div>
                              <label htmlFor="company" className="smallcaps text-paper/50 block mb-1">
                                {t('form.company')} <span className="text-oxblood">*</span>
                              </label>
                              <Underline id="company" value={formData.company} onChange={(e) => update('company', e.target.value)} placeholder={t('form.companyPlaceholder')} />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                            <div>
                              <label htmlFor="email" className="smallcaps text-paper/50 block mb-1">
                                {t('form.email')} <span className="text-oxblood">*</span>
                              </label>
                              <Underline id="email" type="email" value={formData.email} onChange={(e) => update('email', e.target.value)} placeholder={t('form.emailPlaceholder')} />
                            </div>
                            <div>
                              <label htmlFor="phone" className="smallcaps text-paper/50 block mb-1">
                                {t('form.phone')} <span className="text-oxblood">*</span>
                              </label>
                              <Underline id="phone" type="tel" value={formData.phone} onChange={(e) => update('phone', e.target.value)} placeholder={t('form.phonePlaceholder')} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="px-6 md:px-10 pt-8 pb-4">
                        <p className="chapter mb-2">{t('steps.servicesTitle')}</p>
                        <p className="text-paper/60 mb-8">{t('steps.servicesDesc')}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {serviceOptions.map((opt) => {
                            const active = formData.services.includes(opt.id)
                            return (
                              <button
                                type="button"
                                key={opt.id}
                                onClick={() => toggleService(opt.id)}
                                className={optionBtn(active)}
                              >
                                <span className="flex items-baseline gap-3">
                                  <span className="smallcaps text-oxblood shrink-0 w-3">
                                    {active ? '×' : '+'}
                                  </span>
                                  <span className="text-base font-display">{opt.label}</span>
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="px-6 md:px-10 pt-8 pb-4">
                        <p className="chapter mb-2">{t('steps.budgetTitle')}</p>
                        <p className="text-paper/60 mb-8">{t('steps.budgetDesc')}</p>
                        <div className="space-y-8">
                          <div className="space-y-3">
                            <label className="smallcaps text-paper/50">{t('budget.budgetLabel')}</label>
                            <div className="grid grid-cols-1 gap-2">
                              {budgetOptions.map((opt) => (
                                <button
                                  type="button"
                                  key={opt.value}
                                  onClick={() => update('budget', opt.value)}
                                  className={optionBtn(formData.budget === opt.value)}
                                >
                                  <span className="font-display text-base">{opt.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="smallcaps text-paper/50">{t('budget.timelineLabel')}</label>
                            <div className="grid grid-cols-2 gap-2">
                              {timelineOptions.map((opt) => (
                                <button
                                  type="button"
                                  key={opt.value}
                                  onClick={() => update('timeline', opt.value)}
                                  className={optionBtn(formData.timeline === opt.value)}
                                >
                                  <span className="font-display text-base">{opt.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="px-6 md:px-10 pt-8 pb-4">
                        <p className="chapter mb-2">{t('steps.messageTitle')}</p>
                        <p className="text-paper/60 mb-8">{t('steps.messageDesc')}</p>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="inquiry" className="smallcaps text-paper/50 block mb-1">
                              {t('form.inquiry')} <span className="text-oxblood">*</span>
                            </label>
                            <textarea
                              id="inquiry"
                              value={formData.inquiry}
                              onChange={(e) => update('inquiry', e.target.value)}
                              placeholder={t('form.inquiryPlaceholder')}
                              className="w-full bg-transparent border border-paper/20 focus:border-oxblood focus:outline-none p-3 min-h-[160px] font-display text-lg text-paper placeholder:text-paper/30 rounded-sm"
                            />
                          </div>
                          {RECAPTCHA_SITE_KEY && (
                            <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={setRecaptchaToken} />
                          )}
                          {status === 'error' && (
                            <p className="text-sm text-oxblood font-display italic">{t('form.error')}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-between px-6 md:px-10 py-6 border-t border-oxblood bg-noir-3/40">
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    disabled={step === 0}
                    className="smallcaps text-paper/60 hover:text-oxblood disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← {t('form.back')}
                  </button>
                  <span className="smallcaps text-paper/40">
                    {ROMAN[step]} / {ROMAN[steps.length - 1]}
                  </span>
                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s + 1)}
                      disabled={!isStepValid()}
                      className="font-display text-lg text-oxblood border-b-2 border-oxblood hover:pb-0.5 pb-0 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      {t('form.next')} →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!isStepValid() || status === 'submitting'}
                      className="font-display text-lg text-oxblood border-b-2 border-oxblood hover:pb-0.5 pb-0 disabled:opacity-30 disabled:cursor-not-allowed transition-all inline-flex items-center gap-2"
                    >
                      {status === 'submitting' ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> {t('form.submitting')}</>
                      ) : (
                        <>{t('form.submit')} →</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <AnimatedTestimonials
        title={t('testimonials.title')}
        subtitle={t('testimonials.subtitle')}
        badgeText={t('testimonials.badge')}
        testimonials={testimonials}
      />

      <CTASection />
    </div>
  )
}

export default Contact
