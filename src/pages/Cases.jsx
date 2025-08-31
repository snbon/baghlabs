import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const Cases = () => {
  const pageRef = useRef(null)

  const cases = [
    {
      id: 'shiftend',
      name: 'ShiftEnd',
      description: 'A digital tool helping Belgian restaurants replace outdated paper-based workflows with a simple, affordable SaaS solution.',
      longDescription: 'ShiftEnd revolutionizes how Belgian restaurants manage their daily operations. By replacing cumbersome paper-based systems with an intuitive digital platform, we\'ve helped restaurants streamline their workflows, reduce errors, and focus on what matters most - serving great food and providing excellent customer experiences.',
      image: '/api/placeholder/800/500/2563a0/ffffff?text=ShiftEnd',
      category: 'Restaurant Management',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      features: ['Digital workflow management', 'Real-time reporting', 'Mobile-first design', 'Multi-location support']
    },
    {
      id: 'availly',
      name: 'Availly',
      description: 'A calendar and availability tool designed to make scheduling effortless and efficient.',
      longDescription: 'Availly transforms the way teams and individuals manage their schedules. With intelligent availability detection and seamless integration capabilities, scheduling meetings and coordinating team activities has never been easier. The platform adapts to your workflow, not the other way around.',
      image: '/api/placeholder/800/500/1e40af/ffffff?text=Availly',
      category: 'Scheduling & Calendar',
      technologies: ['Vue.js', 'Python', 'MongoDB', 'Google Calendar API'],
      features: ['Smart availability detection', 'Calendar integration', 'Team coordination', 'Automated scheduling']
    },
    {
      id: 'coming-soon-1',
      name: 'Project Alpha',
      description: 'An innovative solution for modern businesses. More details coming soon.',
      longDescription: 'Project Alpha represents the next generation of business intelligence tools. We\'re currently developing a platform that will revolutionize how companies analyze data, make decisions, and drive growth. Stay tuned for more details.',
      image: '/api/placeholder/800/500/059669/ffffff?text=Coming+Soon',
      category: 'Business Solutions',
      technologies: ['React Native', 'Python', 'TensorFlow', 'Kubernetes'],
      features: ['AI-powered insights', 'Real-time analytics', 'Predictive modeling', 'Scalable architecture']
    },
    {
      id: 'coming-soon-2',
      name: 'Project Beta',
      description: 'Revolutionary platform designed to transform industry workflows.',
      longDescription: 'Project Beta is our most ambitious project yet. We\'re building a comprehensive platform that will streamline complex industrial processes, reduce waste, and increase efficiency across multiple sectors. This project showcases our commitment to solving real-world challenges.',
      image: '/api/placeholder/800/500/7c3aed/ffffff?text=Coming+Soon',
      category: 'Industry 4.0',
      technologies: ['Next.js', 'Go', 'InfluxDB', 'Docker'],
      features: ['IoT integration', 'Process automation', 'Performance monitoring', 'Predictive maintenance']
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for case cards
      gsap.fromTo('.case-item',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pageRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-bagh-50">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl heading-minimal text-bagh-800 mb-4">
            Our Cases
          </h1>
          <p className="text-base text-minimal max-w-3xl mx-auto">
            Explore our portfolio of successful projects and see how we've helped businesses transform their digital presence.
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-12">
            {cases.map((caseItem, index) => (
              <article
                key={caseItem.id}
                className={`case-item flex flex-col lg:flex-row gap-6 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-lg overflow-hidden border border-bagh-100">
                    <img
                      src={caseItem.image}
                      alt={caseItem.name}
                      className="w-full h-56 lg:h-64 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block bg-white/90 text-bagh-800 text-xs font-light px-2 py-1 rounded">
                        {caseItem.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-4">
                  <div>
                    <h2 className="text-2xl heading-minimal text-bagh-800 mb-3">
                      {caseItem.name}
                    </h2>
                    <p className="text-sm text-minimal leading-relaxed">
                      {caseItem.longDescription}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-sm font-light text-bagh-800 mb-2">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {caseItem.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-bagh-100 text-bagh-700 px-2 py-1 rounded text-xs font-light"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h3 className="text-sm font-light text-bagh-800 mb-2">
                      Key Features
                    </h3>
                    <ul className="space-y-1">
                      {caseItem.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-minimal text-sm">
                          <svg className="w-3 h-3 text-bagh-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className="inline-flex items-center btn-primary"
                    >
                      View Full Case Study
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center text-bagh-400 font-light text-sm">
                      Coming Soon
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cases
