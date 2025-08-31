import React from 'react'

const CTASection = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-bagh-800">
      <div className="container-custom text-center">
        <h2 className="text-3xl-robotic md:text-4xl-robotic lg:text-5xl-robotic font-light text-white mb-6 leading-tight">
          Call to Action
        </h2>
        <p className="text-base-robotic md:text-lg-robotic text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
          Whether you're here to explore our products or looking for a digital partner to bring your idea to life — you're in the right place.
        </p>
        <p className="text-lg-robotic md:text-xl-robotic text-white mb-8 font-medium">
          BaghLabs — From Concept to Product to Impact.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-bagh-800 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-sm-robotic">
            Explore Our Products
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-bagh-800 font-medium py-3 px-8 rounded-lg transition-all duration-200 text-sm-robotic">
            Work With Us
          </button>
        </div>
      </div>
    </div>
  )
}

export default CTASection
