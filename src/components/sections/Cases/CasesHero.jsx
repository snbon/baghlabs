import React from 'react'

const CasesHero = ({ title, description }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="container-custom text-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
          {title}
        </h1>
        <p className="text-base-robotic md:text-lg-robotic lg:text-xl-robotic text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

export default CasesHero
