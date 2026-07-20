import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { pillars } from '@/data/services'
import { useCurrentLang, useLangPath } from '@/lib/usePathAlternate'

const Header = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const prevScrollY = useRef(0)
  const location = useLocation()
  const { t } = useTranslation('common')
  const lang = useCurrentLang()
  const langPath = useLangPath()

  const navLinks = [
    { name: t('nav.cases'), href: langPath('projects'), key: 'projects' },
    { name: t('nav.about'), href: langPath('about'), key: 'about' },
    { name: t('nav.contact'), href: langPath('contact'), key: 'contact' },
  ]

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

  // Close menu on route change, reset expanded state.
  useEffect(() => {
    setIsMenuOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  // Lock body scroll when menu is open.
  useEffect(() => {
    if (isMenuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[9999] transition-transform duration-300 ${
          isVisible || isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="bg-noir/85 backdrop-blur-md border-b border-paper/10">
          <div className="container-wide">
            <div className="flex items-center justify-between py-4 md:py-5">
              {/* Wordmark */}
              <Link to={langPath('home')} className="group flex items-baseline gap-3">
                <span className="font-display font-bold text-2xl md:text-3xl leading-none tracking-tight text-paper group-hover:text-oxblood transition-colors">
                  baghlabs
                </span>
                <span className="hidden md:inline smallcaps text-paper/45">Studio</span>
              </Link>

              {/* Hamburger — everywhere */}
              <button
                type="button"
                onClick={() => setIsMenuOpen((v) => !v)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                className="group flex items-center gap-3"
              >
                <span
                  className={`smallcaps transition-colors ${
                    isMenuOpen ? 'text-oxblood' : 'text-paper group-hover:text-oxblood'
                  }`}
                >
                  {isMenuOpen ? 'Close' : 'Menu'}
                </span>
                <div className="relative w-8 h-4 flex flex-col justify-between">
                  <span
                    className={`block h-px bg-current transition-all duration-300 origin-left ${
                      isMenuOpen
                        ? 'text-oxblood rotate-45 translate-y-[1px] w-full'
                        : 'text-paper w-full group-hover:text-oxblood'
                    }`}
                  />
                  <span
                    className={`block h-px bg-current transition-all duration-300 origin-left ${
                      isMenuOpen
                        ? 'text-oxblood -rotate-45 -translate-y-[3px] w-full'
                        : 'text-paper w-2/3 self-end group-hover:text-oxblood group-hover:w-full'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen takeover menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9998] bg-noir text-paper overflow-y-auto"
          >
            <div className="container-wide min-h-full flex flex-col pt-24 md:pt-28 pb-10">
              {/* Nav list */}
              <nav className="flex-1 flex flex-col justify-center py-8">
                <p className="chapter mb-8">Cap. — Menu</p>
                <ul className="border-t border-paper/15">
                  {navLinks.map((item, i) => (
                    <motion.li
                      key={item.key}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
                      className="border-b border-paper/15"
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-baseline gap-6 md:gap-10 py-5 md:py-7 transition-colors"
                      >
                        <span className="smallcaps text-oxblood w-10 md:w-14 shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className="font-display font-bold text-paper group-hover:text-oxblood transition-colors leading-none"
                          style={{
                            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                            letterSpacing: '-0.03em',
                            fontVariationSettings: "'opsz' 96",
                          }}
                        >
                          {item.name}
                        </span>
                      </Link>
                    </motion.li>
                  ))}

                  {/* Services — expandable */}
                  <motion.li
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 + navLinks.length * 0.06 }}
                    className="border-b border-paper/15"
                  >
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      aria-expanded={servicesOpen}
                      className="w-full flex items-baseline gap-6 md:gap-10 py-5 md:py-7 text-left group"
                    >
                      <span className="smallcaps text-oxblood w-10 md:w-14 shrink-0">
                        {String(navLinks.length + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-display font-bold transition-colors leading-none ${
                          servicesOpen ? 'text-oxblood' : 'text-paper group-hover:text-oxblood'
                        }`}
                        style={{
                          fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                          letterSpacing: '-0.03em',
                          fontVariationSettings: "'opsz' 96",
                        }}
                      >
                        {t('nav.services')}
                      </span>
                      <span className="ml-auto flex items-center gap-2">
                        <span className="smallcaps text-paper/45 hidden md:inline">
                          {servicesOpen ? 'Close' : 'Expand'}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 ${
                            servicesOpen ? 'rotate-180 text-oxblood' : 'text-paper/60'
                          }`}
                        />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {servicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <ul className="pb-6 md:pb-8 md:pl-24 pl-16 divide-y divide-paper/10">
                            {pillars.map((p, pi) => (
                              <li key={p.id}>
                                <Link
                                  to={langPath('services', p.id)}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="group flex items-baseline gap-4 py-3 md:py-4"
                                >
                                  <span className="smallcaps text-oxblood/70 w-10 shrink-0">
                                    {String(pi + 1).padStart(2, '0')}
                                  </span>
                                  <span className="font-display text-xl md:text-2xl text-paper/85 group-hover:text-oxblood transition-colors">
                                    {p.label[lang] || p.label.nl}
                                  </span>
                                  <span className="ml-auto smallcaps text-paper/30 group-hover:text-oxblood transition-colors">
                                    →
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                </ul>
              </nav>

              {/* Colophon */}
              <div className="border-t border-paper/10 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <span className="smallcaps text-paper/45">MMXXVI · Vlaanderen · Studio</span>
                <span className="smallcaps text-paper/60">
                  {lang === 'en' ? 'English' : 'Nederlands'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
