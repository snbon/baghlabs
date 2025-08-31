import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSection } from '../contexts/SectionContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const headerRef = useRef(null)
  const location = useLocation()
  const { currentBackground } = useSection()
  
  // Determine if we're on a dark background
  const isDarkBackground = currentBackground.includes('bagh-800') || currentBackground.includes('bagh-900')
  
  // Dynamic text colors based on background
  const textColor = isDarkBackground ? 'text-white' : 'text-gray-800'
  const hoverColor = isDarkBackground ? 'hover:text-bagh-300' : 'hover:text-bagh-600'
  const activeColor = isDarkBackground ? 'text-bagh-300' : 'text-bagh-600'

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Cases', href: '/cases' },
  ]

  // Mobile scroll-based fade effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Only apply fade effect on mobile
      if (window.innerWidth < 768) {
        // Fade out when scrolling down
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false)
        }
        // Fade in when scrolling up
        else if (currentScrollY < lastScrollY) {
          setIsVisible(true)
        }
      } else {
        // Always visible on desktop
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      <header 
        ref={headerRef}
        className={`sticky top-0 z-[9999] transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
      {/* Fluid glass navigation bar */}
      <div className="container-custom py-4">
        <div className="relative">
                            {/* Fluid glass background with blur and transparency */}
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl shadow-bagh-600/20"></div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-bagh-600/10 via-bagh-500/5 to-bagh-600/10 rounded-2xl"></div>
          
          {/* Fluid distortion effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(71,85,105,0.1),transparent_70%)] rounded-2xl"></div>
          
          {/* Content container */}
          <div className="relative flex items-center justify-between px-8 py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-bagh-700 to-bagh-600 rounded-xl flex items-center justify-center shadow-lg shadow-bagh-600/30 transition-all duration-300 group-hover:shadow-bagh-600/50 group-hover:scale-110">
                <span className="text-white font-light text-sm">B</span>
              </div>
              <span className={`text-lg font-light ${textColor} group-${hoverColor} transition-colors duration-300`}>BaghLabs</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative text-sm font-light transition-all duration-300 group ${
                    location.pathname === item.href
                      ? activeColor
                      : `${textColor} ${hoverColor}`
                  }`}
                >
                  {item.name}
                  {/* Fluid underline effect */}
                  <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-bagh-600 to-bagh-500 rounded-full transition-all duration-300 ${
                    location.pathname === item.href 
                      ? 'w-full opacity-100' 
                      : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  }`}></div>
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              className={`md:hidden p-2.5 rounded-xl ${textColor} ${hoverColor} hover:bg-white/20 transition-all duration-300 backdrop-blur-sm`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
    
         {/* Mobile Navigation Modal with fluid glass design */}
     <div className={`md:hidden fixed inset-0 z-[9998] transition-opacity duration-300 ease-in-out ${
       isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
     }`}>
       {/* Backdrop */}
       <div 
         className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
           isMenuOpen ? 'opacity-100' : 'opacity-0'
         }`}
         onClick={() => setIsMenuOpen(false)}
       ></div>
       
       {/* Modal Content */}
       <div className="relative h-full flex items-center justify-center p-4">
         <div className={`relative w-full max-w-sm transition-all duration-300 ease-out will-change-transform ${
           isMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-98 translate-y-2'
         }`} style={{ transform: 'translate3d(0, 0, 0)' }}>
           {/* Fluid glass background for mobile menu */}
           <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl shadow-bagh-600/20"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-bagh-600/10 via-bagh-500/5 to-bagh-600/10 rounded-2xl"></div>
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(71,85,105,0.1),transparent_70%)] rounded-2xl"></div>
           
           {/* Close button */}
           <button
             onClick={() => setIsMenuOpen(false)}
             className="absolute -top-3 -right-3 w-8 h-8 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
           >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
           
           {/* Navigation Items - Centered */}
           <div className="relative px-8 py-12 space-y-4 flex flex-col items-center">
             {navigation.map((item) => (
               <Link
                 key={item.name}
                 to={item.href}
                 className={`block w-full text-center px-6 py-4 rounded-xl text-base font-light transition-all duration-300 ${
                   location.pathname === item.href
                     ? `${activeColor} border-b-2 border-current`
                     : `${textColor} ${hoverColor} hover:bg-white/20`
                 }`}
                 onClick={() => setIsMenuOpen(false)}
               >
                 {item.name}
               </Link>
             ))}
           </div>
         </div>
       </div>
     </div>
      </>
    )
  }

export default Header
