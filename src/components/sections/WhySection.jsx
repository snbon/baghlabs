import React from 'react'

const WhySection = () => {
  const reasons = [
    {
      title: 'Simplicity',
      description: 'Products designed to be intuitive and easy to use.'
    },
    {
      title: 'Speed',
      description: 'From concept to launch, we move fast.'
    },
    {
      title: 'Impact',
      description: 'Focused on solving real problems that matter.'
    }
  ]

  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl-robotic md:text-4xl-robotic lg:text-5xl-robotic font-light text-gray-900 mb-6 leading-tight">
            Why BaghLabs?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl-robotic md:text-2xl-robotic font-medium text-gray-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-sm-robotic md:text-base-robotic text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhySection
