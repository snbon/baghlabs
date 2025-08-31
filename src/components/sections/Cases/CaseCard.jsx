import React from 'react'
import { Link } from 'react-router-dom'

const CaseCard = ({ caseItem, index }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="container-custom">
        <article className="case-item flex flex-col lg:flex-row gap-12 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={caseItem.image}
                alt={caseItem.name}
                className="w-full h-64 lg:h-80 object-contain"
              />
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
                    className="bg-bagh-100 text-bagh-700 px-3 py-1.5 rounded-lg text-sm-robotic font-light"
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
            <div className="flex flex-wrap gap-3">
              {caseItem.id === 'availly' ? (
                <>
                  <Link
                    to={`/cases/${caseItem.id}`}
                    className="inline-flex items-center btn-secondary text-sm px-3 py-2"
                  >
                    Case Detail
                    <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <a
                    href="https://availly.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center btn-primary text-sm px-3 py-2"
                  >
                    Visit Website
                    <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </>
              ) : caseItem.id === 'shiftend' ? (
                <>
                  <Link
                    to={`/cases/${caseItem.id}`}
                    className="inline-flex items-center btn-secondary text-sm px-3 py-2"
                  >
                    Case Detail
                    <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <a
                    href="https://shiftend.be"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center btn-primary text-sm px-3 py-2"
                  >
                    Visit Website
                    <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 002 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </>
              ) : (
                <span className="inline-flex items-center text-bagh-400 font-light text-sm px-4 py-2 rounded-md">
                  Coming Soon
                  <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default CaseCard
