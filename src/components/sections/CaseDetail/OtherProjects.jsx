import React from 'react'
import { Link } from 'react-router-dom'

const OtherProjects = ({ currentCaseId, allCases }) => {
  // Filter out the current case and get other projects
  const otherCases = allCases.filter(caseItem => caseItem.id !== currentCaseId).slice(0, 2)

  const renderProjectCard = (caseItem) => {
    const cardContent = (
      <div className="bg-white rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-[1.02] h-full flex flex-col">
        {/* Image */}
        <div className="relative flex-shrink-0">
          <img
            src={caseItem.image}
            alt={caseItem.name}
            className="w-full h-48 object-contain"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 flex-1 flex flex-col">
          <h3 className="text-2xl-robotic md:text-3xl-robotic font-light text-gray-900 leading-tight">
            {caseItem.name}
          </h3>
          <p className="text-base-robotic text-gray-700 leading-relaxed flex-1">
            {caseItem.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {caseItem.technologies.slice(0, 3).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="bg-bagh-50 text-bagh-700 px-3 py-1 rounded-lg text-xs-robotic font-light"
              >
                {tech}
              </span>
            ))}
            {caseItem.technologies.length > 3 && (
              <span className="text-xs-robotic text-bagh-500">
                +{caseItem.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center text-bagh-600 group-hover:text-bagh-700 transition-colors duration-200 mt-auto">
            <span className="text-sm-robotic font-light">
              Visit Case
            </span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    )

    return (
      <Link to={`/cases/${caseItem.id}`} className="block h-full">
        {cardContent}
      </Link>
    )
  }

  return (
    <div className="w-full py-16">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-3xl-robotic md:text-4xl-robotic lg:text-5xl-robotic font-light text-gray-900 mb-6 leading-tight">
              Other Projects
            </h2>
            <p className="text-base-robotic md:text-lg-robotic text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Explore our other successful projects and see how we've helped businesses transform their digital presence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {otherCases.map((caseItem) => (
              <div key={caseItem.id} className="group">
                {renderProjectCard(caseItem)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OtherProjects
