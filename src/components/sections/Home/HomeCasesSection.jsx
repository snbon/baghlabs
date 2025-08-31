import React from 'react'
import { Link } from 'react-router-dom'
import casesData from '../../../data/cases.json'

const HomeCasesSection = () => {
  const { cases } = casesData

  const handleCaseClick = (caseId) => {
    console.log('Case clicked:', caseId)
    console.log('Link should navigate to:', `/cases/${caseId}`)
  }

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
            <div 
              key={caseItem.id} 
              className="case-item bg-gray-50 p-8 rounded-lg transition-all duration-300 group"
            >
              <div className="text-left">
                <span className="text-xs-robotic text-gray-500 uppercase tracking-wider mb-2 block">
                  {caseItem.category}
                </span>
                <h3 className="text-xl-robotic md:text-2xl-robotic font-medium text-gray-900 mb-3 group-hover:text-bagh-600 transition-colors duration-300">
                  {caseItem.name}
                </h3>
                <p className="text-sm-robotic md:text-base-robotic text-gray-600 leading-relaxed mb-4">
                  {caseItem.description}
                </p>
                
                {/* Visit Case Study Link */}
                <Link 
                  to={`/cases/${caseItem.id}`}
                  onClick={() => handleCaseClick(caseItem.id)}
                  className="inline-flex items-center text-bagh-600 hover:text-bagh-700 font-light text-sm transition-colors duration-200"
                >
                  Visit Case Study
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
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

export default HomeCasesSection
