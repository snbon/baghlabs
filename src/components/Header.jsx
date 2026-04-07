import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'

const Header = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef(null)
  const prevScrollY = useRef(0)
  const location = useLocation()
  const { t } = useTranslation('common')
  const { t: tServices } = useTranslation('services')

  const isEnglish = location.pathname.startsWith('/en')
  const basePath = isEnglish ? '/en' : ''

  const navLinks = [
    { name: t('nav.home'), href: `${basePath}/` },
    { name: t('nav.cases'), href: `${basePath}/cases` },
    { name: t('nav.contact'), href: `${basePath}/contact` },
    { name: 'Support', href: 'https://support.baghlabs.com', external: true },
  ]

  const serviceLinks = [
    { id: 'development', label: tServices('development.title', { defaultValue: 'Development' }) },
    { id: 'branding-content', label: tServices('branding-content.title', { defaultValue: 'Branding & Content' }) },
    { id: 'performance-marketing', label: tServices('performance-marketing.title', { defaultValue: 'Performance Marketing' }) },
  ]

  const isActive = (href) => {
    if (href === `${basePath}/` || href === basePath) {
      return location.pathname === `${basePath}/` || location.pathname === basePath
    }
    return location.pathname.startsWith(href)
  }

  // Hide after 15% scroll down, reveal on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const threshold = window.innerHeight * 0.15

      if (currentY <= threshold) {
        setIsVisible(true)
      } else if (currentY > prevScrollY.current) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      prevScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const onOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  // Close everything on route change
  useEffect(() => {
    setServicesOpen(false)
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[9999] transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container-custom py-3">
          <div className="relative">
            {/* Floating glass card layers */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl shadow-bagh-600/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-bagh-600/10 via-bagh-500/5 to-bagh-600/10 rounded-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(71,85,105,0.08),transparent_70%)] rounded-2xl" />

            {/* Content */}
            <div className="relative flex items-center justify-between px-5 py-3 md:px-8 md:py-4">
              {/* Logo */}
              <Link to={`${basePath}/`} className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-gradient-to-br from-bagh-700 to-bagh-600 rounded-xl flex items-center justify-center shadow-lg shadow-bagh-600/30 transition-all duration-300 group-hover:scale-110">
                  <span className="text-white font-light text-sm">B</span>
                </div>
                <span className="text-lg font-light text-bagh-800 transition-colors duration-300">
                  BaghLabs
                </span>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map((item) =>
                  item.external ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative text-sm font-light transition-all duration-300 group text-bagh-800 hover:text-bagh-600"
                    >
                      {item.name}
                      <div className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-bagh-600 to-bagh-500 rounded-full transition-all duration-300 w-0 opacity-0 group-hover:w-full group-hover:opacity-100" />
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`relative text-sm font-light transition-all duration-300 group ${
                        isActive(item.href) ? 'text-bagh-600' : 'text-bagh-800 hover:text-bagh-600'
                      }`}
                    >
                      {item.name}
                      <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-bagh-600 to-bagh-500 rounded-full transition-all duration-300 ${
                        isActive(item.href)
                          ? 'w-full opacity-100'
                          : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                      }`} />
                    </Link>
                  )
                )}

                {/* Services dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setServicesOpen((v) => !v)}
                    className={`flex items-center gap-1 text-sm font-light transition-all duration-300 group relative ${
                      isActive(`${basePath}/services`) ? 'text-bagh-600' : 'text-bagh-800 hover:text-bagh-600'
                    }`}
                  >
                    {t('nav.services')}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                    <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-bagh-600 to-bagh-500 rounded-full transition-all duration-300 ${
                      isActive(`${basePath}/services`)
                        ? 'w-full opacity-100'
                        : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`} />
                  </button>

                  {servicesOpen && (
                    <div className="absolute top-full right-0 mt-3 w-56 bg-white/90 backdrop-blur-xl rounded-xl border border-white/40 shadow-xl shadow-bagh-900/10 overflow-hidden">
                      {serviceLinks.map((s) => (
                        <Link
                          key={s.id}
                          to={`${basePath}/services/${s.id}`}
                          className="block px-4 py-3 text-sm font-light text-bagh-700 hover:text-bagh-900 hover:bg-bagh-50/80 transition-colors duration-150 border-b border-bagh-100/50 last:border-0"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </nav>

              {/* Mobile hamburger */}
              <button
                type="button"
                className="md:hidden p-2.5 rounded-xl text-bagh-800 hover:text-bagh-600 hover:bg-white/20 transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open menu</span>
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

      {/* Mobile menu, slide down from navbar */}
      <div className={`md:hidden fixed top-0 inset-x-0 z-[9997] transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}>
        <div className="container-custom pt-20 pb-3">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl shadow-bagh-900/10" />
            <nav className="relative px-2 py-3 space-y-0.5">
              {navLinks.map((item) =>
                item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 rounded-xl text-sm font-light transition-colors duration-200 text-bagh-800 hover:text-bagh-600 hover:bg-bagh-50/40"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-light transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-bagh-600 bg-bagh-50/60'
                        : 'text-bagh-800 hover:text-bagh-600 hover:bg-bagh-50/40'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}

              <button
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-light text-bagh-800 hover:text-bagh-600 hover:bg-bagh-50/40 transition-colors duration-200 flex items-center gap-1.5"
                onClick={() => setMobileServicesOpen((v) => !v)}
              >
                {t('nav.services')}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileServicesOpen && (
                <div className="pl-4 space-y-0.5">
                  {serviceLinks.map((s) => (
                    <Link
                      key={s.id}
                      to={`${basePath}/services/${s.id}`}
                      className="block px-4 py-2.5 rounded-xl text-sm font-light text-bagh-600 hover:bg-bagh-50/40 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </nav>
          </div>
        </div>
        {/* Tap outside to close */}
        <div className="fixed inset-0 -z-10" onClick={() => setIsMenuOpen(false)} />
      </div>
    </>
  )
}

export default Header
