import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSection } from '../contexts/SectionContext'
import { CaseDetailHero, CaseDetailContent, OtherProjects, CaseDetailCTA } from '../components/sections/CaseDetail'
import caseDetailsData from '../data/caseDetails.json'
import casesData from '../data/cases.json'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const CaseDetail = () => {
  const { caseName } = useParams()
  const pageRef = useRef(null)
  const { updateSection } = useSection()

  // Get case data from JSON
  const caseData = caseDetailsData[caseName]
  const { cases } = casesData

    useEffect(() => {
    if (!caseData) return

    // Update section context for navigation styling
    updateSection(0, 'bg-bagh-50')

    // Kill any existing ScrollTriggers to prevent conflicts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())

    const ctx = gsap.context(() => {
      // Fade in elements on scroll with smooth transitions
      gsap.fromTo('.animate-on-scroll',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pageRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            scrub: 1.0
          }
        }
      )

      // Stagger animation for content sections
      gsap.fromTo('.content-section',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.content-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            scrub: 1.0
          }
        }
      )
    }, pageRef)

    // Handle scroll-triggered animations with Intersection Observer
    const handleScrollAnimations = () => {
      const animatedElements = document.querySelectorAll('[data-animation-delay]')
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target
            const delay = parseFloat(element.getAttribute('data-animation-delay')) * 1000
            
            // Add animation class after delay
            setTimeout(() => {
              element.classList.add('animate-active')
            }, delay)
            
            // Unobserve after animation is triggered
            observer.unobserve(element)
          }
        })
      }, {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: '0px 0px -50px 0px' // Slight offset for better timing
      })
      
      // Observe all animated elements
      animatedElements.forEach(element => {
        observer.observe(element)
      })
    }

    // Initialize scroll animations
    handleScrollAnimations()

    return () => ctx.revert()
  }, [caseData, updateSection])

  if (!caseData) {
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
      {/* Hero Section - 40% height with mobile padding top */}
      <section className="h-[40vh] pt-20 md:pt-0 flex items-center justify-center bg-white">
        <CaseDetailHero caseData={caseData} />
      </section>

            {/* Main Content Section */}
      <section className="min-h-screen bg-white">
        <CaseDetailContent caseData={caseData} />
      </section>

                    {/* Other Projects Section */}
              <section className="bg-bagh-50">
                <OtherProjects currentCaseId={caseData.id} allCases={cases} />
              </section>

      {/* CTA Section with Footer */}
      <section className="h-screen bg-bagh-800">
        <CaseDetailCTA />
      </section>
    </div>
  )
}

export default CaseDetail
