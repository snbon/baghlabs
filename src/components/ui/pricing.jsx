import { CheckIcon } from 'lucide-react'

const Pricing = ({ plans, heading }) => {
  return (
    <section className="flex flex-col items-center justify-center gap-20 w-[95%] mx-auto py-20 bg-background text-foreground">
      <div className="flex flex-col items-center gap-7 w-full">
        <h2 className="font-medium text-2xl leading-6 text-center">
          {heading || 'Simple and transparent pricing'}
        </h2>
      </div>
      <div className="flex justify-between flex-wrap max-w-4xl w-full">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`flex-1 border border-primary/10 rounded-none ${
              index === 1 ? 'border-t border-b border-l-0 border-r-0' : ''
            }`}
          >
            <div className="p-[30px] flex flex-col h-full gap-6 justify-between">
              <div className="flex flex-col gap-6">
                <div className="p-0 flex flex-col gap-4">
                  <div className="font-medium text-xl leading-5">
                    {plan.title}{' '}
                    {plan.popular && (
                      <span className="text-sm leading-[14px] opacity-80 font-normal">
                        // most popular
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
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-1.5">
                      <CheckIcon className="w-[15px] h-[15px] flex-shrink-0" />
                      <span className="font-normal text-sm leading-[15.4px]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <hr />
              <div className="p-0">
                <a
                  href="https://www.linkedin.com/in/snoubagh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center w-[120px] h-10 rounded-none text-sm font-medium transition-colors ${
                    index === 1
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground border border-[#0000001a] hover:bg-bagh-50'
                  }`}
                >
                  Book a call
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export { Pricing }
