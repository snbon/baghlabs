import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import CasesSection from '../components/sections/CasesSection'
import WhySection from '../components/sections/WhySection'
import CTASection from '../components/sections/CTASection'

const Home = () => {
  const containerRef = useRef(null)
  const sectionsRef = useRef([])
  const currentSectionRef = useRef(0)
  const isTransitioningRef = useRef(false)
  const lastScrollTimeRef = useRef(0)

  const sections = [
    { component: HeroSection, bg: 'bg-white' },
    { component: AboutSection, bg: 'bg-bagh-50' },
    { component: CasesSection, bg: 'bg-white' },
    { component: WhySection, bg: 'bg-white' },
    { component: CTASection, bg: 'bg-bagh-800' }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state - all sections start invisible except first
      sections.forEach((_, index) => {
        gsap.set(sectionsRef.current[index], { 
          opacity: index === 0 ? 1 : 0,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: sections.length - index
        })
      })

      // Robust scroll handler that prevents section mess-ups
      const handleScroll = () => {
        const now = Date.now()
        const scrollY = window.scrollY
        const viewportHeight = window.innerHeight
        
        // Prevent rapid transitions (minimum 100ms between transitions)
        if (now - lastScrollTimeRef.current < 100) {
          return
        }

        // Calculate which section should be visible
        const newSection = Math.round(scrollY / viewportHeight)
        const clampedSection = Math.max(0, Math.min(newSection, sections.length - 1))
        
        // Only update if section actually changed and no transition is in progress
        if (clampedSection !== currentSectionRef.current && !isTransitioningRef.current) {
          isTransitioningRef.current = true
          lastScrollTimeRef.current = now
          
          // Kill any existing animations to prevent conflicts
          sections.forEach((_, index) => {
            gsap.killTweensOf(sectionsRef.current[index])
          })
          
          // Create a timeline for coordinated transitions
          const tl = gsap.timeline({
            onComplete: () => {
              isTransitioningRef.current = false
            }
          })
          
          // Fade out current section
          tl.to(sectionsRef.current[currentSectionRef.current], {
            opacity: 0,
            duration: 2.0,
            ease: 'power2.out'
          }, 0)
          
          // Fade in new section
          tl.to(sectionsRef.current[clampedSection], {
            opacity: 1,
            duration: 2.0,
            ease: 'power2.out'
          }, 0.1)
          
          // Update current section reference
          currentSectionRef.current = clampedSection
        }
      }

      // Throttled scroll listener with RAF for smooth performance
      let ticking = false
      const throttledScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll()
            ticking = false
          })
          ticking = true
        }
      }

      window.addEventListener('scroll', throttledScroll, { passive: true })

      // Set container height for proper scrolling
      gsap.set(containerRef.current, {
        height: `${sections.length * 100}vh`
      })

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', throttledScroll)
      }

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* Sections positioned fixed for stationary background with robust transitions */}
      {sections.map((section, index) => {
        const SectionComponent = section.component
        return (
          <div
            key={index}
            ref={(el) => (sectionsRef.current[index] = el)}
            className="fixed inset-0 z-10"
            style={{ 
              opacity: index === 0 ? 1 : 0,
              zIndex: sections.length - index
            }}
          >
            <SectionComponent />
          </div>
        )
      })}
    </div>
  )
}

export default Home
