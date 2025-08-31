import React from 'react'

const AboutSection = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-bagh-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl-robotic md:text-4xl-robotic lg:text-5xl-robotic font-light text-gray-900 mb-8 leading-tight">
            About BaghLabs
          </h2>
          <p className="text-base-robotic md:text-lg-robotic text-gray-700 mb-12 leading-relaxed">
            At BaghLabs, we believe the best products are born from everyday challenges. Our mission is simple: transform inefficiencies into powerful software solutions.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="space-y-3">
              <h3 className="text-lg-robotic md:text-xl-robotic font-medium text-gray-900">
                SaaS Product Development
              </h3>
              <p className="text-sm-robotic md:text-base-robotic text-gray-600 leading-relaxed">
                We build scalable, user-friendly SaaS applications that solve real business problems and drive growth.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg-robotic md:text-xl-robotic font-medium text-gray-900">
                Custom Digital Solutions
              </h3>
              <p className="text-sm-robotic md:text-base-robotic text-gray-600 leading-relaxed">
                Tailored software solutions designed specifically for your unique business requirements and workflows.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg-robotic md:text-xl-robotic font-medium text-gray-900">
                Future-Focused Innovation
              </h3>
              <p className="text-sm-robotic md:text-base-robotic text-gray-600 leading-relaxed">
                We stay ahead of technology trends to deliver cutting-edge solutions that future-proof your business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection
