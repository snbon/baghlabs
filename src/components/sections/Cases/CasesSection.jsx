import React from 'react'

const CasesSection = () => {
  const cases = [
    {
      name: 'ShiftEnd',
      description: 'A digital tool helping Belgian restaurants replace outdated paper based workflows with a simple, affordable SaaS solution.',
      category: 'SaaS Platform'
    },
    {
      name: 'Availly',
      description: 'A calendar and availability tool designed to make scheduling effortless and efficient.',
      category: 'Productivity Tool'
    }
  ]

  return (
    <div className="w-full h-full flex items-center justify-center bg-white overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl-robotic md:text-4xl-robotic lg:text-5xl-robotic font-light text-gray-900 mb-6 leading-tight">
            Our Cases
          </h2>
          <p className="text-base-robotic md:text-lg-robotic text-gray-700 max-w-2xl mx-auto leading-relaxed">
            We don't just build ideas — we launch them.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {cases.map((caseItem, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg transition-all duration-300">
              <div className="text-left">
                <span className="text-xs-robotic text-gray-500 uppercase tracking-wider mb-2 block">
                  {caseItem.category}
                </span>
                <h3 className="text-xl-robotic md:text-2xl-robotic font-medium text-gray-900 mb-3">
                  {caseItem.name}
                </h3>
                <p className="text-sm-robotic md:text-base-robotic text-gray-600 leading-relaxed">
                  {caseItem.description}
                </p>
              </div>
            </div>
          ))}
          
          <div className="md:col-span-2 text-center mt-8">
            <p className="text-sm-robotic text-gray-500 italic">
              More products coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CasesSection
