import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '@/lib/useLenis'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (hash) {
      const scroll = () => {
        const id = hash.replace('#', '')
        const el = document.getElementById(id)
        if (!el) return
        if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.2 })
        else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      scroll()
      const t = setTimeout(scroll, 80)
      return () => clearTimeout(t)
    }
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash, lenis])

  return null
}

export default ScrollToTop
