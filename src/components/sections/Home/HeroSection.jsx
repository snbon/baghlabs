import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div className="w-full h-full flex items-center justify-center hero-bg-morph">
      <div className="container-custom text-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
          From Concept to Product to Impact
        </h1>
        <p className="text-base-robotic md:text-lg-robotic lg:text-xl-robotic text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
          A software studio dedicated to turning bold ideas into impactful digital products. We design and build SaaS solutions that simplify, scale, and solve real business challenges.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/cases" className="btn-secondary text-sm-robotic">
            Explore
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroSection

