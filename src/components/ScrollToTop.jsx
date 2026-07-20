import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '@/lib/useLenis'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const runScroll = () => {
        const el = document.getElementById(id)
        if (!el) return
        if (lenis) {
          lenis.scrollTo(el, { offset: -80, duration: 1.4 })
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
      runScroll()
      const t = setTimeout(runScroll, 80)
      return () => clearTimeout(t)
    }
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash, lenis])

  return null
}

export default ScrollToTop
