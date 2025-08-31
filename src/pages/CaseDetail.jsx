import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const CaseDetail = () => {
  const { caseName } = useParams()
  const pageRef = useRef(null)

  // Case data - in a real app, this would come from an API
  const caseData = {
    shiftend: {
      name: 'ShiftEnd',
      tagline: 'Revolutionizing Restaurant Management in Belgium',
      description: 'A comprehensive digital platform that transforms how Belgian restaurants manage their daily operations, replacing outdated paper-based systems with intuitive, efficient digital workflows.',
      longDescription: `ShiftEnd was born from a simple observation: Belgian restaurants were drowning in paperwork. From order management to inventory tracking, everything was manual, error-prone, and time-consuming. We set out to create a solution that would not only digitize these processes but make them more efficient and user-friendly.

Our team worked closely with restaurant owners and staff to understand their pain points and workflows. The result is a platform that seamlessly integrates into their daily operations, reducing administrative overhead and allowing them to focus on what they do best: creating amazing dining experiences.

The platform handles everything from order management and table reservations to inventory tracking and staff scheduling. With real-time reporting and analytics, restaurant owners gain unprecedented insights into their operations, helping them make data-driven decisions to improve efficiency and profitability.`,
      image: '/api/placeholder/1200/600/2563a0/ffffff?text=ShiftEnd+Platform',
      category: 'Restaurant Management',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Redis', 'Socket.io'],
      features: [
        'Digital workflow management',
        'Real-time reporting and analytics',
        'Mobile-first responsive design',
        'Multi-location support',
        'Inventory management',
        'Staff scheduling and management',
        'Customer relationship management',
        'Integration with POS systems'
      ],
      challenges: [
        'Complex workflow mapping for different restaurant types',
        'Real-time synchronization across multiple devices',
        'Offline functionality for unreliable internet connections',
        'Integration with existing restaurant systems'
      ],
      solutions: [
        'Modular workflow engine that adapts to different business models',
        'WebSocket-based real-time updates with fallback mechanisms',
        'Progressive Web App with offline-first architecture',
        'Comprehensive API for third-party integrations'
      ],
      results: [
        '50% reduction in administrative overhead',
        '90% decrease in order errors',
        'Real-time visibility into operations',
        'Improved customer satisfaction scores'
      ],
      images: [
        '/api/placeholder/800/500/2563a0/ffffff?text=Dashboard+View',
        '/api/placeholder/800/500/1e40af/ffffff?text=Mobile+App',
        '/api/placeholder/800/500/059669/ffffff?text=Analytics+Panel'
      ]
    },
    availly: {
      name: 'Availly',
      tagline: 'Making Scheduling Effortless and Intelligent',
      description: 'An intelligent calendar and availability management platform that adapts to your workflow, making team coordination and meeting scheduling seamless and efficient.',
      longDescription: `Scheduling meetings and coordinating team availability has always been a pain point for businesses. Traditional calendar tools require manual back-and-forth communication, leading to wasted time and frustration. Availly was designed to solve this problem by creating an intelligent system that understands availability patterns and automates the scheduling process.

Our approach focused on creating a platform that learns from user behavior and preferences. By analyzing calendar data and availability patterns, Availly can suggest optimal meeting times, automatically handle scheduling conflicts, and provide intelligent recommendations for team coordination.

The platform integrates seamlessly with existing calendar systems like Google Calendar and Outlook, while providing additional features like team availability visualization, automated scheduling rules, and conflict resolution. This makes it easy for teams to coordinate without disrupting their existing workflows.`,
      image: '/api/placeholder/1200/600/1e40af/ffffff?text=Availly+Platform',
      category: 'Scheduling & Calendar',
      technologies: ['Vue.js', 'Python', 'MongoDB', 'Google Calendar API', 'Outlook API', 'Redis'],
      features: [
        'Smart availability detection',
        'Calendar integration (Google, Outlook)',
        'Team coordination tools',
        'Automated scheduling',
        'Conflict resolution',
        'Availability visualization',
        'Meeting templates',
        'Recurring meeting management'
      ],
      challenges: [
        'Complex calendar integration across multiple platforms',
        'Real-time availability synchronization',
        'Intelligent conflict resolution',
        'User preference learning and adaptation'
      ],
      solutions: [
        'Unified API layer for multiple calendar providers',
        'Event-driven architecture for real-time updates',
        'Machine learning algorithms for conflict resolution',
        'Progressive learning system for user preferences'
      ],
      results: [
        '75% reduction in scheduling time',
        'Elimination of double-booking issues',
        'Improved team coordination efficiency',
        'Enhanced user satisfaction with scheduling process'
      ],
      images: [
        '/api/placeholder/800/500/1e40af/ffffff?text=Calendar+View',
        '/api/placeholder/800/500/2563a0/ffffff?text=Team+Availability',
        '/api/placeholder/800/500/059669/ffffff?text=Scheduling+Interface'
      ]
    }
  }

  const currentCase = caseData[caseName]

  useEffect(() => {
    if (!currentCase) return

    const ctx = gsap.context(() => {
      // Fade in elements on scroll
      gsap.fromTo('.animate-on-scroll',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pageRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Stagger animation for feature lists
      gsap.fromTo('.feature-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.features-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [currentCase])

  if (!currentCase) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl heading-minimal text-bagh-800 mb-3">Case Not Found</h1>
          <p className="text-sm text-minimal mb-4">The case study you're looking for doesn't exist.</p>
          <Link to="/cases" className="btn-primary">
            Back to Cases
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div ref={pageRef} className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-bagh-50">
        <div className="absolute inset-0 bg-gradient-to-r from-bagh-100 to-bagh-50"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="animate-on-scroll">
              <span className="inline-block bg-bagh-200 text-bagh-800 text-xs font-light px-3 py-1 rounded mb-3">
                {currentCase.category}
              </span>
              <h1 className="text-3xl md:text-5xl heading-minimal text-bagh-800 mb-3">
                {currentCase.name}
              </h1>
              <p className="text-base md:text-lg text-minimal leading-relaxed">
                {currentCase.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Overview */}
            <div className="animate-on-scroll">
              <h2 className="text-2xl heading-minimal text-bagh-800 mb-4">Overview</h2>
              <div className="prose prose-sm text-minimal leading-relaxed">
                <p className="text-base mb-4">{currentCase.description}</p>
                <div className="whitespace-pre-line text-sm">{currentCase.longDescription}</div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="animate-on-scroll">
              <div className="rounded-lg overflow-hidden border border-bagh-100">
                <img
                  src={currentCase.image}
                  alt={currentCase.name}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Technologies */}
            <div className="animate-on-scroll">
              <h2 className="text-2xl heading-minimal text-bagh-800 mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {currentCase.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-bagh-100 text-bagh-700 px-3 py-1 rounded text-sm font-light"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="features-section animate-on-scroll">
              <h2 className="text-2xl heading-minimal text-bagh-800 mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentCase.features.map((feature, index) => (
                  <div key={index} className="feature-item flex items-start space-x-2">
                    <svg className="w-4 h-4 text-bagh-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-minimal">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges & Solutions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="animate-on-scroll">
                <h2 className="text-2xl heading-minimal text-bagh-800 mb-4">Challenges</h2>
                <ul className="space-y-2">
                  {currentCase.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className="text-sm text-minimal">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-on-scroll">
                <h2 className="text-2xl heading-minimal text-bagh-800 mb-4">Solutions</h2>
                <ul className="space-y-2">
                  {currentCase.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span className="text-sm text-minimal">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Results */}
            <div className="animate-on-scroll">
              <h2 className="text-2xl heading-minimal text-bagh-800 mb-4">Results & Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentCase.results.map((result, index) => (
                  <div key={index} className="feature-item flex items-start space-x-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-sm text-minimal">{result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Images */}
            <div className="animate-on-scroll">
              <h2 className="text-2xl heading-minimal text-bagh-800 mb-4">Platform Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentCase.images.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border border-bagh-100">
                    <img
                      src={image}
                      alt={`${currentCase.name} screenshot ${index + 1}`}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-bagh-50">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl heading-minimal text-bagh-800">
              Ready to Start Your Project?
            </h2>
            <p className="text-sm text-minimal">
              Let's discuss how we can help bring your idea to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/cases" className="btn-secondary">
                View More Cases
              </Link>
              <Link to="/" className="btn-primary">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CaseDetail
