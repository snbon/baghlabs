import React from 'react'

const CaseDetailHero = ({ caseData }) => {
  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div className="container-custom text-center">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          <div>
            <span className="inline-block bg-bagh-200 text-bagh-800 text-xs-robotic font-light px-3 py-1.5 rounded-lg mb-4 md:mb-6">
              {caseData.category}
            </span>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900 mb-4 md:mb-6 leading-tight tracking-tight">
              {caseData.name}
            </h1>
            <p className="text-base-robotic md:text-lg-robotic lg:text-xl-robotic text-gray-700 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed">
              {caseData.tagline}
            </p>
            <p className="text-base-robotic md:text-lg-robotic text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {caseData.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaseDetailHero
