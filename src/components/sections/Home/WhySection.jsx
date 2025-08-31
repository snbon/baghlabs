import React from 'react'

const WhySection = () => {
  const reasons = [
    {
      title: 'We Solve Real Problems',
      description: 'Not imagined ones. We start with the actual challenges your business faces every day and build solutions that address them directly. No feature bloat, no unnecessary complexity just what works.'
    },
    {
      title: 'Simplicity is Our Superpower',
      description: 'The best solutions are invisible. We take complex business processes and make them feel effortless. If your team can use it without training, we\'ve done our job right.'
    },
    {
      title: 'Your Success Defines Ours',
      description: 'We measure our success by your results. When your business runs smoother, when your team is more productive, when your customers are happier that\'s what drives us forward.'
    }
  ]

  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl-robotic md:text-4xl-robotic lg:text-5xl-robotic font-light text-gray-900 mb-6 leading-tight">
            Why BaghLabs?
          </h2>
          <p className="text-base-robotic md:text-lg-robotic text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
            Because building software isn't about technology. It's about understanding people, 
            their challenges, and creating solutions that make their lives better. That's our philosophy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl-robotic md:text-2xl-robotic font-medium text-gray-900 mb-4">
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
