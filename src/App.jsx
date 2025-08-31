import { Routes, Route } from 'react-router-dom'
import { SectionProvider } from './contexts/SectionContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Cases from './pages/Cases'
import CaseDetail from './pages/CaseDetail'

function App() {
  return (
    <SectionProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cases" element={<Cases />} />
          <Route path="cases/:caseName" element={<CaseDetail />} />
        </Route>
      </Routes>
    </SectionProvider>
  )
}

export default App
