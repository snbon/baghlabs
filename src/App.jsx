import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Cases from './pages/Cases'
import CaseDetail from './pages/CaseDetail'
import ServiceDetail from './pages/ServiceDetail'
import Contact from './pages/Contact'

function App() {
  return (
    <Routes>
      {/* Dutch (default) */}
      <Route path="/" element={<Layout lang="nl" />}>
        <Route index element={<Home />} />
        <Route path="cases" element={<Cases />} />
        <Route path="cases/:caseName" element={<CaseDetail />} />
        <Route path="services/:serviceId" element={<ServiceDetail />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      {/* English */}
      <Route path="/en" element={<Layout lang="en" />}>
        <Route index element={<Home />} />
        <Route path="cases" element={<Cases />} />
        <Route path="cases/:caseName" element={<CaseDetail />} />
        <Route path="services/:serviceId" element={<ServiceDetail />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default App
