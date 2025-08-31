import { createContext, useContext, useState } from 'react'

const SectionContext = createContext()

export const useSection = () => {
  const context = useContext(SectionContext)
  if (!context) {
    throw new Error('useSection must be used within a SectionProvider')
  }
  return context
}

export const SectionProvider = ({ children }) => {
  const [currentSection, setCurrentSection] = useState(0)
  const [currentBackground, setCurrentBackground] = useState('white')

  const updateSection = (sectionIndex, background) => {
    setCurrentSection(sectionIndex)
    setCurrentBackground(background)
  }

  return (
    <SectionContext.Provider value={{ currentSection, currentBackground, updateSection }}>
      {children}
    </SectionContext.Provider>
  )
}
