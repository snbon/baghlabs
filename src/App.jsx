import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Cases from './pages/Cases'
import CaseDetail from './pages/CaseDetail'
import ServiceDetail from './pages/ServiceDetail'
import Contact from './pages/Contact'
import About from './pages/About'

function App() {
  return (
    <Routes>
      {/* Dutch (default) */}
      <Route path="/" element={<Layout lang="nl" />}>
        <Route index element={<Home />} />
        <Route path="projecten" element={<Cases />} />
        <Route path="projecten/:caseName" element={<CaseDetail />} />
        <Route path="diensten/:serviceId" element={<ServiceDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="over-ons" element={<About />} />
      </Route>
      {/* English */}
      <Route path="/en" element={<Layout lang="en" />}>
        <Route index element={<Home />} />
        <Route path="cases" element={<Cases />} />
        <Route path="cases/:caseName" element={<CaseDetail />} />
        <Route path="services/:serviceId" element={<ServiceDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
