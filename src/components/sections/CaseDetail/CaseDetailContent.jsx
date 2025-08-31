import React, { useState } from 'react'

const CaseDetailContent = ({ caseData }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  const openImageModal = (image) => {
    setSelectedImage(image)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="w-full py-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Main Image */}
          <div className="content-section mb-32 animate-fade-in-up" data-animation-delay="0.1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-3xl -z-10 animate-scale-in" data-animation-delay="0.3"></div>
              <img
                src={caseData.heroImage}
                alt={caseData.name}
                className="w-full h-auto rounded-3xl animate-fade-in-scale"
                data-animation-delay="0.5"
              />
            </div>
          </div>

          {/* Project Description */}
          <div className="content-section mb-32 animate-fade-in-up" data-animation-delay="0.2">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg-robotic md:text-xl-robotic text-gray-600 leading-relaxed font-light text-center max-w-3xl mx-auto animate-text-reveal" data-animation-delay="0.4">
                {caseData.longDescription}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="content-section mb-32 animate-fade-in-up" data-animation-delay="0.3">
            <div className="text-center mb-16 animate-slide-in-down" data-animation-delay="0.5">
              <h2 className="text-2xl-robotic md:text-3xl-robotic font-light text-gray-400 uppercase tracking-widest mb-2">
                Tech Stack
              </h2>
              <div className="w-16 h-px bg-gray-200 mx-auto animate-line-expand" data-animation-delay="0.7"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {caseData.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="group relative px-4 py-2 bg-white text-gray-600 rounded-lg text-xs-robotic font-light border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 overflow-hidden animate-fade-in-up"
                  data-animation-delay={0.8 + (index * 0.1)}
                >
                  {/* Subtle background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-bagh-50/0 via-bagh-50/50 to-bagh-50/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></div>
                  
                  {/* Text with relative positioning */}
                  <span className="relative z-10">{tech}</span>
                  
                  {/* Subtle border animation */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-bagh-300 group-hover:w-full transition-all duration-300 ease-out"></div>
                </span>
              ))}
            </div>
          </div>

                    {/* Features Grid */}
          <div className="content-section mb-32 animate-fade-in-up" data-animation-delay="0.4">
            <div className="text-center mb-16 animate-slide-in-down" data-animation-delay="0.6">
              <h2 className="text-2xl-robotic md:text-3xl-robotic font-light text-gray-400 uppercase tracking-widest mb-2">
                Key Features
              </h2>
              <div className="w-16 h-px bg-gray-200 mx-auto animate-line-expand" data-animation-delay="0.8"></div>
            </div>
            
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseData.features.map((feature, index) => (
                <div key={index} className="group animate-fade-in-up" data-animation-delay={1.0 + (index * 0.15)}>
                  <div className="relative bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-32">
                    {/* Subtle background animation */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-bagh-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
                    
                    {/* Compact icon with subtle animation */}
                    <div className="relative flex flex-col h-full justify-center space-y-3">
                      <div className="w-10 h-10 min-w-[40px] min-h-[40px] bg-gradient-to-br from-bagh-50 to-bagh-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 ease-out group-hover:from-green-50 group-hover:to-green-100 flex-shrink-0 mx-auto">
                        <div className="w-2.5 h-2.5 min-w-[10px] min-h-[10px] bg-bagh-400 rounded-full group-hover:bg-green-500 transition-colors duration-300"></div>
                      </div>
                      <p className="text-sm-robotic text-gray-700 font-light leading-relaxed text-center px-2">{feature}</p>
                    </div>
                    
                    {/* Subtle border animation */}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-bagh-300 group-hover:w-full transition-all duration-500 ease-out"></div>
                  </div>
                </div>
              ))}
            </div>
            
                        {/* Mobile Horizontal Scroll with Peek */}
            <div className="md:hidden overflow-x-auto scrollbar-hide animate-fade-in-up" data-animation-delay={1.0}>
              <div className="flex space-x-4 pb-4 pl-4 pr-8" style={{ width: 'max-content' }}>
                {caseData.features.map((feature, index) => (
                  <div key={index} className="group flex-shrink-0">
                    <div className="relative bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden w-72 h-32">
                      {/* Subtle background animation */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-bagh-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
                      
                      {/* Compact icon with subtle animation */}
                      <div className="relative flex flex-col h-full justify-center space-y-3">
                        <div className="w-10 h-10 min-w-[40px] min-h-[40px] bg-gradient-to-br from-bagh-50 to-bagh-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 ease-out group-hover:from-green-50 group-hover:to-green-100 flex-shrink-0 mx-auto">
                          <div className="w-2.5 h-2.5 min-w-[10px] min-h-[10px] bg-bagh-400 rounded-full group-hover:bg-green-500 transition-colors duration-300"></div>
                        </div>
                        <p className="text-sm-robotic text-gray-700 font-light leading-relaxed text-center px-2">{feature}</p>
                      </div>
                      
                      {/* Subtle border animation */}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-bagh-300 group-hover:w-full transition-all duration-500 ease-out"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="content-section mb-32 animate-fade-in-up" data-animation-delay="0.5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-6 animate-slide-in-left" data-animation-delay="0.7">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl-robotic md:text-3xl-robotic font-light text-gray-400 uppercase tracking-widest mb-2">
                    Challenge
                  </h2>
                  <div className="w-16 h-px bg-gray-200 lg:mx-0 mx-auto mb-6 animate-line-expand" data-animation-delay="0.9"></div>
                </div>
                <p className="text-lg-robotic text-gray-600 leading-relaxed font-light animate-text-reveal" data-animation-delay="1.1">
                  {caseData.challenge}
                </p>
              </div>
              
              <div className="space-y-6 animate-slide-in-right" data-animation-delay="0.8">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl-robotic md:text-3xl-robotic font-light text-gray-400 uppercase tracking-widest mb-2">
                    Solution
                  </h2>
                  <div className="w-16 h-px bg-gray-200 lg:mx-0 mx-auto mb-6 animate-line-expand" data-animation-delay="1.0"></div>
                </div>
                <p className="text-lg-robotic text-gray-600 leading-relaxed font-light animate-text-reveal" data-animation-delay="1.2">
                  {caseData.solution}
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="content-section mb-32 animate-fade-in-up" data-animation-delay="0.6">
            <div className="text-center mb-16 animate-slide-in-down" data-animation-delay="0.8">
              <h2 className="text-2xl-robotic md:text-3xl-robotic font-light text-gray-400 uppercase tracking-widest mb-2">
                Results
              </h2>
              <div className="w-16 h-px bg-gray-200 mx-auto animate-line-expand" data-animation-delay="1.0"></div>
            </div>
            
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {caseData.results.map((result, index) => (
                <div key={index} className="group animate-fade-in-up" data-animation-delay={1.2 + (index * 0.1)}>
                  <div className="relative bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-40">
                    {/* Subtle shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    
                    {/* Compact icon with micro-animation - Fixed sizing */}
                    <div className="relative flex flex-col h-full">
                      {/* Icon section - Fixed height and size */}
                      <div className="flex-shrink-0 h-12 flex items-center justify-center mb-3">
                        <div className="w-10 h-10 min-w-[40px] min-h-[40px] bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ease-out">
                          <svg className="w-5 h-5 text-green-500 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                      </div>
                      {/* Text section - Flexible height with proper spacing */}
                      <div className="flex-1 flex items-start justify-center px-3">
                        <p className="text-xs-robotic text-gray-600 leading-relaxed font-light text-center break-words hyphens-auto">{result}</p>
                      </div>
                    </div>
                    
                    {/* Subtle corner accent */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-bagh-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile Horizontal Scroll */}
            <div className="md:hidden overflow-x-auto scrollbar-hide animate-fade-in-up" data-animation-delay={1.2}>
              <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
                {caseData.results.map((result, index) => (
                  <div key={index} className="group flex-shrink-0">
                    <div className="relative bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden w-64 h-40">
                      {/* Subtle shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                      
                      {/* Compact icon with micro-animation - Fixed sizing */}
                      <div className="relative flex flex-col h-full">
                        {/* Icon section - Fixed height and size */}
                        <div className="flex-shrink-0 h-12 flex items-center justify-center mb-3">
                          <div className="w-10 h-10 min-w-[40px] min-h-[40px] bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ease-out">
                            <svg className="w-5 h-5 text-green-500 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                        </div>
                        {/* Text section - Flexible height with proper spacing */}
                        <div className="flex-1 flex items-start justify-center px-3">
                          <p className="text-xs-robotic text-gray-600 leading-relaxed font-light text-center break-words hyphens-auto">{result}</p>
                        </div>
                      </div>
                      
                      {/* Subtle corner accent */}
                      <div className="absolute top-0 right-0 w-0 h-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-bagh-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="content-section animate-fade-in-up" data-animation-delay="0.7">
            <div className="text-center mb-16 animate-slide-in-down" data-animation-delay="0.9">
              <h2 className="text-2xl-robotic md:text-3xl-robotic font-light text-gray-400 uppercase tracking-widest mb-2">
                Gallery
              </h2>
              <div className="w-16 h-px bg-gray-200 mx-auto animate-line-expand" data-animation-delay="1.1"></div>
            </div>
            
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              {caseData.gallery.map((image, index) => (
                <div key={index} className="group animate-fade-in-up" data-animation-delay={1.3 + (index * 0.15)}>
                  <div 
                    className="relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                    onClick={() => openImageModal(image)}
                  >
                    <img
                      src={image}
                      alt={`${caseData.name} screenshot ${index + 1}`}
                      className="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                    {/* Click indicator */}
                    <div className="absolute top-4 right-4 bg-white/90 text-gray-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile Horizontal Scroll with Peek */}
            <div className="md:hidden overflow-x-auto scrollbar-hide animate-fade-in-up" data-animation-delay={1.3}>
              <div className="flex space-x-4 pb-4 pl-4 pr-8" style={{ width: 'max-content' }}>
                {caseData.gallery.map((image, index) => (
                  <div key={index} className="group flex-shrink-0">
                    <div 
                      className="relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 w-80 h-48 cursor-pointer"
                      onClick={() => openImageModal(image)}
                    >
                      <img
                        src={image}
                        alt={`${caseData.name} screenshot ${index + 1}`}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                      {/* Click indicator */}
                      <div className="absolute top-4 right-4 bg-white/90 text-gray-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-7xl max-h-full">
            <img
              src={selectedImage}
              alt="Full size view"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            {/* Close button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-white/90 text-gray-700 p-3 rounded-full hover:bg-white transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CaseDetailContent
