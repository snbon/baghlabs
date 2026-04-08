import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react'
import ReCAPTCHA from 'react-google-recaptcha'
import BackgroundPage from '@/components/ui/background-page'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import testimonials from '@/data/testimonials.json'

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''

const contentVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.28 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.18 } },
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
    { id: 'development', label: t('services.development') },
    { id: 'branding', label: t('services.branding') },
    { id: 'marketing', label: t('services.marketing') },
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

  const update = (field, value) => setFormData(p => ({ ...p, [field]: value }))

  const toggleService = (id) => setFormData(p => ({
    ...p,
    services: p.services.includes(id)
      ? p.services.filter(s => s !== id)
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

  return (
    <div>
      {/* Hero, noise dots only, no yellow glow */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-white" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.07) 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
          />
        </div>

        <section className="pt-32 md:pt-40 pb-16 md:pb-20">
          <div className="container-custom max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
                {t('page.heroTitle')}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                {t('page.heroDescription')}
              </p>
              <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground/50">
                {t('page.heroNote')}
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Form + Testimonials */}
      <div className="relative overflow-hidden">
        <BackgroundPage />

        {/* Multi-step form */}
        <section className="py-16">
          <div className="container-custom max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/60 backdrop-blur-sm border border-bagh-100/60 rounded-2xl p-10 text-center"
                >
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t('form.success')}</h3>
                  <p className="text-muted-foreground">{t('form.successMessage')}</p>
                </motion.div>
              ) : (
                <div className="bg-white/60 backdrop-blur-sm border border-bagh-100/60 rounded-2xl overflow-hidden">
                  {/* Progress bar */}
                  <div className="px-8 pt-8 pb-0">
                    <div className="flex items-center justify-between mb-3">
                      {steps.map((s, i) => (
                        <div key={s.id} className="flex flex-col items-center gap-1.5">
                          <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                            i < step ? 'bg-foreground' : i === step ? 'bg-foreground ring-4 ring-foreground/15' : 'bg-muted'
                          }`} />
                          <span className={`text-xs hidden sm:block transition-colors ${i === step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                            {s.title}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-foreground"
                        animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Step content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={contentVariants}
                    >
                      {/* Step 1: Contact info */}
                      {step === 0 && (
                        <div className="px-8 pt-8 pb-4">
                          <h2 className="text-xl font-semibold text-foreground mb-1">{t('steps.contactTitle')}</h2>
                          <p className="text-sm text-muted-foreground mb-6">{t('steps.contactDesc')}</p>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <Label htmlFor="name">{t('form.name')} <span className="text-red-400">*</span></Label>
                                <Input id="name" placeholder={t('form.namePlaceholder')} value={formData.name} onChange={e => update('name', e.target.value)} />
                              </div>
                              <div className="space-y-1.5">
                                <Label htmlFor="company">{t('form.company')} <span className="text-red-400">*</span></Label>
                                <Input id="company" placeholder={t('form.companyPlaceholder')} value={formData.company} onChange={e => update('company', e.target.value)} />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <Label htmlFor="email">{t('form.email')} <span className="text-red-400">*</span></Label>
                                <Input id="email" type="email" placeholder={t('form.emailPlaceholder')} value={formData.email} onChange={e => update('email', e.target.value)} />
                              </div>
                              <div className="space-y-1.5">
                                <Label htmlFor="phone">{t('form.phone')} <span className="text-red-400">*</span></Label>
                                <Input id="phone" type="tel" placeholder={t('form.phonePlaceholder')} value={formData.phone} onChange={e => update('phone', e.target.value)} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Services */}
                      {step === 1 && (
                        <div className="px-8 pt-8 pb-4">
                          <h2 className="text-xl font-semibold text-foreground mb-1">{t('steps.servicesTitle')}</h2>
                          <p className="text-sm text-muted-foreground mb-6">{t('steps.servicesDesc')}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {serviceOptions.map(opt => (
                              <label
                                key={opt.id}
                                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                                  formData.services.includes(opt.id)
                                    ? 'border-foreground bg-foreground/5'
                                    : 'border-border hover:border-bagh-200'
                                }`}
                              >
                                <Checkbox
                                  checked={formData.services.includes(opt.id)}
                                  onCheckedChange={() => toggleService(opt.id)}
                                />
                                <span className="text-sm text-foreground">{opt.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 3: Budget */}
                      {step === 2 && (
                        <div className="px-8 pt-8 pb-4">
                          <h2 className="text-xl font-semibold text-foreground mb-1">{t('steps.budgetTitle')}</h2>
                          <p className="text-sm text-muted-foreground mb-6">{t('steps.budgetDesc')}</p>
                          <div className="space-y-6">
                            {/* Budget dropdown */}
                            <div className="space-y-2">
                              <Label>{t('budget.budgetLabel')}</Label>
                              <div className="grid grid-cols-1 gap-2">
                                {budgetOptions.map(opt => (
                                  <label
                                    key={opt.value}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                                      formData.budget === opt.value
                                        ? 'border-foreground bg-foreground/5'
                                        : 'border-border hover:border-bagh-200'
                                    }`}
                                  >
                                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${
                                      formData.budget === opt.value ? 'border-foreground bg-foreground' : 'border-muted-foreground/40'
                                    }`} onClick={() => update('budget', opt.value)} />
                                    <span className="text-sm text-foreground" onClick={() => update('budget', opt.value)}>{opt.label}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* Timeline */}
                            <div className="space-y-2">
                              <Label>{t('budget.timelineLabel')}</Label>
                              <div className="grid grid-cols-2 gap-2">
                                {timelineOptions.map(opt => (
                                  <label
                                    key={opt.value}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                                      formData.timeline === opt.value
                                        ? 'border-foreground bg-foreground/5'
                                        : 'border-border hover:border-bagh-200'
                                    }`}
                                  >
                                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${
                                      formData.timeline === opt.value ? 'border-foreground bg-foreground' : 'border-muted-foreground/40'
                                    }`} onClick={() => update('timeline', opt.value)} />
                                    <span className="text-sm text-foreground" onClick={() => update('timeline', opt.value)}>{opt.label}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 4: Message */}
                      {step === 3 && (
                        <div className="px-8 pt-8 pb-4">
                          <h2 className="text-xl font-semibold text-foreground mb-1">{t('steps.messageTitle')}</h2>
                          <p className="text-sm text-muted-foreground mb-6">{t('steps.messageDesc')}</p>
                          <div className="space-y-4">
                            <div className="space-y-1.5">
                              <Label htmlFor="inquiry">{t('form.inquiry')} <span className="text-red-400">*</span></Label>
                              <Textarea
                                id="inquiry"
                                placeholder={t('form.inquiryPlaceholder')}
                                value={formData.inquiry}
                                onChange={e => update('inquiry', e.target.value)}
                                className="min-h-[140px]"
                              />
                            </div>
                            {RECAPTCHA_SITE_KEY && (
                              <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={setRecaptchaToken} />
                            )}
                            {status === 'error' && (
                              <p className="text-sm text-red-500">{t('form.error')}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Footer nav */}
                  <div className="flex items-center justify-between px-8 py-6 border-t border-bagh-100/60">
                    <button
                      type="button"
                      onClick={() => setStep(s => s - 1)}
                      disabled={step === 0}
                      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      {t('form.back')}
                    </button>

                    <span className="text-xs text-muted-foreground/60">
                      {step + 1} / {steps.length}
                    </span>

                    {step < steps.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep(s => s + 1)}
                        disabled={!isStepValid()}
                        className="flex items-center gap-1.5 btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {t('form.next')}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isStepValid() || status === 'submitting'}
                        className="flex items-center gap-1.5 btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {status === 'submitting' ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> {t('form.submitting')}</>
                        ) : (
                          <><Check className="w-4 h-4" /> {t('form.submit')}</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <AnimatedTestimonials
          title={t('testimonials.title')}
          subtitle={t('testimonials.subtitle')}
          badgeText={t('testimonials.badge')}
          testimonials={testimonials}
        />
      </div>

      {/* Footer only */}
      <FooterOnly />
    </div>
  )
}

const FooterOnly = () => {
  const { t: tCommon, i18n } = useTranslation('common')
  const location = useLocation()
  const navigate = useNavigate()
  const basePath = location.pathname.startsWith('/en') ? '/en' : ''
  const isEnglish = location.pathname.startsWith('/en')

  const toggleLanguage = () => {
    if (isEnglish) {
      i18n.changeLanguage('nl')
      navigate(location.pathname.replace(/^\/en/, '') || '/')
    } else {
      i18n.changeLanguage('en')
      navigate(`/en${location.pathname === '/' ? '' : location.pathname}`)
    }
  }

  const linkHref = (key) => {
    if (key === 'contact') return `${basePath}/contact`
    if (key === 'cases') return `${basePath}/cases`
    if (key === 'services') return `${basePath}/services/development`
    return `${basePath}/`
  }

  return (
    <div className="relative w-full bg-white overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.07) 1px, transparent 0)',
          backgroundSize: '20px 20px',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
        }}
      />
      <footer className="relative border-t border-bagh-100 py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-7 h-7 bg-bagh-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-medium text-xs">B</span>
                </div>
                <span className="text-bagh-800 font-semibold">Baghlabs</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{tCommon('footer.description')}</p>
            </div>
            <div>
              <h4 className="text-foreground font-medium text-sm mb-4 uppercase tracking-wide">{tCommon('footer.quickLinks')}</h4>
              <ul className="space-y-2">
                {Object.entries(tCommon('footer.links', { returnObjects: true })).map(([key, label]) => (
                  <li key={key}>
                    <RouterLink to={linkHref(key)} className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                      {label}
                    </RouterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-foreground font-medium text-sm mb-4 uppercase tracking-wide">{tCommon('footer.getInTouch')}</h4>
              <p className="text-muted-foreground text-sm mb-4">{tCommon('footer.readyText')}</p>
              <RouterLink to={`${basePath}/contact`} className="btn-secondary text-sm inline-block">
                {tCommon('footer.workWithUs')}
              </RouterLink>
            </div>
          </div>
          <div className="border-t border-bagh-100 mt-12 pt-6 flex flex-col items-center gap-2 text-center">
            <p className="text-muted-foreground text-xs">{tCommon('footer.copyright')}</p>
            <p className="text-muted-foreground/50 text-xs">{tCommon('footer.tagline')}</p>
            <button
              onClick={toggleLanguage}
              className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              {isEnglish ? 'NL' : 'EN'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Contact
