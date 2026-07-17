import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { pillars } from '@/data/services'
import { useCurrentLang, useLangPath } from '@/lib/usePathAlternate'

const Header = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef(null)
  const prevScrollY = useRef(0)
  const location = useLocation()
  const { t } = useTranslation('common')
  const lang = useCurrentLang()
  const langPath = useLangPath()

  const navLinks = [
    { name: t('nav.home'), href: langPath('home'), key: 'home' },
    { name: t('nav.cases'), href: langPath('projects'), key: 'projects' },
    { name: t('nav.about'), href: langPath('about'), key: 'about' },
    { name: t('nav.contact'), href: langPath('contact'), key: 'contact' },
  ]

  const serviceLinks = pillars.map((p) => ({
    id: p.id,
    label: p.label[lang] || p.label.nl,
  }))

  const isActive = (key) => {
    const p = location.pathname
    if (key === 'home') return p === '/' || p === '/en'
    if (key === 'projects') return p.startsWith('/projecten') || p.startsWith('/en/cases')
    if (key === 'about') return p.startsWith('/over-ons') || p.startsWith('/en/about')
    if (key === 'contact') return p.startsWith('/contact') || p.startsWith('/en/contact')
    if (key === 'services') return p.startsWith('/diensten') || p.startsWith('/en/services')
    return false
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const threshold = window.innerHeight * 0.15
      if (currentY <= threshold) setIsVisible(true)
      else if (currentY > prevScrollY.current) setIsVisible(false)
      else setIsVisible(true)
      prevScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const onOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  useEffect(() => {
    setServicesOpen(false)
    setIsMenuOpen(false)
    setMobileServicesOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[9999] transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container-wide py-4">
          <div className="flex items-center justify-between rounded-md border border-paper/10 bg-noir/85 backdrop-blur-xl px-4 md:px-6 py-3 shadow-inner-hairline">
            {/* Logo */}
            <Link to={langPath('home')} className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-sm bg-neon flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow">
                <span className="text-noir font-display font-bold text-sm">B</span>
              </div>
              <span className="font-display font-bold text-lg tracking-brut text-paper">
                baghlabs
              </span>
              <span className="hidden md:inline font-mono text-[10px] uppercase tracking-widest text-paper/40">
                // v2
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`relative font-mono text-[11px] uppercase tracking-widest px-3 py-2 transition-colors duration-150 ${
                    isActive(item.key) ? 'text-neon' : 'text-paper/70 hover:text-paper'
                  }`}
                >
                  {item.name}
                  {isActive(item.key) && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-neon shadow-glow-sm" />
                  )}
                </Link>
              ))}

              {/* Services dropdown */}
              <div className="relative ml-1" ref={dropdownRef}>
                <button
                  onClick={() => setServicesOpen((v) => !v)}
                  className={`relative flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest px-3 py-2 transition-colors duration-150 ${
                    isActive('services') || servicesOpen ? 'text-neon' : 'text-paper/70 hover:text-paper'
                  }`}
                >
                  {t('nav.services')}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                  />
                  {isActive('services') && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-neon shadow-glow-sm" />
                  )}
                </button>

                {servicesOpen && (
                  <div className="absolute top-full right-0 mt-3 w-72 rounded-md border border-paper/10 bg-noir-2/95 backdrop-blur-xl shadow-glow-sm overflow-hidden z-50">
                    {serviceLinks.map((s, i) => (
                      <Link
                        key={s.id}
                        to={langPath('services', s.id)}
                        className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-paper/80 hover:text-neon hover:bg-noir-3 transition-colors border-b border-paper/5 last:border-0"
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-[10px] text-paper/40">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="font-display font-medium tracking-brut">{s.label}</span>
                        </span>
                        <span className="font-mono text-xs text-paper/30">→</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md border border-paper/10 hover:border-neon/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="h-4 w-4 text-paper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-4 w-4 text-paper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed top-0 inset-x-0 z-[9997] transition-all duration-200 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="container-wide pt-24 pb-4">
          <div className="rounded-md border border-paper/10 bg-noir-2/95 backdrop-blur-xl shadow-glow-sm overflow-hidden">
            <nav>
              {navLinks.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-6 py-4 font-display font-medium text-lg tracking-brut border-b border-paper/5 ${
                    isActive(item.key)
                      ? 'text-neon'
                      : 'text-paper hover:text-neon hover:bg-noir-3'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <button
                className="w-full text-left px-6 py-4 font-display font-medium text-lg tracking-brut text-paper hover:text-neon hover:bg-noir-3 flex items-center justify-between border-b border-paper/5"
                onClick={() => setMobileServicesOpen((v) => !v)}
              >
                <span>{t('nav.services')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileServicesOpen && (
                <div className="bg-noir-3/60">
                  {serviceLinks.map((s, i) => (
                    <Link
                      key={s.id}
                      to={langPath('services', s.id)}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-8 py-3 text-sm text-paper/80 hover:text-neon border-b border-paper/5 last:border-0"
                    >
                      <span className="font-mono text-[10px] text-paper/40">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{s.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </nav>
          </div>
        </div>
        <div className="fixed inset-0 -z-10" onClick={() => setIsMenuOpen(false)} />
      </div>
    </>
  )
}

export default Header
