import React from 'react'

import { Link } from 'react-router-dom'

const CTASection = () => {
  return (
    <div className="w-full h-full flex flex-col bg-bagh-800">
      {/* CTA Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="container-custom text-center">
          <h2 className="text-3xl-robotic md:text-4xl-robotic lg:text-5xl-robotic font-light text-white mb-6 leading-tight">
            From Concept to Product to Impact
          </h2>
          <p className="text-base-robotic md:text-lg-robotic text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
            Whether you're here to explore our products or looking for a digital partner to bring your idea to life — you're in the right place.
          </p>
          <p className="text-lg-robotic md:text-xl-robotic text-white mb-8 font-medium">
            We are currently not taking on new projects, but we are still allowed to chat over a coffee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.linkedin.com/company/baghlabs/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-bagh-800 font-medium py-3 px-8 rounded-lg transition-all duration-200 text-sm-robotic inline-block text-center"
            >
              Connect with us
            </a>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="bg-bagh-900 border-t border-bagh-700">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Company Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-bagh-800 rounded-md flex items-center justify-center">
                  <span className="text-white font-light text-sm">B</span>
                </div>
                <span className="text-lg font-light text-white">BaghLabs</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                From Concept to Product to Impact. A software studio dedicated to turning bold ideas into impactful digital products.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-sm font-light text-white">Quick Links</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="/" className="text-xs text-gray-300 hover:text-white transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/cases" className="text-xs text-gray-300 hover:text-white transition-colors duration-200">
                    Our Cases
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <h3 className="text-sm font-light text-white">Get in Touch</h3>
              <p className="text-xs text-gray-300">
                Ready to bring your idea to life?
              </p>
            </div>
          </div>

          <div className="border-t border-bagh-700 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              <p className="text-xs text-gray-400">
                © 2025 BaghLabs. All rights reserved.
              </p>
              <p className="text-xs text-gray-400">
                From Concept to Product to Impact
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTASection
