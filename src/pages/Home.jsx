import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSection } from '../contexts/SectionContext'
import { HeroSection, AboutSection, WhySection, CTASection, HomeCasesSection } from '../components/sections/Home'

const Home = () => {
  const containerRef = useRef(null)
  const sectionsRef = useRef([])
  const { updateSection } = useSection()

  const sections = [
    { component: HeroSection, bg: 'bg-white' },
    { component: AboutSection, bg: 'bg-bagh-50' },
    { component: HomeCasesSection, bg: 'bg-white' },
    { component: WhySection, bg: 'bg-white' },
    { component: CTASection, bg: 'bg-bagh-800' }
  ]

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      // Get actual viewport height (more reliable than 100vh on mobile)
      const getViewportHeight = () => {
        // Use dynamic viewport height for mobile if supported
        if (typeof window !== 'undefined' && 'visualViewport' in window) {
          return window.visualViewport.height
        }
        
        // Fallback to standard methods
        return Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        )
      }
      
      const viewportHeight = getViewportHeight()
      
      // Add extra padding for mobile to ensure last section is visible
      const isMobile = window.innerWidth <= 768
      const mobilePadding = isMobile ? 150 : 0 // Increased padding for mobile
      const adjustedViewportHeight = viewportHeight + mobilePadding
      
      // Log for debugging
      console.log('Viewport setup:', {
        isMobile,
        viewportHeight,
        mobilePadding,
        adjustedViewportHeight,
        sectionsCount: sections.length
      })
      
      // Set initial state - all sections start invisible except first
      sections.forEach((_, index) => {
        gsap.set(sectionsRef.current[index], { 
          opacity: index === 0 ? 1 : 0,
          position: 'fixed', // Restored fixed positioning for fade effect
          top: 0, // All sections at same position for fade effect
          left: 0,
          width: '100%',
          height: adjustedViewportHeight,
          zIndex: 1000 - index, // Higher z-index for proper layering
          pointerEvents: index === 0 ? 'auto' : 'none' // Only visible section is interactive
        })
      })
      
      // Set initial section context
      updateSection(0, sections[0].bg)

      // Scroll percentage-based transitions using GSAP scrub
      const totalScrollHeight = (sections.length - 1) * viewportHeight
      
      // Create smooth transitions based on scroll percentage for each section pair
      for (let i = 0; i < sections.length - 1; i++) {
        const currentSection = sectionsRef.current[i]
        const nextSection = sectionsRef.current[i + 1]
        
        // Calculate scroll trigger points for this transition
        const startTrigger = i * viewportHeight
        const endTrigger = (i + 1) * viewportHeight
        
        // Create scroll-triggered timeline for smooth fade transitions
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: `top+=${startTrigger} top`,
          end: `top+=${endTrigger} top`,
          scrub: 0.3, // Smooth scrubbing with slight delay
          onUpdate: (self) => {
            const progress = self.progress
            
            // Calculate opacity based on scroll progress
            if (progress < 0.2) {
              // 0-20%: Current section fully visible, next section invisible
              gsap.set(currentSection, { 
                opacity: 1,
                pointerEvents: 'auto', // Enable interactions
                zIndex: 1000 - i // Bring to front
              })
              gsap.set(nextSection, { 
                opacity: 0,
                pointerEvents: 'none', // Disable interactions
                zIndex: 1000 - (i + 1) // Send to back
              })
              // Update context for navigation styling
              updateSection(i, sections[i].bg)
            } else if (progress < 0.8) {
              // 20-80%: Gradual fade transition
              const fadeProgress = (progress - 0.2) / 0.6
              gsap.set(currentSection, { 
                opacity: 1 - fadeProgress,
                pointerEvents: fadeProgress < 0.5 ? 'auto' : 'none', // Switch interactions at 50%
                zIndex: fadeProgress < 0.5 ? 1000 - i : 1000 - (i + 1) // Switch z-index at 50%
              })
              gsap.set(nextSection, { 
                opacity: fadeProgress,
                pointerEvents: fadeProgress > 0.5 ? 'auto' : 'none', // Switch interactions at 50%
                zIndex: fadeProgress > 0.5 ? 1000 - (i + 1) : 1000 - i // Switch z-index at 50%
              })
            } else {
              // 80-100%: Next section fully visible, current section invisible
              gsap.set(currentSection, { 
                opacity: 0,
                pointerEvents: 'none', // Disable interactions
                zIndex: 1000 - i // Send to back
              })
              gsap.set(nextSection, { 
                opacity: 1,
                pointerEvents: 'auto', // Enable interactions
                zIndex: 1000 - (i + 1) // Bring to front
              })
              // Update context for navigation styling
              updateSection(i + 1, sections[i + 1].bg)
            }
          }
        })
      }

      // Set container height for proper scrolling with extra space for mobile
      const containerHeight = isMobile 
        ? `${sections.length * adjustedViewportHeight + 200}px` // Extra space for mobile
        : `${sections.length * adjustedViewportHeight}px`
      
      gsap.set(containerRef.current, {
        height: containerHeight
      })
      
      // Handle window resize to recalculate ScrollTriggers and viewport heights
      const handleResize = () => {
        const newViewportHeight = getViewportHeight()
        
        // Update all section heights
        sections.forEach((_, index) => {
          gsap.set(sectionsRef.current[index], { 
            height: newViewportHeight + mobilePadding
          })
        })
        
        // Update container height with mobile consideration
        const newIsMobile = window.innerWidth <= 768
        const newMobilePadding = newIsMobile ? 150 : 0
        const newAdjustedHeight = newViewportHeight + newMobilePadding
        
        const newContainerHeight = newIsMobile 
          ? `${sections.length * newAdjustedHeight + 200}px`
          : `${sections.length * newAdjustedHeight}px`
        
        gsap.set(containerRef.current, {
          height: newContainerHeight
        })
        
        // Refresh all ScrollTriggers
        ScrollTrigger.refresh()
      }
      
      // Ensure last section is accessible on mobile
      const ensureLastSectionAccessible = () => {
        if (isMobile) {
          // Add a small delay to ensure DOM is ready
          setTimeout(() => {
            const container = containerRef.current
            if (container) {
              // Scroll to bottom to ensure last section is reachable
              container.scrollTop = container.scrollHeight
              // Then scroll back to top
              container.scrollTop = 0
            }
          }, 100)
        }
      }
      
      // Call once on mount
      ensureLastSectionAccessible()
      
      window.addEventListener('resize', handleResize)
      


      // Cleanup function
      return () => {
        // Remove resize listener
        window.removeEventListener('resize', handleResize)
        // Kill all ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* Sections positioned fixed for fade effect with proper interaction management */}
      {sections.map((section, index) => {
        const SectionComponent = section.component
        return (
          <div
            key={index}
            ref={(el) => (sectionsRef.current[index] = el)}
            className="fixed top-0 left-0 w-full"
            style={{ 
              opacity: index === 0 ? 1 : 0,
              zIndex: 1000 - index, // Higher z-index for proper layering
              pointerEvents: index === 0 ? 'auto' : 'none' // Only visible section is interactive
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
