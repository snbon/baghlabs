import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import ScrollToTop from './ScrollToTop'

const Layout = ({ lang = 'nl' }) => {
  const { i18n } = useTranslation()

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
  }, [lang, i18n])

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
