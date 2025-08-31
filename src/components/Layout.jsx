import { Outlet } from 'react-router-dom'
import Header from './Header'
import ScrollToTop from './ScrollToTop'

const Layout = () => {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
