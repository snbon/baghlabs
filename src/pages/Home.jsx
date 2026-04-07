import { HeroSection, AboutSection, WhySection, CTASection, HomeCasesSection } from '../components/sections/Home'
import BackgroundPage from '@/components/ui/background-page'

const Home = () => {
  return (
    <div>
      <HeroSection />
      {/* Single continuous background spans all mid-sections */}
      <div className="relative overflow-hidden">
        <BackgroundPage />
        <AboutSection />
        <HomeCasesSection />
        <WhySection />
      </div>
      <CTASection />
    </div>
  )
}

export default Home
