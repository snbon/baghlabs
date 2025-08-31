import React from 'react'
import { Link } from 'react-router-dom'

const CaseCard = ({ caseItem, index }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="container-custom">
        <article className="case-item flex flex-col lg:flex-row gap-12 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden border border-bagh-100 shadow-lg">
              <img
                src={caseItem.image}
                alt={caseItem.name}
                className="w-full h-64 lg:h-80 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-block bg-white/95 text-bagh-800 text-sm font-light px-3 py-1.5 rounded-lg shadow-sm">
                  {caseItem.category}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div>
              <h2 className="text-3xl-robotic md:text-4xl-robotic lg:text-5xl-robotic font-light text-gray-900 mb-4 leading-tight">
                {caseItem.name}
              </h2>
              <p className="text-base-robotic md:text-lg-robotic text-gray-700 leading-relaxed">
                {caseItem.longDescription}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-sm-robotic md:text-base-robotic font-light text-gray-900 mb-3 uppercase tracking-wide">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {caseItem.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-bagh-100 text-bagh-700 px-3 py-1.5 rounded-lg text-sm-robotic font-light border border-bagh-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-sm-robotic md:text-base-robotic font-light text-gray-900 mb-3 uppercase tracking-wide">
                Key Features
              </h3>
              <ul className="space-y-2">
                {caseItem.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700 text-base-robotic">
                    <svg className="w-4 h-4 text-bagh-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            {caseItem.id !== 'coming-soon-1' && caseItem.id !== 'coming-soon-2' ? (
              <Link
                to={`/cases/${caseItem.id}`}
                className="inline-flex items-center btn-secondary text-base px-4 py-1.5"
              >
                Learn more 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <span className="inline-flex items-center text-bagh-400 font-light text-base px-6 py-3 border border-bagh-200 rounded-md">
                Coming Soon
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}

export default CaseCard
