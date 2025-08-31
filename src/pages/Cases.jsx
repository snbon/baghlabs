import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSection } from '../contexts/SectionContext'
import { CasesHero, CaseCard, CasesCTA } from '../components/sections/Cases'
import casesData from '../data/cases.json'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const Cases = () => {
  const pageRef = useRef(null)
  const horizontalContainerRef = useRef(null)
  const horizontalTriggerRef = useRef(null)
  const ctaTriggerRef = useRef(null)
  const isSetupRef = useRef(false)
  const { updateSection } = useSection()

  const { cases, pageContent } = casesData

  // Memoize updateSection to prevent useEffect re-runs
  const stableUpdateSection = useCallback(updateSection, [])

  useEffect(() => {
    // Prevent multiple setups
    if (isSetupRef.current) {
      console.log('ScrollTrigger already setup, skipping...')
      return
    }
    
    // Update section context for navigation styling (hero section is white)
    stableUpdateSection(0, 'bg-white')
    
    // Kill any existing ScrollTriggers to prevent conflicts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    
    // Get the horizontal cases container
    const horizontalContainer = pageRef.current.querySelector('.horizontal-cases-container')
    horizontalContainerRef.current = horizontalContainer
    
    if (horizontalContainer) {
      console.log('Setting up horizontal scroll for', cases.length, 'cases')
      
      // Remove any existing transforms and set initial state
      gsap.set(horizontalContainer, { 
        x: 0,
        clearProps: "all" // Clear ALL properties to start fresh
      })
      
      // Set the container width to accommodate all cases
      const totalWidth = cases.length * window.innerWidth
      
      console.log('Container setup:', {
        totalWidth,
        windowWidth: window.innerWidth,
        scrollDistance: totalWidth - window.innerWidth
      })
      
      gsap.set(horizontalContainer, { 
        width: totalWidth
      })
      
      // Create horizontal scroll trigger that pins the entire viewport
      const horizontalTrigger = ScrollTrigger.create({
        trigger: '.horizontal-cases-section',
        start: 'top top', // Start when horizontal section reaches top
        end: `+=${totalWidth - window.innerWidth}`, // Pin for exact horizontal scroll distance
        pin: true,
        scrub: 2.0, // Ultra-smooth scrolling with longer delay
        onUpdate: (self) => {
          const progress = self.progress
          
          // Calculate the exact position for each case to be fully visible
          const translateX = -progress * (totalWidth - window.innerWidth)
          
          // Only prevent extreme over-scrolling (beyond 120% of intended distance)
          const maxScrollDistance = totalWidth - window.innerWidth
          const finalTranslateX = translateX < -(maxScrollDistance * 1.2) ? -(maxScrollDistance * 1.2) : translateX
          
          // Use gsap.to for ultra-smooth movement
          gsap.to(horizontalContainer, { 
            x: finalTranslateX, 
            duration: 0.05, // Very short duration for ultra-smooth movement
            ease: "power1.out", // Gentle, natural easing
            overwrite: "auto" // Prevent animation conflicts
          })
          
          // Update navigation colors based on current case
          const caseIndex = Math.min(Math.floor(progress * cases.length), cases.length - 1)
          if (caseIndex < cases.length) {
            const background = caseIndex % 2 === 0 ? 'bg-bagh-50' : 'bg-white'
            stableUpdateSection(caseIndex + 1, background)
          }
        }
      })
      
      // Store trigger reference
      horizontalTriggerRef.current = horizontalTrigger
    } else {
      console.error('Horizontal container not found!')
    }
    
    // CTA section trigger - resume vertical scrolling when horizontal section ends
    const ctaTrigger = ScrollTrigger.create({
      trigger: '.cta-section',
      start: 'top center', // Start when CTA enters center
      onEnter: () => {
        stableUpdateSection(cases.length + 1, 'bg-bagh-800')
      }
    })
    
    // Store trigger reference
    ctaTriggerRef.current = ctaTrigger
    
    // Mark as setup
    isSetupRef.current = true
    console.log('ScrollTrigger setup complete')
    
    // Handle window resize to recalculate horizontal scroll dimensions
    const handleResize = () => {
      if (horizontalContainerRef.current) {
        const newTotalWidth = cases.length * window.innerWidth
        
        // Pause ScrollTrigger during resize
        if (horizontalTriggerRef.current) {
          horizontalTriggerRef.current.disable()
        }
        
        gsap.set(horizontalContainerRef.current, { 
          width: newTotalWidth
        })
        
        // Re-enable ScrollTrigger after resize
        if (horizontalTriggerRef.current) {
          horizontalTriggerRef.current.enable()
        }
        
        console.log('Resized to:', newTotalWidth)
      }
    }
    
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      
      // Kill specific triggers
      if (horizontalTriggerRef.current) {
        horizontalTriggerRef.current.kill()
        horizontalTriggerRef.current = null
      }
      if (ctaTriggerRef.current) {
        ctaTriggerRef.current.kill()
        ctaTriggerRef.current = null
      }
      
      isSetupRef.current = false
      console.log('Cleaning up ScrollTriggers')
    }
  }, [cases, stableUpdateSection]) // Only depend on cases and stable function

  return (
    <div ref={pageRef} className="bg-white">
      {/* Hero Section - 40% height with mobile padding top */}
      <section className="h-[40vh] pt-20 md:pt-0 flex items-center justify-center bg-white">
        <CasesHero 
          title={pageContent.hero.title}
          description={pageContent.hero.description}
        />
      </section>

      {/* Horizontal Cases Section */}
      <section className="horizontal-cases-section h-screen bg-white overflow-hidden">
        <div 
          className="horizontal-cases-container h-full flex"
          style={{ 
            width: `${cases.length * 100}vw`
            // Removed transform: 'translateX(0)' to prevent CSS conflicts
          }}
        >
          {cases.map((caseItem, index) => (
            <div 
              key={caseItem.id} 
              className={`case-slide flex-shrink-0 h-full flex items-center justify-center ${
                index % 2 === 0 ? 'bg-bagh-50' : 'bg-white'
              }`}
              style={{ 
                width: '100vw',
                minWidth: '100vw'
              }}
            >
              <CaseCard caseItem={caseItem} index={index} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="h-screen bg-bagh-800 cta-section">
        <CasesCTA 
          title={pageContent.cta.title}
          description={pageContent.cta.description}
          buttons={pageContent.cta.buttons}
        />
      </section>
    </div>
  )
}

export default Cases

