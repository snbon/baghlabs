import { useState } from 'react'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const PlanCard = ({ plan, index, isPopular, bookCallLabel, mostPopularLabel, contactHref }) => (
  <div
    className={`flex-1 border border-primary/10 rounded-none ${
      isPopular ? 'border-t border-b border-l-0 border-r-0' : ''
    }`}
  >
    <div className="p-[30px] flex flex-col h-full gap-6 justify-between">
      <div className="flex flex-col gap-6">
        <div className="p-0 flex flex-col gap-4">
          <div className="font-medium text-xl leading-5">
            {plan.title}{' '}
            {isPopular && (
              <span className="text-sm leading-[14px] opacity-80 font-normal">
                {mostPopularLabel}
              </span>
            )}
          </div>
          <p className="opacity-80 font-normal text-sm leading-[22px]">{plan.description}</p>
          <div className="font-normal text-xs leading-3">
            <span className="font-medium text-base leading-4">{plan.price}</span>
            {plan.price !== 'Op aanvraag' && plan.price !== 'Custom' && (
              <span> {plan.price.includes('/mo') ? '' : 'eenmalig'}</span>
            )}
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-3 min-h-[165px]">
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <CheckIcon className="w-[15px] h-[15px] flex-shrink-0" />
              <span className="font-normal text-sm leading-[15.4px]">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="p-0">
        <Link
          to={contactHref}
          className={`inline-flex items-center justify-center px-4 h-10 rounded-none text-sm font-medium transition-colors ${
            isPopular
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-secondary text-secondary-foreground border border-[#0000001a] hover:bg-bagh-50'
          }`}
        >
          {bookCallLabel}
        </Link>
      </div>
    </div>
  </div>
)

const AccordionPlan = ({ plan, index, isPopular, isOpen, onToggle, bookCallLabel, mostPopularLabel, contactHref }) => (
  <div className="border-b border-primary/10 last:border-b-0">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between py-4 px-5 text-left"
    >
      <div className="flex items-center gap-3">
        <span className="font-medium text-base">{plan.title}</span>
        {isPopular && (
          <span className="text-xs opacity-70 font-normal">{mostPopularLabel}</span>
        )}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-medium text-sm">{plan.price}</span>
        <ChevronDownIcon
          className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="px-5 pb-5 flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">{plan.description}</p>
            <div className="flex flex-col gap-2.5">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckIcon className="w-[14px] h-[14px] flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            <Link
              to={contactHref}
              className={`mt-1 inline-flex items-center justify-center px-4 h-10 rounded-none text-sm font-medium transition-colors ${
                isPopular
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-secondary text-secondary-foreground border border-[#0000001a] hover:bg-bagh-50'
              }`}
            >
              {bookCallLabel}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

const Pricing = ({ plans, heading }) => {
  const { t } = useTranslation('common')
  const location = useLocation()
  const basePath = location.pathname.startsWith('/en') ? '/en' : ''
  const contactHref = `${basePath}/contact`
  const bookCallLabel = t('cta.bookCall')
  const mostPopularLabel = t('cta.mostPopular')

  const popularIndex = plans.findIndex(p => p.popular)
  const [openIndex, setOpenIndex] = useState(popularIndex !== -1 ? popularIndex : 0)

  return (
    <section className="flex flex-col items-center justify-center gap-20 w-[95%] mx-auto py-20 bg-background text-foreground">
      <div className="flex flex-col items-center gap-7 w-full">
        <h2 className="font-medium text-2xl leading-6 text-center">
          {heading || 'Pricing'}
        </h2>
      </div>

      {/* Desktop: horizontal cards */}
      <div className="hidden md:flex justify-between flex-wrap max-w-4xl w-full">
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            plan={plan}
            index={index}
            isPopular={plan.popular}
            bookCallLabel={bookCallLabel}
            mostPopularLabel={mostPopularLabel}
            contactHref={contactHref}
          />
        ))}
      </div>

      {/* Mobile: accordion */}
      <div className="md:hidden w-full border border-primary/10">
        {plans.map((plan, index) => (
          <AccordionPlan
            key={index}
            plan={plan}
            index={index}
            isPopular={plan.popular}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            bookCallLabel={bookCallLabel}
            mostPopularLabel={mostPopularLabel}
            contactHref={contactHref}
          />
        ))}
      </div>
    </section>
  )
}

export { Pricing }
