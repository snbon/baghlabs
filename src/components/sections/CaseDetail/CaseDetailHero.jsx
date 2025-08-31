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
            
            {/* Visit Website Link */}
            {caseData.websiteUrl && (
              <div className="mt-8">
                <a
                  href={caseData.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-bagh-600 hover:text-bagh-800 font-light transition-colors duration-200 text-sm-robotic underline underline-offset-4 hover:no-underline"
                >
                  Visit Website
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaseDetailHero
